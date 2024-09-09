import { loadConfig } from "c12";
import { moduleTemplates } from "../utils/moduleTemplates";
import { exec } from "child_process";
import { downloadTemplate } from "giget";
import consola from "consola";

let dependenciesCommand = "";
let devDependenciesCommand = "";
const packageManagers = {
  npm: {
    command: "npm i",
    dev: "-d",
  },
  yarn: {
    command: "yarn add",
    dev: "-D",
  },
  pnpm: {
    command: "pnpm i",
    dev: "-D",
  },
};
let selectedPackageManager = null;

async function getGigetTemplate(template: string) {
  const selectedPackageManagerName = await consola.prompt(
    "Select Package Manager",
    {
      type: "select",
      options: [
        { label: "NPM", value: "npm", hint: "NPM Manager" },
        { label: "PNPM", value: "pnpm", hint: "PNPM Manager" },
        { label: "YARN", value: "yarn", hint: "Yarn Manager" },
      ],
    }
  );
  // @ts-ignore
  selectedPackageManager = packageManagers[selectedPackageManagerName];
  try {
    consola.info(moduleTemplates[template]);
    await downloadTemplate(moduleTemplates[template].url, {
      cwd: process.cwd(),
      dir: "./",
      force: true,
    });
    if (moduleTemplates[template].dependencies.length > 0) {
      await installPackages(moduleTemplates[template].dependencies, false);
    }
    if (moduleTemplates[template].devDependencies.length > 0) {
      await installPackages(moduleTemplates[template].devDependencies, true);
    }
    if (dependenciesCommand || devDependenciesCommand) {
      await runCommand();
    }
  } catch (e) {
    consola.error(e);
  }
}

async function installPackages(packageList: [], dev: boolean) {
  const { config, configFile } = await loadConfig({
    cwd: process.cwd(),
    configFile: "package.json",
    onUpdate: (config) => {
        console.log(config)
      config.devDependencies = {};
    },
  });
  const projectPackages = dev ? config.devDependencies : config.dependencies;
  packageList.forEach((packageName: string) => {
    if (projectPackages[packageName]) {
      // package exists
    } else {
      dev
        ? (devDependenciesCommand += ` ${packageName} `)
        : (dependenciesCommand += ` ${packageName} `);
    }
  });
}

async function runCommand() {
  await exec(
    `${selectedPackageManager.command} ${dependenciesCommand} & ${selectedPackageManager.command} ${selectedPackageManager.dev} ${devDependenciesCommand}`,
    (error, stdout, stderr) => {
      if (error) {
        consola.error("error happened:", error);
      }
      if (stderr) {
        consola.error("std happened: ", stderr);
      }
      consola.success("stdout", stdout);
    }
  );
}

export { getGigetTemplate };
