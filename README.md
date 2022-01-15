# ClickButtonLink

ClickButtonLink is a service that allows you to shorten long links into a compact form.

## Installation

For development, you need to install:

[Node.js](https://nodejs.org/) v12 

Microsoft Visual Studio

## Start

Before deploying the application, you need to install npm packages.
To do this, go to the root folder of the project and run the command in the console:

```
npm install
```

## Node.js packages

package.json:

```
{
  "name": "clickbuttonlink",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.16.0",
    "babel-preset-stage-0": "^6.24.1",
   "aspnet-webpack": "^2.0.3",
    "css-loader": "^0.28.7",
    "file-loader": "^1.1.6",
    "style-loader": "^0.19.1",
    "webpack": "^3.11.0"
  },
  "dependencies": {
    "babel-polyfill": "^6.26.0",
    "isomorphic-fetch": "^2.2.1",
    "query-string": "^5.0.1",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-redux": "^5.0.6",
    "react-router-dom": "^4.2.2",
    "redux": "^3.7.2",
    "redux-thunk": "^2.2.0"
  }
}
```
