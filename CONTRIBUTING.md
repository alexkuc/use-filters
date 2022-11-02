## GitHub Pull Request

- make sure tests pass
- if you add _new_ feature, make sure to add new test
- add brief description of _why_ you did the change

## GitHub Release

- bump `version` in `package.json`
- npm run build
- create release on GitHub, attach `dist/`

## NPM Release

- do GitHub release to keep things in sync
- npm run publish

## GitHub Pages (Docs)

- npm run docs
