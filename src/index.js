const inquirer = require("inquirer");
const { startingOptions, startingQuestion } = require("./questions");
const { createConnection, initializeDB, handleFirstAnswer } = require("./db");
const { printTable } = require("console-table-printer");

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

    /*
    inquirer
      .prompt(startingQuestion)
      .then((answers) => {
        if (answers.startingQuestion == startingOptions.exit) {
          console.log("Exiting application...");
          // process.exit();
        } else {
          if (answers.startingQuestion === startingOptions.viewRoles) {
            db.promise()
              .query("SELECT * from role")
              .then(([rows, fields]) => {
                printTable(rows);
                prompt();
              })
              .catch((err) => console.log(err));

            // db.query("SELECT * from role", (err, results) => {
            //   if (err) {
            //     console.error(err);
            //   } else {
            //     console.log("\n");
            //     printTable(results);
            //     console.log("\n");
            //     return "sdjkflhsdljkfh";
            //   }
            // });
          }

          handleFirstAnswer(answers.startingQuestion, db);
          // console.log("sdkjfhsdjklf");
          // console.log(anyKey.value);
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment.
        } else {
          // Something else went wrong.
        }
      });
      */
  };
  prompt();
};

start();
