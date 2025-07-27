require('dotenv').config();

module.exports = {
  'appium:platformName': "Android",
  'appium:deviceName': "emulator-5554", // o tu dispositivo real
  'appium:automationName': "UiAutomator2",
  'appium:app': process.env.APK_PATH,
  'appium:appPackage': '', // Add your app package name here
  'appium:appWaitActivity': "*.*",
  'appium:autoGrantPermissions': true
};
