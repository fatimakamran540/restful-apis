const express = require("express");
const app = express();
const port = 3000;
var methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
const path = require("path");



//to parse data coming from user post
app.use(express.urlencoded ({ extended: true }));
app.use(methodOverride('_method'));


//setting ejs path
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

//path for public folder
app.use(express.static(path.join(__dirname , "public")));

//data
let posts = [
    {
        id:uuidv4(),
        username : "Chandler" ,
        content : "Could i be anymore happier"
    },
    {
        id:uuidv4(),
        username : "Joye",
        content : "joye doesn't share food"
    },
    {
        id:uuidv4(),
        username : "Ross",
        content : "We were on a break"
    }
]


//show all post
app.get("/posts" ,(req,res) =>{
  res.render("index.ejs" ,{posts});
})
//create new  post
 app.get("/posts/new" ,(req,res) =>{
    res.render("new.ejs");
})

app.post("/posts" ,(req,res) =>{
    let {username ,content} =req.body;
    let id = uuidv4();
    posts.push ({ id,username ,content});
    res.redirect("/posts");
})

// //show specific post using id
app.get("/posts/:id" , (req, res)=>{
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs" , {post});
    
});

//edit post
app.patch("/posts/:id" ,(req,res) =>{                                     
   let {id } =req.params;
   let newContent = req.body.content;
   let post = posts.find((p) => id === p.id);
   post.content =newContent;
   console.log(post);
   res.redirect("/posts");
})

app.get("/posts/:id/edit" ,(req,res)=>{
    let {id} =req.params;
    let post =posts.find((p) => id === p.id);
    res.render("edit.ejs" , {post}); 
})



//delete post
app.delete("/posts/:id" ,(req,res) =>{
    let{ id } =req.params;
    posts = posts.filter((p) = id !== p.id);
    res.redirect("/posts");
  })





app.listen(port ,() =>{
    console.log(`server is running on: ${port}`);
})


