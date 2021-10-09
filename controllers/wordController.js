const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const config = require("../config.json");

exports.word = (req, res) => {
  let num = parseInt(req.params[0]);
  if (num > config.MAX_WORDS) num = config.MAX_WORDS;

  let lorem = new LoremIpsum().generateWords(num);
  if (req.params[1] === ",") {
    lorem = lorem.split(" ");
  }

  res.json({
    params: req.params,
    data: lorem,
  });
};
