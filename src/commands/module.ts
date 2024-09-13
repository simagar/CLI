import { consola } from "consola";
import { defineCommand } from "../index";
import { modulesList } from "../models/modulesList";
import { getTemplateWithGiget } from "../utils/giget";

export default defineCommand({
  meta: {
    name: "addModule",
    description: "global utility management for frontend",
  },
  args: {
    template: {
      type: "positional",
      description: "module templates",
      default: "addModule",
      required: false,
    },
  },
  async run(ctx) {
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
