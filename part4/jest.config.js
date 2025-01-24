/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  verbose: true,
  maxConcurrency: 1,
  globalTeardown: "./src/test/teardown.ts",
};
