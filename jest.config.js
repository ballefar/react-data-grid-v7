'use strict';

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  globals: {
    'ts-jest': {
      tsConfig: {
        esModuleInterop: true
      }
    }
  },
  collectCoverage: process.env.CI === 'true',
  collectCoverageFrom: [
    'packages/*/src/**/*.{js,jsx,ts,tsx}'
  ],
  coverageReporters: [
    'cobertura'
  ],
  restoreMocks: true,
  moduleNameMapper: {
    '^react-data-grid$': '<rootDir>/packages/react-data-grid-v7/src/',
    '^react-data-grid-addons$': '<rootDir>/packages/react-data-grid-v7-addons/src/',
    '\\.css$': '<rootDir>/test/fileMock.js'
  },
  setupFiles: [
    '<rootDir>/test/setupTests.js'
  ],
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each'
  ],
  testMatch: [
    '<rootDir>/packages/*/src/**/*.spec.(js|ts|tsx)',
    '<rootDir>/examples/**/*.spec.(js|ts|tsx)',
    '<rootDir>/tests/**/*.test.(ts|tsx)'
  ]
};
