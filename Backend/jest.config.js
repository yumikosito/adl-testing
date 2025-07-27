/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  "reporters": [
    "default",
    "jest-html-reporters"
  ],
}

module.exports = config
