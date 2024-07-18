#! /usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { readData } = require("./utils");

program
  .command("search")
  .argument("<keyword>")
  .action(async (keyword) => {
    const data = await readData("data.json", true);

    if (!keyword) {
      throw new Error("Search keyword is mandatory");
    }

    const searchedByDate = data[0].expenses.filter((el) =>
      el.date.includes(keyword)
    );
    const searchByCategory = data[0].expenses.filter(
      (el) => el.category.toLowerCase() === keyword.toLowerCase()
    );
    const searchResult = [...searchedByDate, ...searchByCategory];
    console.log(searchResult, "searchResult");
  });

program.parse();
