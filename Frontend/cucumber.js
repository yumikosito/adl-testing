require('dotenv').config()
module.exports = {
    default: {
        // Especifica la ruta a tus archivos de features.
        paths: [
            // 'features/**/*.feature'
            // 'features/login.feature',
            // 'features/create.product.feature',   
            // 'features/get.feature',
            // 'features/put.feature',
            'features/delete.feature'
        ],

        // Le dice a Cucumber dónde encontrar tus definiciones de pasos y archivos de soporte.
        require: [
            'step_definitions/**/*.js', // Tus pasos de Gherkin
            'support/**/*.js'          // Archivos de hooks (Before, After)
        ],

        // Define el formato de la salida en la consola y para los reportes.
        format: [
            'progress-bar', // Muestra una barra de progreso cucudurante la ejecución
            'json:reports/cucumber-report.json', // Genera un reporte JSON
             'html: reports/cucumber-report.html'
        ],

        // Permite pasar parámetros a tu World personalizado.
        worldParameters: {
            baseUrl: process.env.BASE_URL,
            credentials: {
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
    }
        },
        publishQuiet: true
    }
}