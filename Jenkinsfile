pipeline {
    agent any

    environment {
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
                    // Corrección aquí: cambiamos 'societalResult' por 'stageResult'
                    catchError(buildResult: 'FAILURE', stageResult: 'SUCCESS') {
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