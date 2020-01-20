# Renata CLI

renata-cli is a command line tool to generate standard fe project (now react only).

Support Features:

- - [x] typescript
- - [x] eslint
- - [x] mock
- - [x] pre-commit
- - [x] jest

* ...and more

## Installation

```bash
  npm i renata-cli (or global install with -g)
```

## Useage

```shell
renata-cli
Usage: renata-cli <command> [options]

Options:
  -v --version  output the version number
  -h, --help    output usage information

Commands:
  init          generate an project with renata-cli
  config        change config for renata-cli

Usage
 - renata-cli init <project-name>
 - renata-cli config set <key> <value>
 - renata-cli config get <key>
 - renata-cli config remove <key>
```

## Progress

### CLI core

- - [x] project architecture

- - [x] user interactive

- - [x] merge feature package based on user input

- - [ ] install dependencied

- - [ ] configuration management (Optional)

### Feature Template

### base

- - [x] process funtion
- - [x] template
  * - [x] devServer
  * - [x] webpack base config
  * - [x] webpack dev config
  * - [ ] webpack prod config

#### typescript

- - [x] process funtion
- - [x] template

#### eslint

- - [x] process funtion
- - [x] template
  * - [x] eslintignore
  * - [x] eslintrc

#### mock

- - [x] process funtion
- - [x] template

#### pre-commit

- - [x] process funtion
- - [x] template

#### jest

- - [x] process funtion
- - [x] template
