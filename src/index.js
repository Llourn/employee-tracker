const inquirer = require("inquirer");
const { mainMenuOptions, mainMenu } = require("./questions");
const { createConnection, initializeDB, handleFirstAnswer } = require("./db");

const start = async () => {
  const db = await createConnection();
  await initializeDB(db);

  const prompt = async () => {
    console.log("");
    const answers = await inquirer.prompt(mainMenu);
    if (answers.mainMenu == mainMenuOptions.exit) {
      console.log("Exiting application...");
      process.exit();
    } else {
      await handleFirstAnswer(answers.mainMenu, db);
      prompt();
    }
  };
  prompt();
};

start();
