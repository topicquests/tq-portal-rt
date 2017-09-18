TQ Portal RT
============
BROKEN - DO NOT USE
> This repo is a sketch of a project structure, and is not expected to build,
> work, or be used in any way. You've been warned.
> - @wenzowski

Development
-----------
Run this project with filesystem watchers enabled:
```bash
yarn install
yarn run dev
```

Committing
----------
Use of provided [pre-commit](http://pre-commit.com/) config is requested.
Please [install](http://pre-commit.com/#install) using `pip` or `brew`
then add the hooks to your git repo with `pre-commit install`

Configuration
-------------
This project uses environment variables, configurable using
[`.env`](https://github.com/motdotla/dotenv). Examples:
- `DEBUG='tq-portal-rt:*'` - controls selective logging
- `NODE_ENV='production'` - switches from dynamic compilation to `dist` folder

Deployment
----------
1. Compile the univeral javascript in `lib` to `dist`
```bash
yarn run build
```
Start server in production mode
```bash
NODE_ENV=production yarn start
```
