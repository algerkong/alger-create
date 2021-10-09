const express = require("express");
const app = express();
const { HOST, PORT } = require("./config.json");
const word_controller = require("./controllers/wordController");
const sentence_controller = require("./controllers/sentenceController");
const paragraph_controller = require("./controllers/paragraphController");
const image_controller = require("./controllers/imageController");

// 生成随机词语 句子 段落
app.get(/\/(\d+)(?:w|word|words)(,*)$/, word_controller.word);
app.get(/\/(\d+)(?:s|sentence|sentences)(,*)$/, sentence_controller.sentence);
app.get(
  /\/(\d+)(?:p|paragraph|paragraphs)(,*)$/,
  paragraph_controller.paragraph
);

// 生成随机占位图片
app.get(
  /\/(\d+)(?:x|\*|X)(\d+)\.(jpg|jpeg|png)(?:,([a-zA-Z0-9]+?),([a-zA-Z0-9]+?))*$/,
  image_controller.image
);
app.listen(PORT, HOST, () => {
  console.log(`run http://${HOST}:${PORT}`);
});
