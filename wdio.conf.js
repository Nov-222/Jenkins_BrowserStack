exports.config = {
    user: 'isra_cIyhdL',
    key: 'q1xG6LFxq3yxPuc1ybY8',

    services: ['browserstack'],

    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],

    maxInstances: 1,

    capabilities: [{
        platformName: 'android',
        'appium:deviceName': 'Samsung Galaxy S24',
        'appium:platformVersion': '14.0',
        'appium:app': 'bs://b0ed9fda53de750d602118fcff0766b2a7ec0b3a', 
        'appium:automationName': 'UiAutomator2',
        'bstack:options': {
            projectName: 'Proyecto Jenkins Appium Allure',
            buildName: 'Build Local #' + (process.env.BUILD_NUMBER || '1'),
            sessionName: 'Prueba Automatizada',
            debug: true,
            networkLogs: true
        }
    }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    reporters: [
            ['allure', {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
                // Añadimos estas opciones para evitar bloqueos de sincronización
                useCucumberStepReporter: false
            }]
        ],
};