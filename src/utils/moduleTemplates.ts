export interface IModule {
  url: string;
  dependencies: string[] | [];
  devDependencies: string[] | [];
  nuxtModules: string[] | [];
}

export interface IModuleTemplate {
  [key: string]: IModule;
}

const moduleTemplates: IModuleTemplate = {
  auth: {
    url: "github:simagar/auth",
    dependencies: ["pinia-plugin-persistedstate", "pinia", "@pinia/nuxt"],
    devDependencies: [],
    nuxtModules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  },
  spinner: {
    url: "github:simagar/spinner",
    dependencies: ["pinia", "@pinia/nuxt"],
    devDependencies: [],
    nuxtModules: ["@pinia/nuxt"],
  },
  utils: {
    url: "github:simagar/utils",
    dependencies: [],
    devDependencies: [],
    nuxtModules: [],
  },
  classAPIProvider: {
    url: "github:simagar/classAPIProvider",
    dependencies: ["axios"],
    devDependencies: [],
    nuxtModules: [],
  },
  repositoryAPIProvider: {
    url: "github:simagar/repositoryAPIProvider",
    dependencies: ["axios"],
    devDependencies: [],
    nuxtModules: [],
  },
  selectComponent: {
    url: "github:simagar/vue3-select-component",
    dependencies: [],
    devDependencies: ["vue3-select-component"],
    nuxtModules: [],
  },
  formValidator: {
    url: "github:simagar/formValidator",
    dependencies: ["vee-validate", "yup"],
    devDependencies: [],
    nuxtModules: [],
  },
  utilityComponents: {
    url: "github:simagar/utilityComponents",
    dependencies: ["vee-validate", "yup"],
    devDependencies: [],
    nuxtModules: [],
  },
  swiperWrapper: {
    url: "github:simagar/swiperWrapper",
    dependencies: ["nuxt-swiper"],
    devDependencies: [],
    nuxtModules: ["nuxt-swiper"],
  },
  timeUtils: {
    url: "github:simagar/timeUtils",
    dependencies: [],
    devDependencies: [],
    nuxtModules: [],
  },
  pwa: {
    url: "github:simagar/pwa",
    dependencies: ["@vite-pwa/nuxt"],
    devDependencies: [],
    nuxtModules: ["@vite-pwa/nuxt"],
  },
};

export { moduleTemplates };
