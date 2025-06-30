import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm',
  roots: ['./src/tests'],
  transform: {
    ...tsJestTransformCfg,
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // remove .js from imports when using TS
  },
  globalSetup: './jest-global-setup.ts',
};
