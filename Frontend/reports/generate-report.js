const reporter = require('cucumber-html-reporter')

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport:true,
  metadata: {
    "App Version": "1.0.0",
    "Test Enviroment":"QA",
    "Browser": "Chromium",
    "Plataform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Remote"
  }
}

reporter.generate(options)