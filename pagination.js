const express = require("express");
const app = express();
const { readData } = require("./utils");
app.use(express.json());



app.get("/posts", async (req, res) => {
  let { name, age, page = 1, posts = 5 } = req.query;
  const data = await readData("posts.json", true);
  let newData = data;

  if (age && name) {
    const multiFiltereddByAge = data.filter(
      (el) => Number(el.aga) > Number(age)
    );
    newData = multiFiltereddByAge.filter((el) => el.name === name);
  }

  if (age) {
    newData = data.filter((el) => Number(el.aga) > Number(age));
  }

  if (name) {
    newData = data.filter((el) => el.name === name);
  }

  if (posts >= 5) posts = 5;
  newData = newData.slice((page - 1) * posts, page * posts);

  res.status(200).json(newData);
});

app.listen(3003, () => {
  console.log("Server is running on http://localhost:3003");
});
