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
  <p>Unleash Your Creativity: Dive into the World of Writing and Blogging! 📝✨</p>

  <p>Writing isn't just a hobby; it's a journey of self-expression, exploration, and discovery. Whether you're penning down your thoughts, sharing your experiences, or weaving tales of imagination, writing opens doors to endless possibilities.</p>

  <p>Key Highlights:</p>
  <ul>
    <li>Explore your passions: From travel adventures to culinary delights, hobbies to heartfelt anecdotes, your blog is your canvas to paint your passions and share your interests with the world.</li>
    <li>Connect with like-minded individuals: Join a community of writers, bloggers, and enthusiasts who share your interests and inspire you to grow and evolve on your writing journey.</li>
    <li>Embrace creativity: With every word you write, every story you tell, unleash your creativity and let your imagination soar to new heights.</li>
    <li>Inspire and be inspired: As you share your stories and experiences, spark inspiration in others and create meaningful connections that transcend boundaries.</li>
    <li>Make your mark: Leave a lasting impact with your words, leaving readers inspired, entertained, and eager for more.</li>
  </ul>

  <p>Whether you're a seasoned writer or just starting on your blogging adventure, let your passion guide you and your creativity flow as you embark on this thrilling journey of writing and self-discovery. 🌟🖋️💭</p>
`;


const aboutContent = `
  About Our Company

  Our company is dedicated to providing innovative solutions in the field of technology. With a team of passionate individuals, we strive to deliver high-quality products and services that meet the needs of our clients.

  Key Highlights:
  - Expertise: Our team consists of skilled professionals with expertise in various domains, including web development, mobile app development, artificial intelligence, and more.
  - Collaboration: We believe in the power of collaboration and teamwork. By working closely with our clients, we ensure that their requirements are met and their expectations are exceeded.
  - Innovation: Innovation is at the heart of everything we do. We continuously explore new technologies and approaches to stay ahead of the curve and deliver cutting-edge solutions.
  - Customer Satisfaction: Customer satisfaction is our top priority. We go above and beyond to ensure that our clients are happy with the results and receive the support they need.

  At our company, we are committed to excellence, integrity, and customer success. Partner with us and experience the difference!
`;

const contactContent = `
  Contact Us

  Have a question or inquiry? Feel free to reach out to us! Our team is here to assist you and address any concerns you may have.

  Whether you're interested in our services, have feedback to share, or simply want to say hello, we'd love to hear from you. Get in touch with us today!
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
    });
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

  newPost.save(
    function(err) {
      if (err) {
        console.error("Error saving post:", err);
        // Handle the error as needed, such as rendering an error page or sending an error response
        return res.status(500).send("Error saving post");
      } else {
        console.log("Post saved successfully!");
        res.redirect("/");
      }
    }
  );

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

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
