module.exports = {
  preset: 'jest-preset-angular',
  rootDir: 'src',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  setupFilesAfterEnv: ['./setup-jest.ts'],
  testMatch: ['<rootDir>/**/*.spec.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
    '^@internal/common/(.*)$': '<rootDir>/app/common/$1',
  },
};
