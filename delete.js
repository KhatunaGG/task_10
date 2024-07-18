#! /usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { writeData, readData } = require("./utils");



program
  .command("delete")
  .argument("<category>")
  .action(async (category) => {
    const data = await readData("data.json", true);
    const copiedExpenses = data[0];
    const index = copiedExpenses.expenses.findIndex(
      (el) => el.category === category
    );
    if (!category)
      throw new Error({
        successe: false,
        message: `category ${category} not found`,
      });

    const deletedExpense = copiedExpenses.expenses.splice(index, 1);
    if (index === -1) {
      throw new Error(`Category '${category}' not found`);
    }
    const deletedAmount =
      copiedExpenses.balance + Number(deletedExpense[0].expense);
    const updatedCopiedExpenses = {
      ...copiedExpenses,
      balance: deletedAmount,
      expenses: copiedExpenses.expenses,
    };

    await writeData('data.json', [updatedCopiedExpenses])
    console.log({
      successe: true,
      message: { deletedExpense: deletedExpense[0] },
    });
  });
program.parse();
