const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({

  title: {
    type: String
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

})





module.exports = mongoose.model("postsss", postSchema);