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
    const cwd = resolve(ctx.args.cwd || ".");

    try {
      const selectedModuleName = await consola.prompt(
        "Select your desired module to add",
        {
          type: "select",
          options: modulesList,
        }
      );
      // @ts-ignore
      await getTemplateWithGiget(selectedModuleName);
    } catch (e) {
      consola.error(e);
    }
  },
});
