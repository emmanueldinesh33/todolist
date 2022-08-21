const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/toDoListDB",{useNewUrlParser:true});

const listSchema ={
  name: String,
}
const Item = mongoose.Model("Item",listSchema);



app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({Extended:true}));

let getItem = [];
let workList = [];

app.get("/", function(req,res){
  res.render("list",{listTitle:"Today",Items:getItem});
});

app.post("/",function(req , res){;
  let data = req.body.newItem;
  if(req.body.Anything==="Work_List")
  {
    workList.push(data);
    res.redirect("/work");
  }
  else
  getItem.push(data);
  res.redirect("/");
});

app.get("/work", function(req,res){
  res.render("list", {listTitle:"Work_List",Items:workList});
});


app.listen(3000, function(req,res){
  console.log("Server started at port 3000");
})
