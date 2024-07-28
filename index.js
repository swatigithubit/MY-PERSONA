const express=require("express");
const app=express();
const{v4:uuidv4}=require('uuid');
uuidv4();
const port=8080;
const methodOverride=require("method-override");
const path=require("path");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));

app.set("viewengine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.listen(port,()=>{
    console.log(`listen on port ${port}`)});
    let posts=[
        {username:"Swati Yadav",
           id:uuidv4(),
            content:"i love to explore"
        },{
            username:"saksham",
            id: uuidv4(),
            content:"i love ML "
        },
        {
            username:"Radhika",
            id:uuidv4(),
            content:" i love logical reasoning and game playing"
        }
    ]
    app.get("/posts",(req,res)=>{
        res.render("index.ejs",{posts});
    });
    app.get("/posts/new",(req,res)=>{
        res.render("new.ejs");
    });
    app.post("/posts",(req,res)=>{
        let {username,content}=req.body;
        let id=uuidv4();
        posts.push({username,id,content});
        // res.send("post req working");
        res.redirect("/posts");
    });
    app.get("/posts/:id",(req,res)=>{
        let {id}=req.params;
        // console.log(id);
        // res.send("accepted");
       let  post=posts.find((p) => id===p.id);
        res.render("show.ejs",{post});
    });
    app.delete("/posts/:id",(req,res)=>{
        let {id}=req.params;
        // let post=posts.find((p)=>id===p.id);
        // res.send(" delete success");
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    console.log(post);
    // res.render("edit.ejs");
    // res.send("pathch req working");
    res.redirect("/posts");
});
// app.get("/posts/:id/edit",(req,res)=>{
//     let {id}=req.params;
//     let post=posts.find((p)=>id===p.id);
//     // res.send("success");
//     res.render("edit.ejs",{post});
// })
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id); // Ensure correct comparison
     res.render("edit.ejs", {post}); // Pass the post object to the view
    //  res.redirect("/posts");
    } 
);
