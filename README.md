# React Webpack

## local development

### 1. add environments

-   `.env` in the project root directory

```
CDN_ENDPOINT=localhost
```

-   If you add more environments, add those to the `.env` and `webpack.config.common.js` in the project root directory.

### 2. execute `dev.sh` with the args like show below

-   start (start webpack-dev-server in your localhost)<br>./dev.sh start
-   build (yarn build production mode)<br>./dev.sh build
-   test<br>./dev.sh test

## Prod

### deploy infrastructures to AWS with cloudformation, which template is in the `resource` directory.

1. rewrite your `SOURCE_S3_BUCKET` and `FRONTEND_SOURCE_BUCKET` for your environment.
2. execute `deploy.sh`
