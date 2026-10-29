const allure = require('@wdio/allure-reporter').default;

describe('Pruebas Automatizadas con Allure', () => {
    
    it('Prueba 1: Verificar la inicialización de la sesión', async () => {
        allure.addSeverity('critical');
        allure.addDescription('Verifica que la sesión en BrowserStack responda correctamente.');
        
        // Verificamos que el navegador/driver tenga un ID de sesión activo
        const sessionId = browser.sessionId;
        console.log(`ID de sesión actual: ${sessionId}`);
        expect(sessionId).not.toBeNull();
    });

    it('Prueba 2: Validar contextos de ejecución', async () => {
        allure.addSeverity('normal');
        allure.addDescription('Comprueba los contextos nativos y web disponibles en la sesión.');
        
        const contexts = await driver.getContexts();
        console.log('Contextos:', contexts);
        expect(contexts.length).toBeGreaterThan(0);
    });

});