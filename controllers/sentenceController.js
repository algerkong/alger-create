const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const config = require("../config.json");

exports.sentence = (req, res) => {
  let num = parseInt(req.params[0]);
  if (num > config.MAX_SENTENCES) num = config.MAX_SENTENCES;

  let lorem = new LoremIpsum().generateSentences(parseInt(num));
  if (req.params[1] == ",") {
    lorem = lorem.split(".");
    lorem = lorem.map((sentence) => sentence + ".");
  }
  res.json({
    params: req.params,
    data: lorem,
  });
};
