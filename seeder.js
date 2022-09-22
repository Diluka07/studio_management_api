const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models

const MusicalItem = require("./models/MusicalItem");
const Category = require("./models/Category");

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const musicalItems = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/musicalItems.json`, "utf-8")
);
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/categories.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Category.create(categories);
    await MusicalItem.create(musicalItems);
    console.log("Data Imported...".green.inverse);
  } catch (error) {
    console.log(error);
  }
};

// Delete from DB
const deleteData = async () => {
  try {
    await MusicalItem.deleteMany();
    await Category.deleteMany();
    console.log("Data Destroyed...".red.inverse);
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
