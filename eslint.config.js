const globals = require('globals')
const pluginJs = require('@eslint/js')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = [
    {
        files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' },
    },
    { languageOptions: { globals: { ...globals.node, ...globals.es2021 } } },
    pluginJs.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        rules: {
            'prettier/prettier': [
                'warn',
                {
                    "semi":false
                },
                {
                    'usePrettierrc': true,
                },
            ],
        },
    },
]