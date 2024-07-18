#! /usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { writeData, readData } = require("./utils");


program
  .command("add")
  .argument("<exspenseAmount>")
  .argument("<category>")
  .action(async (exspenseAmount, category) => {
    const data = await readData("data.json", true);
    if (data.length === 0) {
      throw new Error("No data found");
    }

    const copiedExpenses = data[0];
    const lastId =
      copiedExpenses.expenses.length > 0
        ? copiedExpenses.expenses[copiedExpenses.expenses.length - 1].id
        : 0;

    if (copiedExpenses.balance < Number(exspenseAmount)) {
      throw new Error({ successe: false, message: "Insufficient balance" });
    }

    copiedExpenses.expenses.push({
      expense: Number(exspenseAmount),
      category: category,
      id: lastId + 1,
      date: new Date().toISOString(),
    });

    const updatedCopiedExpenses = {
      ...copiedExpenses,
      balance: copiedExpenses.balance - Number(exspenseAmount),
      expenses: copiedExpenses.expenses,
    };
    await writeData("data.json", [updatedCopiedExpenses]);
    console.log({ successe: true, message: "Expense added" });
  });
program.parse();
