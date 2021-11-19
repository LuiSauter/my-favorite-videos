settings default
"test": "jest

"jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "collectCoverage": true,
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "/test/",
      "/dist/"
    ]
  }