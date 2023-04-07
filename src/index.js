const inquirer = require("inquirer");
const { startingOptions, startingQuestion } = require("./questions");
const { createConnection, initializeDB, handleFirstAnswer } = require("./db");

const start = async () => {
  const db = await createConnection();
  await initializeDB(db);

  const prompt = async () => {
    console.log("");
    const answers = await inquirer.prompt(startingQuestion);
    if (answers.startingQuestion == startingOptions.exit) {
      console.log("Exiting application...");
      process.exit();
    } else {
      await handleFirstAnswer(answers.startingQuestion, db);
      prompt();
    }
  };
  prompt();
};

start();
