# TrustMe - Tracking-App

## Description

Trust Me is an application that is being created for tracking purposes for the solution architects team at Vue Storefront. The monorepo uses Yarn workspace, which is handling local deployment flow.

## Structure

Application is divided into 2 main parts/directories, which are:

- Client - Vue SPA application
  
- Server - Nest.js REST-API application
  

## Requirements

TrustMe requires the following to run:

- Node.js 16+
  
- Yarn
  

## Installation

```bash
$ yarn
```

## Running the app

```bash
$ yarn start
```

After `yarn start`, both application will start with following addresses:
- Back End: localhost:3000
- Front End: localhost:8080

## Adding new packages or libraries

As TrustMe uses yarn workspace, then there is one common node_modules directory, therefore, to install particular node package/library, we have to specify its workspace.

```bash
$ yarn workspace WORKSPACE_NAME add PACKAGE_NAME
```
