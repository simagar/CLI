const moduleTemplates = {
    'utility': {
        url: 'github:simagar/utility',
    },
    'auth':
        {
            url: 'github:simagar/auth',
            dependencies: ['@pinia-plugin-persistedstate/nuxt','pathe'],
            devDependencies: ['postcss']
        }
    ,
    'spinner': 'github:simagar/spinner',
}

export {
    moduleTemplates
}
