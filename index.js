const express = require("express");
const bodyParser = require("body-parser")
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express()

mongoose.connect('mongodb+srv://soniclinkerman:Sonic123@zaltick-pq9hg.mongodb.net/accountDB', {useNewUrlParser: true,  useUnifiedTopology: true });

const accountSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
})

const Account = new mongoose.model("Account", accountSchema);

app.use(express.static("public"));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}))

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", (req,res) => {
    var newAccount = new Account({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    })

    newAccount.save(function(err){
        if(err){
            console.log(err)
        }
        else{
            res.render("success")
        }
    })

})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Account.findOne({username: username}, function(err, foundUser) {
        if(err) {
            res.send(err)
        }
        else{
            if(foundUser){
                if(foundUser.password === password) {
                    res.render("success")
                }
            }
        }

    })
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, function(){
    console.log("Server has started")
})