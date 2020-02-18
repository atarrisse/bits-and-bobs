const input = `${__dirname}/input.csv`;
const fn = require("./csv-to-object");

fn(input, "output.json");
