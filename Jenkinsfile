pipeline {
    agent any

    environment {
        // Asegúrate de que en Jenkins hayas creado unas credenciales de tipo 
        // "Secret text" o "Username with password" con este ID exacto: 'browserstack-credentials'
        BROWSERSTACK_AUTH = credentials('browserstack-credentials')
    }

    stages {
        stage('1. Checkout') {
            steps {
                echo 'Obteniendo código de GitHub...'
                checkout scm
            }
        }

        stage('2. Instalar Dependencias') {
            steps {
                echo 'Instalando módulos de Node.js (con compatibilidad de versiones)...'
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('3. Ejecutar Pruebas en BrowserStack') {
            steps {
                echo 'Lanzando pruebas automatizadas en la nube...'
                withEnv([
                    "BROWSERSTACK_USERNAME=${env.BROWSERSTACK_AUTH_USR}",
                    "BROWSERSTACK_ACCESS_KEY=${env.BROWSERSTACK_AUTH_PSW}"
                ]) {
                    // Usamos catchError para que si una prueba falla, el pipeline 
                    // no se detenga de golpe y alcance a generar el reporte Allure
                    catchError(buildResult: 'FAILURE', societalResult: 'SUCCESS') {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('4. Generar Reporte Allure') {
            steps {
                echo 'Generando archivos de resultados para Allure...'
                sh 'npm run allure:generate'
            }
        }
    }

    post {
        always {
            echo 'Publicando reporte Allure en Jenkins...'
            // Requiere tener instalado el "Allure Jenkins Plugin" en tu servidor Jenkins
            allure includeProperties: false,
                   jdk: '',
                   results: [[path: 'allure-results']]
        }
        success {
            echo '¡El pipeline finalizó exitosamente!'
        }
        failure {
            echo 'El pipeline finalizó con errores. Revisa el reporte Allure para más detalles.'
        }
    }
}