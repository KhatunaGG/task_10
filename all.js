#! /usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { readData } = require("./utils");


program.command("all").action(async () => {
  const data = await readData("data.json", true);
  console.log(data, "data");
});
program.parse();



