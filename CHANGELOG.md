# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v3.0.0.html).

## [Unreleased]

## [v3.0.0]

### Added

### Changed

- BREAKING: Moved `userflow.js` from a dependency that's re-exported to being a peer dependency. To update, please `npm install userflow.js` in your own project, and `import userflow from 'userflow.js'`.
- BREAKING: The requirements for Content-Security-Policy has changed. Please consult [our CSP guide[https://getuserflow.com/docs/dev/csp].
- Moved source code to TypeScript + use Rollup to produce ESM and UMD builds.

[unreleased]: https://github.com/userflow/userflow-electron/compare/v3.0.0...HEAD
[v3.0.0]: https://github.com/userflow/userflow-electron/compare/v2.0.0...v3.0.0
