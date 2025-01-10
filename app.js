//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

const homeStartingContent = `
Unleash your inner wordsmith and embark on an exhilarating journey of self-expression with our blog platform! 🚀✍️ Dive into a world where every keystroke is a brushstroke, painting vivid stories, sharing experiences, and sparking connections. 🎨💬 Whether you're a seasoned writer or a budding enthusiast, our platform provides the perfect canvas for your creativity to flourish. 🌟📝 Join our vibrant community, connect with like-minded individuals, and let your words dance across the digital realm, leaving a lasting impact on readers worldwide. 💫🌍 Let's write, share, and inspire together! 🌟🚀
`;


const aboutContent = `
At our company, we are committed to delivering innovative solutions in the ever-evolving landscape of technology. With a dedicated team of experts, we strive to provide high-quality products and services tailored to meet the unique needs of our clients. Our key highlights include a diverse range of expertise spanning web development, mobile app development, artificial intelligence, and more. We strongly believe in the power of collaboration, working closely with our clients to ensure their requirements are not only met but exceeded. Innovation drives us forward, as we continuously explore new technologies and approaches to deliver cutting-edge solutions. Above all, customer satisfaction remains our top priority, as we go the extra mile to ensure our clients are delighted with the results and receive the support they need. Partner with us and experience the difference! 🚀
`;

const contactContent = `
Got a question or need assistance? Reach out to us! Our dedicated team is here to address any concerns you may have and provide you with the support you need. Whether you're interested in our services, have feedback to share, or simply want to say hello, we'd love to hear from you. Don't hesitate to contact us today! 📧

`;


const SchemaOfPost = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", SchemaOfPost);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(__dirname + "/public"))


app.get("/", function(req, res){
  Post.find({})
    .then(function(foundContent) {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: foundContent
      });
    })
    .catch(function(err) {
      console.log(err);
    }
  );
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  const newPost = new Post ({
    title: post.title,
    content: post.content
  });

  newPost.save()
    .then(function() {
      console.log("Post saved successfully!");
      res.redirect("/");
    })
    .catch(function(err) {
      console.error("Error saving post:", err);
      // Handle the error as needed, such as rendering an error page or sending an error response
      res.status(500).send("Error saving post");
    });
});

app.get("/posts/:postId", function(req, res){
  const requestedId = req.params.postId;

  Post.findOne(({_id: requestedId}))
    .then(function(foundItems) {
      res.render("post", {
        title: foundItems.title,
        content: foundItems.content
      });
    })
});

app.listen(4000, function() {
  console.log("Server started on port 3000");
});
