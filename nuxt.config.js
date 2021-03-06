export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'halong-booking-v2',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Ha Long Booking' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '@/assets/css/main.scss',
        '@/assets/css/_common.scss',
        'bootstrap/dist/css/bootstrap.css',
        'bootstrap-vue/dist/bootstrap-vue.css',
        '@fortawesome/fontawesome-free/css/all.css'
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '~plugins/bootstrapVue.ts',
        '~plugins/commonFilters.ts',
        '~plugins/moment.ts',
        { src: '~/plugins/dateTimePicker.ts', mode: 'client' }
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        '@nuxtjs/style-resources'
    ],

    styleResources: {
        scss: [
            '@/assets/css/_variable.scss'
        ]
    },

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/toast'
    ],

    // BoostrapVue (https://bootstrap-vue.org/docs#nuxtjs-module)
    bootstrapVue: {
        icons: true,
        componentPlugins: [
            'LayoutPlugin',
            'FormPlugin',
            'FormCheckboxPlugin',
            'FormInputPlugin',
            'FormRadioPlugin',
            'ToastPlugin',
            'ModalPlugin',
            'BVModalPlugin',
            'BVToastPlugin'
        ]
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {},

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: ['bootstrap-vue'],
        babel: { compact: true }
    }
}
