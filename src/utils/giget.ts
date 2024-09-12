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
import { getContent, createFile } from "./fs";

let selectedPackageManager: IPackageManager = {};
let dependenciesCommand: IInstallPackagesCommandResult | null = null;

async function getTemplateWithGiget(template: string) {
  // Get Package Manager Name from user input
  const selectedPackageManagerName =
    await getUserCurrentPackageManagerFromPrompt();
  // @ts-ignore
  selectedPackageManager = packageManagers[selectedPackageManagerName];

  // Load the config of module that user selected
  const selectedModuleTemplateConfig = moduleTemplates[template] as IModule;
  try {
    // Save current gitignore of user project
    const originalGitIgnore = await getOriginalGitignoreContent();

    // Download selected module from github
    await downloadTemplate(selectedModuleTemplateConfig.url, {
      cwd: process.cwd(),
      dir: "./",
      force: true,
    });

    // If there was a gitignore before downloading, rewrite it back
    if (originalGitIgnore) {
      await restoreGitignoreContent(originalGitIgnore);
    }

    dependenciesCommand = await checkAndInstallPackages(
      selectedModuleTemplateConfig
    );
    if (dependenciesCommand.dep || dependenciesCommand.devDep) {
      await runInstallCommand();
    }
  } catch (e) {
    consola.error(e);
  }
}

async function getOriginalGitignoreContent() {
  return await getContent(`${process.cwd()}/.gitignore`);
}

async function restoreGitignoreContent(
  content: string | NodeJS.ArrayBufferView
) {
  await createFile({
    directoryPath: process.cwd(),
    fileContent: content,
    fileName: ".gitignore",
  });
}

async function runInstallCommand() {
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
