# Contributing

Please take a moment to review this document before submitting a pull request to ensure a smooth and productive collaboration.

## Pull Requests

Before you start working on significant new features, please create [an issue](https://github.com/panusoi/pyoraparkit-kartalla/issues) to discuss the feature.

## Installation

To get started with the project, you only need to run `npm install` in the root directory.

```
npm install
```

## Coding Standards

`Prettier` and `eslint` are used to maintain code quality and consistency. To automatically fix any style violations in your code, you can run:

```
npm run format
```

and to linting issues you can run:

```
npm run lint:fix
```

**Note:** Whenever you commit, format and linter checks will run on all staged files. Issues are not automatically fixed.

## Running Tests

You can run the unit tests using the following command:

```
npm run test:unit
```

You can run the playwright tests using the following command:

```
npm run test:e2e
```

**Note:** You may need to install playwright browsers and deps using `npx playwright install --with-deps`

Please ensure that the tests are passing when submitting a pull request. If you're adding new features, please include tests.

## Scripts

- `npm install`: Install all dependencies
- `npm run lint`: Run linter
- `npm run format:check`: Check code style
- `npm run lint:fix`: Fix linter issues
- `npm run format`: Format code to match code style
- `npm run dev`: Run development server
- `npm run build`: Build the project
- `npm run preview`: Run the built project in preview server
- `npm run preview:ssl`: Run the built project in preview server with SSL and expose to all host IP addresses
  - This is useful when manually testing with a mobile device. Geolocation and PWA are enabled only on HTTPS connections.
- `npm run test:unit`: Run unit tests
- `npm run test:e2e`: Run Playwright tests
  - Note: When run locally, Playwright starts its own development server on port 3000.
- `npm run test:e2e:ui`: Run Playwright tests with UI
  - Note: When run locally, Playwright starts its own development server on port 3000.
