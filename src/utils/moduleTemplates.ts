export interface IModule {
  url: string;
  dependencies: string[] | [];
  devDependencies: string[] | [];
  nuxtModules: string[] | [];
  hasV4?: boolean;
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
    hasV4: true,
  },
  spinner: {
    url: "github:simagar/spinner",
    dependencies: ["pinia", "@pinia/nuxt"],
    devDependencies: [],
    nuxtModules: ["@pinia/nuxt"],
    hasV4: true,
  },
  utils: {
    url: "github:simagar/utils",
    dependencies: [],
    devDependencies: [],
    nuxtModules: [],
  },
  classAPIProvider: {
    url: "github:simagar/classAPIProvider",
    dependencies: [],
    devDependencies: [],
    nuxtModules: [],
    hasV4: true,
  },
  repositoryAPIProvider: {
    url: "github:simagar/repositoryAPIProvider",
    dependencies: [],
    devDependencies: [],
    nuxtModules: [],
  },
  selectComponent: {
    url: "github:simagar/vue3-select-component",
    dependencies: [],
    devDependencies: ["vue3-select-component"],
    nuxtModules: [],
    hasV4: true,
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
    hasV4: true,
  },
  timeUtils: {
    url: "github:simagar/timeUtils",
    dependencies: [],
    devDependencies: [],
    nuxtModules: [],
    hasV4: true,
  },
  pwa: {
    url: "github:simagar/pwa",
    dependencies: ["@vite-pwa/nuxt"],
    devDependencies: [],
    nuxtModules: ["@vite-pwa/nuxt"],
    hasV4: true,
  },
  leaflet: {
    url: "github:simagar/leaflet",
    dependencies: ["leaflet"],
    devDependencies: [],
    nuxtModules: [],
    hasV4: true,
  },
};

export { moduleTemplates };
