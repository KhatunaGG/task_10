#! /usr/bin/env node

// ააწყეთ ხარჯების მენეჯერის Cli(expense manager cli) აპლიკაცია რომელსაც ექნება შემდეგი ფუნცქიონალი:

// 1) ხარჯის ობიექტის დამატება
// 2) ხარჯის ობიექტის წაშლა
// 3) ხარჯის ობიექტის მოძიება თარიღით და კატეგორიით

// მოსალოდნელი ფუნცქიონალი

// create-expense total category date უნდა შეიქმნას ახალი ობეიქტი და ჩაიწეროს json ფაილში

// search-expense shopping მოძიებული უნდა იქნა შესაბამისი კატეგორიის ხარჯი და დაკონსოლდეს ტერმინალში

// delete-expense 2 უნდა წაიშალოს შესაბამის ინდექსზე მყოფი ხარჯი.

// უნდა გამოიყენოთ fs, path მოდული რომ იმუშაოთ ფაილურ სისტემაზე და ასევე უნდა გამოიყენოთ commander ბიბლიოთეკა

// მინიშნება: უნდა გქონდეს 3 სხვადასხვა js ის ფაილი და შესაბამისი ბრძანებები უნდა გაწეროთ
//  package.json bin create-expense: create.js, search-expense: search.js და ა.შ.

const { Command } = require("commander");
const program = new Command();
const { writeData, readData } = require("./utils");



program
  .command('create')
  .argument("<balance>")
  .action(async (balance) => {
    const expensesData = [];
    const initBalance = Number(balance);
    const data = {
      initBalance: initBalance,
      balance: Number(balance),
      expenses: [],
    };
    expensesData.push(data);
    await writeData("data.json", expensesData);
  });

program.parse();
