import { exec } from "child_process";
import consola from "consola";
import {
  checkAndInstallPackages,
  getUserCurrentPackageManagerFromPrompt,
  IInstallPackagesCommandResult,
} from "../../src/internals/utilities";
import { IPackageManager, packageManagers } from "../models/packageManagers";
import { downloadTemplate } from "giget";
import { IModule, moduleTemplates } from "./moduleTemplates";

let selectedPackageManager: IPackageManager = {};
let dependenciesCommand: IInstallPackagesCommandResult | null = null;

async function getTemplateWithGiget(template: string) {
  console.log("done");

  const selectedPackageManagerName =
    await getUserCurrentPackageManagerFromPrompt();
  // @ts-ignore
  selectedPackageManager = packageManagers[selectedPackageManagerName];
  const selectedModuleTemplateConfig = moduleTemplates[template] as IModule;
  try {
    await downloadTemplate(selectedModuleTemplateConfig.url, {
      cwd: process.cwd(),
      dir: "./",
      force: true,
    });
    dependenciesCommand = await checkAndInstallPackages(
      selectedModuleTemplateConfig
    );
    if (dependenciesCommand.dep || dependenciesCommand.devDep) {
      await runCommand();
    }
  } catch (e) {
    consola.error(e);
  }
}

async function runCommand() {
  await exec(
    `${selectedPackageManager.command} ${dependenciesCommand?.dep} & ${selectedPackageManager.command} ${selectedPackageManager.dev} ${dependenciesCommand?.devDep}`,
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

export { getTemplateWithGiget };
