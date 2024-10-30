import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: false,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  coverageDirectory: '/coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover']
};

export default config;
