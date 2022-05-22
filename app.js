//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Hi! I'm Pasinee, a pharmacist turned Software Engineer. Welcome to my homepage!";
const contactContent = "pasinee.sb@gmail.com";
const aboutContent = "These blogposts serve as part of my experiment projects as I learn how to code."

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://pasineesb1:minkymouse1@cluster0.f9zle.mongodb.net/blogDB");

const postsSchema = {
  title: String,
  content: String,
};
const Post = mongoose.model("Post", postsSchema);

app.get("/", function(req, res) {

  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
  // res.render("home", {
  //   startingContent : homeStartingContent,
  //   posts : posts,

});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutPage: aboutContent
  });
})


app.get("/contact", function(req, res) {
  res.render("contact", {
    contactPage: contactContent
  })
})

app.get("/compose", function(req, res) {
  res.render("compose");
})

app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.newPost,
    content: req.body.newPostDetail
  });
  post.save(function(err) {
    if (!err) {
      res.redirect("/")
    }
  });
});

app.get("/posts/:postId", function(req, res) {
  const requestedTitle = req.params.postId;

  Post.findOne({_id: requestedTitle}, function(err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });


});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
