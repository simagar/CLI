import { exec } from "child_process";
import consola from "consola";
import {
  checkAndInstallPackages,
  getConfig,
  getUserCurrentPackageManagerFromPrompt,
  IInstallPackagesCommandResult,
} from "../../src/internals/utilities";
import { IPackageManager, packageManagers } from "../models/packageManagers";
import { IModule, moduleTemplates } from "./moduleTemplates";
import { createFile, getContent } from "./fs";
import { pwaConfig } from "./templates";
import { downloadTemplate } from "giget";

let selectedPackageManager: IPackageManager = {};
let dependenciesCommand: IInstallPackagesCommandResult | null = null;

async function getTemplateWithGiget(
  cwd: string,
  template: string,
  v4: boolean
) {
  // Get Package Manager Name from user input
  const selectedPackageManagerName =
    await getUserCurrentPackageManagerFromPrompt();
  // @ts-ignore
  selectedPackageManager = packageManagers[selectedPackageManagerName];

  // Load the config of module that user selected
  const selectedModuleTemplateConfig = moduleTemplates[template] as IModule;
  try {
    // Save current gitignore of user project
    const originalGitIgnore = await getOriginalContent(cwd, ".gitignore");
    const originalReadme = await getOriginalContent(cwd, "readme.md");

    let selectedModuleTemplateUrl = selectedModuleTemplateConfig.url;

    if (v4 && selectedModuleTemplateConfig.hasV4) {
      selectedModuleTemplateUrl = `${selectedModuleTemplateConfig.url}#v4`;
    }

    // Download selected module from github
    await downloadTemplate(selectedModuleTemplateUrl, {
      cwd,
      dir: "./",
      force: true,
    });

    // If there was a gitignore before downloading, rewrite it back
    if (originalGitIgnore) {
      await restoreContent(cwd, originalGitIgnore, ".gitignore");
    }
    if (originalReadme) {
      await restoreContent(cwd, originalReadme, "readme.md");
    }

    dependenciesCommand = await checkAndInstallPackages(
      cwd,
      selectedModuleTemplateConfig
    );
    if (dependenciesCommand.dep || dependenciesCommand.devDep) {
      await runInstallCommand();
    }
    if (template === "pwa") {
      await addPWAToNuxt(cwd);
    }
  } catch (e) {
    consola.error(e);
  }
}

async function addPWAToNuxt(cwd: string) {
  const applicationName = await consola.prompt("Enter Your Application Name");
  const themeColor = await consola.prompt("Enter A Primary Color (Exp: #ccc)");
  // @ts-ignore
  pwaConfig.manifest.short_name = applicationName;
  // @ts-ignore
  pwaConfig.manifest.name = applicationName;
  // @ts-ignore
  pwaConfig.manifest.theme_color = themeColor;
  // @ts-ignore
  pwaConfig.manifest.background_color = themeColor;
  await getConfig(cwd, "nuxt.config", (nuxtConfig) => {
    nuxtConfig["pwa"] = pwaConfig;
  });
}

async function getOriginalContent(cwd: string, fileName: string) {
  return await getContent(`${cwd}/${fileName}`);
}

async function restoreContent(
  cwd: string,
  content: string | NodeJS.ArrayBufferView,
  fileName: string
) {
  await createFile({
    directoryPath: cwd,
    fileContent: content,
    fileName,
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
