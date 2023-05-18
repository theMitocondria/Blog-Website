
const mongoose=require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash=require("lodash");
const length=100;

// connecting to mongoose Server
mongoose.connect("mongodb+srv://dhruv:MEHTA@cluster0.rapcoui.mongodb.net/blogDB");

const app = express();
const posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// declaring models and schema
const PostSchema={
  head:String,
  data:String
}

const ListSchema={
  item:[PostSchema]
}

const Post=mongoose.model("Post",PostSchema);
const List=mongoose.model("List",ListSchema);

// structured fixed contact
const homeStartingContent = "Welcome to our blog website! Here, we share our thoughts, ideas, and experiences on various topics ranging from lifestyle, health, travel, and technology to entertainment, sports, and more. Our aim is to provide you with informative, engaging, and thought-provoking content that will keep you entertained and informed. Whether you're looking for advice, inspiration, or just a good read, our blog is the perfect place for you. So, sit back, relax, and enjoy our articles. Don't forget to leave your comments and feedback, as we always love hearing from our readers!";

const aboutContent ="Hi there! My name is Dhruv Mehta, and I'm a student and a developer. I've been interested in technology since I was a child, and over the years, I've developed a passion for programming and web development .Recently, I had the opportunity to work on a website project, and I am proud to say that I developed this website on my own.The website that you are currently on is one of my creations, and I'm thrilled to share it with you.As a student, I have always been fascinated by the power of the internet and the endless possibilities it presents. Developing websites has allowed me to explore that power and create something tangible that people can use and interact with.This website was a project that I worked on with a team of developers, designers, and content creators. We aimed to create a platform that would be easy to use, visually appealing, and provide value to its users. We spent countless hours brainstorming, designing, and coding to bring this website to life.Throughout the development process, I learned a lot about website development, from designing user interfaces to writing clean and efficient code. The experience was both challenging and rewarding, and it helped me grow as a developer.As a student, I am always looking for ways to learn and grow, and this project provided me with the perfect opportunity to do so. It allowed me to put my skills to the test and learn from experienced developers and designers.I am proud of what we've accomplished with this website, and I hope you find it useful and enjoyable to use. As a developer, I am always looking for new challenges and projects to work on, so if you have any ideas or suggestions, feel free to reach out to me.Thank you for taking the time to read this, and I hope you enjoy using this website as much as I enjoyed developing it."

const contactContent = "I would love to hear from you! Whether you have a question, a suggestion, or just want to say hello, please feel free to get in touch with me. You can find me on Github and LinkedIn, where I share my latest projects and updates. You can also reach me on WhatsApp, and I'll be happy to chat with you.Don't hesitate to contact me if you need any assistance or want to discuss any ideas or projects. I'm always excited to collaborate with other developers and professionals in the field.Thank you for visiting my website, and I look forward to hearing from you soon!";

// get requests
app.get("/",(req,res)=>{
  Post.find({},(err,posts)=>{
    res.render("home",{
      content:homeStartingContent,
      arr:posts
    })
  })
})

app.get("/posts/:entry",(req,res)=>{
  const urlCode=req.params.entry;
  //console.log(urlCode);
  Post.findOne({head:urlCode},(err,found)=>{
    if(!err){
      res.render("post",{
        title:urlCode,
        content:found.data
      })
    }
  })
})
app.get("/about",(req,res)=>{
  res.render("about",{
    content:aboutContent
  })
})

app.get("/contact",(req,res)=>{
  res.render("contact",{
    content:contactContent
  })
})

app.get("/compose",(req,res)=>{
  res.render("compose");
})


// app.push requests
app.post("/",(req,res)=>{
  const content1=req.body.newJournalContent;
  const title=req.body.newJournalTitle;
var content = content1;
  const post1=new Post({
    head:title,
    data:content
  })

  post1.save((err)=>{
    if(!err){
      res.render("/home");
    }
  });
//console.log(posts);
  //console.log(title);
  res.redirect("/");

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
