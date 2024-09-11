export interface IModule {
    url: string;
    dependencies: string[] | [];
    devDependencies: string[] | [];
}

export interface IModuleTemplate {
    [key: string]: IModule
}


const moduleTemplates: IModuleTemplate = {
    auth: {
        url: 'github:simagar/auth',
        dependencies: ['@pinia-plugin-persistedstate/nuxt', 'pinia', '@pinia/nuxt'],
        devDependencies: []
    },
    spinner: {
        url: 'github:simagar/spinner',
        dependencies: ['pinia', '@pinia/nuxt'],
        devDependencies: []
    },
    utils: {
        url: 'github:simagar/utils',
        dependencies: [],
        devDependencies: []
    },
    classAPIProvider: {
        url: 'github:simagar/classAPIProvider',
        dependencies: ['axios'],
        devDependencies: []
    },
    repositoryAPIProvider: {
        url: 'github:simagar/repositoryAPIProvider',
        dependencies: ['axios'],
        devDependencies: []
    },
    formValidator: {
        url: 'github:simagar/formValidator',
        dependencies: ['vee-validate', 'yup'],
        devDependencies: []
    },
    utilityComponents: {
        url: 'github:simagar/utilityComponents',
        dependencies: ['vee-validate', 'yup'],
        devDependencies: []
    },
    swiperWrapper: {
        url: 'github:simagar/swiperWrapper',
        dependencies: ['nuxt-swiper'],
        devDependencies: []
    },
    timeUtils: {
        url: 'github:simagar/timeUtils',
        dependencies: [],
        devDependencies: []
    },
    pwa: {
        url: 'github:simagar/pwa',
        dependencies: ['@vite-pwa/nuxt'],
        devDependencies: []
    },
}

export {
    moduleTemplates
}
