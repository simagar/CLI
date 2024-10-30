import type { CommandDef } from "../types";
const _rDefault = (r: any) => (r.default || r) as Promise<CommandDef>;

export const commands = {
  addModule: () => import("./addModule").then(_rDefault),
};
