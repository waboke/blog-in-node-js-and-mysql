
const express = require('express');
const router = express.Router();
const db = require("../database/connection.js");
const prevention =require("sqlstring");


router.get("/", (req, res, next)=>{
//res.render('home.ejs');
db.query(`SELECT * FROM blog`, (err, result)=>{
    if(err){
        console.log(err);

    }else{
        //res.json(result);
        res.render("home.ejs", {result})
    }
});
});
router.get("/show/:id",(req, res, next)=>{
    const id =req.params.id;
    //res.render("show.ejs");
    db.query(`SELECT * FROM blog WHERE id = ${id} LIMIT 1`, (err, result)=>{
        if(err){
            console.log("err");
        }else{
            res.render("show.ejs", {result})

        }

    })
})
router.get("/edit/:id", (req, res)=>{
    const id = req.params.id;
    const post = req.body;
    db.query(`SELECT * FROM blog WHERE id = '${id}'`, (err, result)=>{
        if(err){
            console.log(err);

        }else{
            res.render("edit.ejs", {result})

        }

    })
})
router.post("/edit/:id", (req, res)=>{ 
    const post = req.body
    const id =req.params.id
    db.query(`UPDATE blog
    SET  title = ${prevention.escape(post.title)},
    img_url = ${prevention.escape(post.img_url)},
    description = ${prevention.escape(post.description)}
    WHERE id = '${id}'`,(err, result)=>{
            if(err){
             console.log(err)
            }else{
                console.log("blog updated")
                res.redirect("/")
             }    
    })

})

router.get("/delete/:id", (req, res)=>{
    const id = req.params.id
    db.query(`DELETE FROM blog WHERE id = ${id}`, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log("blog deleted");
            res.redirect("/")
        }

    })

})

router.get("/create", (req, res)=>{
    res.render("create.ejs");
})
router.post("/create", (req, res)=>{
    const post =req.body
    db.query(`INSERT INTO blog(title, img_url, description)
                     VALUES(${prevention.escape(post.title)},
                     ${prevention.escape(post.img_url)},
                     ${prevention.escape(post.description)})`, (err, result)=>{
                        if(err){
                            console.log(err)
                        }else{
                            res.redirect("/");
                        }
                     })
    
})
module.exports = router