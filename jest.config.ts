/** @jest-config-loader ts-node */
import type {Config} from 'jest';

// jest requires ts-node for typescript

const config: Config = {
	preset: "ts-jest",
  verbose: true,
  globals: {
    structuredClone: structuredClone.bind(structuredClone)
  },
	// see https://stackoverflow.com/a/76995084 with some simplifications
	transform: {
    "test.ts$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
	extensionsToTreatAsEsm: [".ts"],
};

export default config;