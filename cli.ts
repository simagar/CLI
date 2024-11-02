import { defineCommand, runMain } from "./src";
import simagarPackage from "./package.json" assert { type: "json" };


export const main = defineCommand({
  meta: {
    name: simagarPackage.name,
    version: simagarPackage.version,
    description: simagarPackage.description,
  },
  subCommands: {
    addModule: () => import("./src/commands/addModule").then((r) => r.default),
  },
});

runMain(main);
