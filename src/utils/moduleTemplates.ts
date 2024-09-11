export interface IModuleTemplate {
    [key: string]: {
        url: string;
        dependencies?: string[];
        devDependencies?: string[];
    }
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
    }
}

export {
    moduleTemplates
}
