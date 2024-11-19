module.exports = {
    preset: 'ts-jest', // For TypeScript support with Jest
    collectCoverage: true,
    coverageDirectory: "coverage",
    testEnvironment: 'jsdom', // Simulates a browser-like environment for React testing
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Specifies the setup file path
    moduleNameMapper: {
      '\\.(css|scss|less)$': 'identity-obj-proxy', // Handles CSS imports in Jest
    },
    collectCoverageFrom: [
      "src/**/*.{ts,tsx}",
      "!src/**/*.d.ts",
      "!src/services/axiosInstance.ts"         // Exclude type definition files
    ],
    coveragePathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/src/main.tsx',  // Ignore main.tsx
      // '<rootDir>/src/sevices'
    ] // Ignore node_modules
  };
  
  