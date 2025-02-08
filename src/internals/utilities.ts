import { updateConfig } from "c12/update";
import consola from "consola";
import { supportedPackageManagerList } from "../models/packageManagers";
import { IModule } from "../utils/moduleTemplates";
import { loadConfig } from "c12";

export interface IInstallPackagesCommandResult {
  dep: string;
  devDep: string;
}

export async function getConfig(
  cwd: string,
  configFile: string = "nuxt.config.ts",
  configUpdateCallback: (config: any) => any
) {
  await updateConfig({
    cwd: cwd,
    configFile,
    onUpdate: (config) => {
      // You can update the config contents just like an object

      config = configUpdateCallback(config);
    },
  });
}

export async function detectPackageManager(
  cwd: string,
  configFile: string = "package.json"
) {}

export async function getUserCurrentPackageManagerFromPrompt() {
  // HERE
  return await consola.prompt("Select Package Manager", {
    type: "select",
    options: supportedPackageManagerList,
  });
}

let dependenciesCommand = "";
let devDependenciesCommand = "";

export async function checkAndInstallPackages(
  cwd: string,
  configs: IModule
): Promise<IInstallPackagesCommandResult> {
  if (configs?.dependencies.length) {
    await installPackages(cwd, configs.dependencies, false);
  }
  if (configs.devDependencies.length) {
    await installPackages(cwd, configs.devDependencies, true);
  }
  if (configs.nuxtModules && configs.nuxtModules.length) {
    await getConfig(cwd, "nuxt.config.ts", (nuxtConfig) => {
      if (nuxtConfig.modules) {
        for (let i = 0; i < configs.nuxtModules.length; i++) {
          if (!nuxtConfig.modules.includes(configs.nuxtModules[i]))
            nuxtConfig.modules.push(configs.nuxtModules[i]);
        }
      } else {
        nuxtConfig["modules"] = [...configs.nuxtModules];
      }
    });
  }

  return {
    dep: dependenciesCommand,
    devDep: devDependenciesCommand,
  };
}

export async function installPackages(
  cwd: string,
  packageList: string[],
  dev: boolean
): Promise<void> {
  const { config, configFile } = await loadConfig({
    cwd,
    packageJson: true,
    configFile: "package.json",
  });

  const projectPackages = dev
    ? config.devDependencies
      ? config.devDependencies
      : {}
    : config.dependencies
      ? config.dependencies
      : {};

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
