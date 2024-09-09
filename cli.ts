import {defineCommand, runMain} from "./src";
import consola from "consola";

export const main = defineCommand({
    meta: {
        name: "simagar/cli",
        version: "1.0.3",
        description: "simagar playground CLI",
    },
    setup() {
        consola.info("Setup");
    },
    cleanup() {
        consola.info("Cleanup");
    },
    subCommands: {
        addModule: () => import("./src/commands/module").then((r) => r.default),
    },
});

runMain(main);
