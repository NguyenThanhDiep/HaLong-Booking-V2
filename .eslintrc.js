module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: [
        '@nuxtjs/eslint-config-typescript',
        'plugin:nuxt/recommended'
    ],
    plugins: [
    ],
    // add your custom rules here
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "vue/html-self-closing": "off",
        "@typescript-eslint/no-non-null-assertion": "warn",
        quotes: "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/require-prop-types": "off",
        indent: ["warn", 4],
        "vue/html-indent": ["warn", 4],
        semi: "off",
        "space-before-function-paren": "off",
        eqeqeq: "off",
        curly: "off",
        "no-trailing-spaces": ["warn"],
        "padded-blocks": ["warn"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-return-assign": "off",
        "no-console": "off",
        "vue/attributes-order": "off",
        "vue/no-use-v-if-with-v-for": "off",
        "vue/no-parsing-error": "off",
        "vue/no-v-html": "off"
    }
}
