# Welcome to CombineDev app!

Ignite BoilerPlate Template - https://docs.infinite.red/ignite-cli/

Currently includes:

### Tech Stack

- **React Native**: Framework for building native apps using React.
- **React Navigation**: Routing and navigation for your React Native apps.
- **Redux Toolkit**: State management library for efficient and scalable state management.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Formik and Yup**: Libraries for form validation and handling.
- **react-native-mmk**: Storage solution for React Native.
- **Jest & testing-library/react-native**: Tools for testing React Native components.
- **Reactotron**: Debugging tool for React Native.
- **react-native-maps**: Integration with Google Maps.
- **Atomic Design**: Design pattern for all the UI components.
- **And more!**

## Project Setup and Run Instructions

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (if not installed, run `npm install -g expo-cli`)

### Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/combine-dev.git
    cd combine-dev
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```
    or if you prefer Yarn:
    ```sh
    yarn install
    ```

3. **Set up environment variables:**
    - Set the development values in `.env.dev`.
    - Set the production values in `.env.prod`.

### Running for Development and Production

1. **Run on Android (Development):**
    ```sh
    npm run android:dev
    ```
    or if you prefer Yarn:
    ```sh
    yarn android:dev
    ```
2. **Run on Android (Production):**
    ```sh
    npm run android:prod
    ```
    or if you prefer Yarn:
    ```sh
    yarn android:prod
    ```

3. **Run on iOS (Development):**
    ```sh
    npm run ios:dev
    ```
    or if you prefer Yarn:
    ```sh
    yarn ios:dev
    ```
4. **Run on iOS (Production):**
    ```sh
    npm run ios:prod
    ```
    or if you prefer Yarn:
    ```sh
    yarn ios:prod
    ```

### Building the Project

1. **Build for Android (Development):**
    ```sh
    npm run build:android:dev
    ```
    or if you prefer Yarn:
    ```sh
    yarn build:android:dev
    ```

2. **Build for Android (Production):**
    ```sh
    npm run build:android:prod
    ```
    or if you prefer Yarn:
    ```sh
    yarn build:android:prod
    ```

3. **Build for iOS (Development):**
    ```sh
    npm run build:ios:dev
    ```
    or if you prefer Yarn:
    ```sh
    yarn build:ios:dev
    ```

4. **Build for iOS (Production):**
    ```sh
    npm run build:ios:prod
    ```
    or if you prefer Yarn:
    ```sh
    yarn build:ios:prod
    ```

### Testing

1. **Run tests:**
    ```sh
    npm test
    ```
    or if you prefer Yarn:
    ```sh
    yarn test
    ```

2. **Run tests in watch mode:**
    ```sh
    npm run test:watch
    ```
    or if you prefer Yarn:
    ```sh
    yarn test:watch
    ```

### Linting and Formatting

1. **Lint the code:**
    ```sh
    npm run lint
    ```
    or if you prefer Yarn:
    ```sh
    yarn lint
    ```

2. **Format the code:**
    ```sh
    npm run format
    ```
    or if you prefer Yarn:
    ```sh
    yarn format
    ```

### Additional Commands

1. **Reverse adb ports for Android development:**
    ```sh
    npm run adb
    ```
    or if you prefer Yarn:
    ```sh
    yarn adb
    ```

2. **Clean prebuild:**
    ```sh
    npm run prebuild:clean
    ```
    or if you prefer Yarn:
    ```sh
    yarn prebuild:clean
    ```


## Quick Start

The Ignite boilerplate project's structure will look similar to this:

```
ignite-project
├── app
│   ├── components
│   ├── config
│   ├── i18n
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── theme
│   ├── utils
│   └── app.tsx
├── assets
│   ├── fonts
│   ├── icons
│   └── images
├── test
│   ├── __snapshots__
│   ├── mockFile.ts
│   └── setup.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   └── templates
|       |── app-icon
│       ├── component
│       ├── model
│       ├── navigator
│       └── screen
├── index.js
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests
├── .env
└── package.json

```

### ./app directory

Included in an Ignite boilerplate project is the `app` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the `app` directory looks similar to the following:

```
app
├── components
├── config
├── i18n
├── models
├── navigators
├── screens
├── services
├── theme
├── utils
└── app.tsx
```

**components**
This is where your reusable components live which help you build your screens.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.