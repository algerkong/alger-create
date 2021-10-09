const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const config = require("../config.json");

exports.paragraph = (req, res) => {
  let num = parseInt(req.params[0]);
  if (num > config.MAX_PARAGRAPHS) num = config.MAX_PARAGRAPHS;

  let lorem = new LoremIpsum().generateParagraphs(num);
  if (req.params[1] == ",") {
    lorem = lorem.split("\r\n");
  }
  res.json({
    params: req.params,
    data: lorem,
  });
};
