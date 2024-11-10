/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  preset: "jest-expo",
  setupFiles: ["<rootDir>/test/setup.ts"],
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|react-redux)"
  ],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "**/*.{ts,tsx,js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/expo-env.d.ts",
    "!**/.expo/**",
    "!**/jest.config.js",
    "!**/app/utils/**",
    "!**/plugins/**",
    "!**/app/components/Toggle/**",
    "!**/app/components/AutoImage.tsx",
    "!**/app/components/Button.tsx",
    "!**/app/components/Text.tsx",
    "!**/app/components/TextField.tsx",
    "!**/app/components/Card.tsx",
    "!**/app/components/EmptyState.tsx",
    "!**/app/components/Header.tsx",
    "!**/app/components/Icon.tsx",
    "!**/app/components/ListItem.tsx",
    "!**/app/components/ListView.tsx",
    "!**/app/components/Screen.tsx",
    "!**/app/components/Text.tsx",
    "!**/app/i18n/**",
    "!**/app/devtools/**",
    "!**/app/config/**",
    "!**/app/store/**",
    "!**/app/theme/**",
  ]
}
