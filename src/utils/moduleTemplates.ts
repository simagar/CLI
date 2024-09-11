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
        devDependencies: ['test']
    },
    spinner: {
        url: 'github:simagar/spinner',
        dependencies: ['pinia', '@pinia/nuxt'],
        devDependencies: []
    },
    utils: {
        url: 'github.com:simagar/utils',
        dependencies: [],
        devDependencies: []
    },
    classAPIProvider: {
        url: 'github.com:simagar/classAPIProvider',
        dependencies: ['axios'],
        devDependencies: []
    },
    repositoryAPIProvider: {
        url: 'github.com:simagar/repositoryAPIProvider',
        dependencies: ['axios'],
        devDependencies: []
    },
    formValidator: {
        url: 'github.com:simagar/formValidator',
        dependencies: ['vee-validate', 'yup'],
        devDependencies: []
    },
    utilityComponents: {
        url: 'github.com:simagar/utilityComponents',
        dependencies: ['vee-validate', 'yup'],
        devDependencies: []
    },
    swiperWrapper: {
        url: 'github.com:simagar/swiperWrapper',
        dependencies: ['nuxt-swiper'],
        devDependencies: []
    },
    timeUtils: {
        url: 'github.com:simagar/timeUtils',
        dependencies: [],
        devDependencies: []
    },
    pwa: {
        url: 'github.com:simagar/timeUtils',
        dependencies: ['@vite-pwa/nuxt'],
        devDependencies: []
    },
}

export {
    moduleTemplates
}
