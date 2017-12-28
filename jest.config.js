module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.ts',

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // This fixed an error related to the CSS and loading gif breaking
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|scss)$': '<rootDir>/src/core/__mocks__/fileMock.ts',
  },

  mapCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    "**/src/**/*.{ts,tsx}",
    "!**/loader.{ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
};
