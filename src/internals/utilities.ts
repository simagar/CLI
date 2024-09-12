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
  configFile: string = "nuxt.config.ts",
  configUpdateCallback: (config: any) => any
) {
  const response = await updateConfig({
    cwd: process.cwd(),
    configFile,
    onUpdate: (config) => {
      // You can update the config contents just like an object
      config = configUpdateCallback(config);
    },
  });
}

export async function getUserCurrentPackageManagerFromPrompt() {
  return await consola.prompt("Select Package Manager", {
    type: "select",
    options: supportedPackageManagerList,
  });
}

let dependenciesCommand = "";
let devDependenciesCommand = "";

export async function checkAndInstallPackages(
  configs: IModule
): Promise<IInstallPackagesCommandResult> {
  if (configs?.dependencies.length > 0) {
    await installPackages(configs.dependencies, false);
  }
  if (configs.devDependencies.length > 0) {
    await installPackages(configs.devDependencies, true);
  }

  return {
    dep: dependenciesCommand,
    devDep: devDependenciesCommand,
  };
}

export async function installPackages(
  packageList: string[],
  dev: boolean
): Promise<void> {
  const { config, configFile } = await loadConfig({
    cwd: process.cwd(),
    packageJson: true,
    configFile: "package.json",
  });

  const projectPackages = dev
    ? config.devDependencies
      ? config.devDependencies
      : []
    : config.dependencies
      ? config.dependencies
      : [];
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
