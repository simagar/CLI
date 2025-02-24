import { consola } from "consola";
import { defineCommand } from "../index";
import { modulesList } from "../models/modulesList";
import { getTemplateWithGiget } from "../utils/giget";
import { sharedArgs } from "./_shared";
import { resolve } from "pathe";

export default defineCommand({
  meta: {
    name: "addModule",
    description: "global utility management for frontend",
  },
  args: {
    ...sharedArgs,
    template: {
      type: "positional",
      description: "module templates",
      default: "addModule",
      required: false,
    },
  },
  async run(ctx) {
    const cwd = resolve(ctx.args.dir || ".");

    const v4 = ctx.args.v4 || false;
    try {
      const selectedModuleName = await consola.prompt(
        "Select your desired module to add",
        {
          type: "select",
          options: modulesList,
        }
      );
      if (!selectedModuleName) {
        return consola.error(new Error("No module selected. Exiting."));
      }
      if (selectedModuleName.toString() === "Symbol(clack:cancel)") {
        consola.log("Exiting gracefully...");
        process.exit(0);
      }
      // @ts-ignore
      await getTemplateWithGiget(cwd, selectedModuleName, v4);
    } catch (e) {
      consola.error(e);
    }
  },
});
