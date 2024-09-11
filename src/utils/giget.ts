import {loadConfig} from "c12";
import {exec} from "child_process";
import consola from "consola";
import {loadNuxtConfig} from "@nuxt/kit";
import fs from 'fs'
import {resolve} from "pathe";
import {updateConfig} from "c12/update";
let dependenciesCommand = "";
let devDependenciesCommand = "";

interface IPackageManager {
    [key: string]: {
        command: string,
        dev: string
    }
}

const packageManagers: IPackageManager = {
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
let selectedPackageManager: IPackageManager = {};

async function getGigetTemplate(template: string) {
    // const config = await loadNuxtConfig({cwd: process.cwd(),
    //     extend
    // })
    // config['pwa'] = {test:'asd'}
    // // Resolve full path to generated file
    // const path = resolve(config.srcDir, 'nuxt2.config.ts')
    // const configString = JSON.stringify(config, null, 2);
    //
    // fs.writeFileSync(path,configString ,'utf-8')

    const {configFile,created} = await updateConfig({
        cwd: ".",
        configFile: "nuxt2.config.ts",

        onCreate: ({ configFile }) => {
            // You can prompt user if wants to create a new config file and return false to cancel
            return false;
        },
        onUpdate: (config) => {
            console.log(config)
            // You can update the config contents just like an object
            config['pwa'] = false;
        },
    })
    console.log(configFile,11111)

    //
    // const selectedPackageManagerName = await consola.prompt(
    //     "Select Package Manager",
    //     {
    //         type: "select",
    //         options: [
    //             {label: "NPM", value: "npm", hint: "NPM Manager"},
    //             {label: "PNPM", value: "pnpm", hint: "PNPM Manager"},
    //             {label: "YARN", value: "yarn", hint: "Yarn Manager"},
    //         ],
    //     }
    // );
    // // @ts-ignore
    // selectedPackageManager = packageManagers[selectedPackageManagerName];
    // try {
    //     consola.info(moduleTemplates[template]);
    //     await downloadTemplate(moduleTemplates[template].url, {
    //         cwd: process.cwd(),
    //         dir: "./",
    //         force: true,
    //     });
    //     if (moduleTemplates[template].dependencies.length > 0) {
    //         await installPackages(moduleTemplates[template].dependencies, false);
    //     }
    //     if (moduleTemplates[template].devDependencies.length > 0) {
    //         await installPackages(moduleTemplates[template].devDependencies, true);
    //     }
    //     if (dependenciesCommand || devDependenciesCommand) {
    //         await runCommand();
    //     }
    // } catch (e) {
    //     consola.error(e);
    // }
}

async function installPackages(packageList: [], dev: boolean) {
    const {config, configFile} = await loadConfig({
        cwd: process.cwd(),
        packageJson: true,
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

export {getGigetTemplate};
