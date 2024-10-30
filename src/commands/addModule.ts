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

    try {
      const selectedModuleName = await consola.prompt(
        "Select your desired module to add",
        {
          type: "select",
          options: modulesList,
        }
      );

      if (!selectedModuleName) {
        consola.warn("No module selected. Exiting.");
        return consola.error(new Error("No module selected. Exiting."));
      }
      // @ts-ignore
      await getTemplateWithGiget(cwd, selectedModuleName);
    } catch (e) {
      consola.error(e);
    }
  },
});
