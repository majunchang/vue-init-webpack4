module.exports = function(api) {
    api.cache(true);

    const presets = [
        ['@babel/preset-env', { modules: false }],
        '@vue/babel-preset-app',
        [
            '@vue/babel-preset-jsx',
            {
                functional: false
            }
        ]
    ];
    const plugins = [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-object-assign',
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ]
    ];

    return { presets, plugins };
};
