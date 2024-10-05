export const supportedPackageManagerList = [
  { label: "NPM", value: "npm", hint: "NPM Manager" },
  { label: "PNPM", value: "pnpm", hint: "PNPM Manager" },
  { label: "YARN", value: "yarn", hint: "Yarn Manager" },
];

export interface IPackageManager {
  [key: string]: {
    command: string;
    dev: string;
  };
}

export const packageManagers: IPackageManager = {
  npm: {
    command: "npm i",
    dev: "-d",
  },
  yarn: {
    command: "yarn add",
    dev: "--save-dev",
  },
  pnpm: {
    command: "pnpm i",
    dev: "-D",
  },
};
