# ChangeLogs

## Version 1.1.9

- :green_heart: CI
  - `actions/checkout` is bumped from 3 to 4
  - `actions/setup-node` is bumped from 3 to 4
  - `actions/upload-artifact` is bumped from 3 to 4
- :arrow_up: Packages for development are bumped
  - `@types/chai` is bumped from 4.3.5 to 4.3.11
  - `@types/mocha` is bumped from 10.0.1 to 10.0.6
  - `@types/node` is bumped from 20.1.3 to 20.10.5
  - `@typescript-eslint/eslint-plugin` is bumped from 5.59.5 to 6.16.0
  - `@typescript-eslint/parser` is bumped from 5.59.5 to 6.16.0
  - `chai` is bumped from 4.3.7 to 5.0.0
  - `esbuild` is bumped from 0.17.18 to 0.19.10
  - `eslint` is bumped from 8.40.0 to 8.56.0
  - `rimraf` is bumped from 5.0.0 to 5.0.5
  - `typescript` is bumped from 5.0.4 to 5.3.3

## Version 1.1.8

- :green_heart: CI
  - An external action is now used to create a release on GitHub
  - Events that occur during branch creation are now ignored to avoid executing 'Release' workflow
  - Node.js version 20.x is added for CI
  - Submodules are now also cloned on 'npm' job of the 'Release' workflow
  - The 'github' job on 'Release' workflow now fails if github.ref is inappropriate
  - The latest Node.js is now used to publish the package
  - The workflow to automatically merge PRs from Dependabot[bot] is added
- :arrow_up: Packages for development are bumped
  - `@types/chai` is bumped from 4.3.4 to 4.3.5
  - `@types/node` is bumped from 18.11.18 to 20.1.3
  - `@typescript-eslint/eslint-plugin` is bumped from 5.48.2 to 5.59.5
  - `@typescript-eslint/parser` is bumped from 5.48.2 to 5.59.5
  - `esbuild` is bumped from 0.17.2 to 0.17.18
  - `eslint` is bumped from 8.32.0 to 8.40.0
  - `rimraf` is bumped from 4.1.0 to 5.0.0
  - `typescript` is bumped from 4.9.4 to 5.0.4

## Version 1.1.7

- :green_heart: CI
  - Alternate implementation is added instead of `actions/create-release`
  - Dependabot is made to watch GitHub Actions also
  - Workflows are made to run only on 'push' or 'pull request' events for branches
- :arrow_up: Packages for development are bumped
  - `@typescript-eslint/eslint-plugin` is bumped from 5.48.1 to 5.48.2
  - `@typescript-eslint/parser` is bumped from 5.48.1 to 5.48.2
  - `esbuild` is bumped from 0.16.16 to 0.17.2
  - `eslint` is bumped from 8.31.0 to 8.32.0
  - `rimraf` is bumped from 3.0.2 to 4.1.0

## Version 1.1.6

- :arrow_up: Packages for development are bumped
  - `@typescript-eslint/eslint-plugin` is bumped from 5.47.1 to 5.48.1
  - `@typescript-eslint/parser` is bumped from 5.47.1 to 5.48.1
  - `esbuild` is bumped from 0.16.12 to 0.16.16
  - `eslint` is bumped from 8.30.0 to 8.31.0

## Version 1.1.5

- :green_heart: CI chore
  - Job to get commit summary to create release is fixed
  - Job to publish the package is added
  - Workflows 'build' and 'coverage' are made to be run only for branches
- :arrow_up: Dependent packages are bumped
  - `@types/node` is bumped from 18.11.17 to 18.11.18
  - `@typescript-eslint/eslint-plugin` is bumped from 5.47.0 to 5.47.1
  - `@typescript-eslint/parser` is bumped from 5.47.0 to 5.47.1
  - `esbuild` is bumped from 0.16.10 to 0.16.12
- :memo: Description of CI status table is modified
- :lock: Security audit
  - `json5` is bumped from 2.2.1 to 2.2.2 by `npm audit fix`

## Version 1.1.4

- :building_construction: Build system is migrated from `terser` to `esbuild`
  - `esbuild` version 0.16.10 is added
  - `terser` is removed
- :green_heart: CI chore
  - A Farewell to Travis
  - CodeQL is installed
  - Coverage reports has made to be archived
  - Dependabot is installed
  - Dependent packages has made to be upgraded before setup modules
  - Deprecated ::set-output style outputs are modified to use $GITHUB_OUTPUT
  - Node.js modules has made to be cached
  - Workflow to build is added
- :memo: CONTRIBUTING.md is added
- :arrow_up: Dependent packages are bumped
  - `@types/chai` is bumped from 4.2.22 to 4.3.4
  - `@types/mocha` is bumped from 9.0.0 to 10.0.1
  - `@types/node` is bumped from 16.11.6 to 18.11.17
  - `@typescript-eslint/eslint-plugin` is bumped from 5.3.0 to 5.47.0
  - `@typescript-eslint/parser` is bumped from 5.3.0 to 5.47.0
  - `chai` is bumped from 4.3.4 to 4.3.7
  - `eslint` is bumped from 8.2.0 to 8.30.0
  - `mocha` is bumped from 9.1.3 to 10.2.0
  - `ts-node` is bumped from 10.4.0 to 10.9.1
  - `typescript` is bumped from 4.4.4 to 4.9.4
- :memo: README.md is updated

## Version 1.1.3

- :green_heart: Node.js version is updated for GitHub CI
  - For 16.x, upgraded from 16.8.0 to 16.13.0
  - For 17.x, added 17.0.1
- :arrow_up: Packages for development are updated
  - `@types/chai` is upgraded from 4.2.21 to 4.2.22
  - `@types/node` is upgraded from 16.7.10 to 16.11.6
  - `@typescript-eslint/eslint-plugin` is upgraded from 4.30.0 to 5.3.0
  - `@typescript-eslint/parser` is upgraded from 4.30.0 to 5.3.0
  - `eslint` is upgraded from 7.32.0 to 8.2.0
  - `mocha` is upgraded from 9.1.1 to 9.1.3
  - `terser` is upgraded from 5.7.2 to 5.9.0
  - `ts-node` is upgraded from 10.2.1 to 10.4.0
  - `typescript` is upgraded from 4.4.2 to 4.4.4

## Version 1.1.2

- :art: 'length' property is made to be accessible
- :memo: Badges are relocated
- :memo: CHANGELOG.md is added
- :green_heart: CI target is changed only to 'main' branch on Travis CI
- :memo: CODE_OF_CONDUCT.md is added
- :green_heart: Github Action for CI
- :package: My email address is corrected
- :arrow_up: Packages for development is updated
  - `@types/node` is upgraded from 16.7.1 to 16.7.10
  - `@typescript-eslint/eslint-plugin` is upgraded from 4.29.2 to 4.30.0
  - `@typescript-eslint/parser` is upgraded from 4.29.2 to 4.30.0
  - `mkdirp` is added
  - `mocha` is upgraded from 9.1.0 to 9.1.1
  - `npm-run-all` is added
  - `terser` is upgraded from 5.7.1 to 5.7.2
  - `typescript` is upgraded from 4.3.5 to 4.4.2
  - `uuid` is removed
- :zap: Performance improvement
  - 'pop' method is made to access 'length' once at a time
- :memo: Some badges are added

## Version 1.1.1

- :no_entry: N/A

## Version 1.1.0

- :no_entry: N/A

## Version 1.0.3

- :no_entry: N/A

## Version 1.0.2

- :no_entry: N/A

## Version 1.0.1

- :no_entry: N/A

## Version 1.0.0

- :tada: Initial release
