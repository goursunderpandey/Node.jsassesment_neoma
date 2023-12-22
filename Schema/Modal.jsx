const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  articles: [
    {
      source: {
        id: String,  
        name: String,
      },
      author: String,
      title: {
        type: String,
        required: true,
      },
      description: String,
      url: {
        type: String,
        required: true,
      },
      urlToImage: String,
      publishedAt: {
        type: Date,
        default: Date.now,
      },
      content: String,
    },
  ],
});

module.exports = mongoose.model("News", newsSchema);
