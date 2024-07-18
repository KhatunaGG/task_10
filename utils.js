const { writeFile } = require("fs");
const fs = require("fs/promises");

const readData = async (filepath, isParsed = false) => {
  try {
    if (!filepath) return "";
    const data = await fs.readFile(filepath, "utf-8");
    return isParsed ? JSON.parse(data) : data;
  } catch (er) {
    console.log(er);
  }
};


const writeData = async (filepath, data) => {
  try {
    await fs.writeFile(filepath, JSON.stringify(data));
    console.log({ message: "Done" });
  } catch (er) {
    console.log(er);
  }
};

module.exports = { readData, writeData };
