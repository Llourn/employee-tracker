# Employee Tracker

## Description

A CLI app used to keep track of Employees, Roles, and Departments. Review and modify data stored on a database.

https://user-images.githubusercontent.com/4216705/231563359-a5434556-5f2d-4c0c-b410-0b5d2286890e.mov

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Requirements:

- Node v18.x
- MySQL Server

Instructions:

- clone this repo.
- cd into project directory
- npm install
- update MySQL database connection configuration in `db.js`.
- `npm run start`

Note: On start, the `initializeDB()` function will create the table and seed it with data. If this isn't disired just comment out the function call in `index.js`

## Usage

Use the keyboard to navigate the UI and to enter text input when prompted.

To exit select `🚪 Exit` from the main menu.

## License

MIT License Copyright (c) 2023 Lorne Cyr

## Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Boot Camp Project](https://img.shields.io/badge/Boot%20Camp%20Project-%E2%9C%94%EF%B8%8F-green)
