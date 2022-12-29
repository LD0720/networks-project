var express = require('express');
var path = require('path');
var fs = require('fs');
const { json } = require('express');
var app = express();
const { MongoClient } = require('mongodb');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const { options } = require('nodemon/lib/config');
var user=null ;
var arr=[]

//session setup
app.use(cookieParser());
app.use(
  session({
    resave:true,
    saveUninitialized:true,
    secret:"secret"
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//database connection
 const connecttodb = async () => { 
    const client = await MongoClient.connect("mongodb://127.0.0.1", {
       useNewUrlParser: true,
       useUnifiedTopology: true
    });
    return client;
 };

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
   res.render('login')
});
// if (req.session.user){
   //  
// }
app.get('/Home', function (req, res) {
    if(req.session.user){
      res.render('home')
   }
   else{
      return res.status(400).json({ msg: 'You have to login first' })
   }

});


app.get('/searchresults', function (req, res) {
   if(req.session.user){
   res.render('searchresults',{result:arr})
}
else{
   return res.status(400).json({ msg: 'You have to login first' })
}
});
//5656
app.get('/cities', function (req, res) {
   if(req.session.user){
   res.render('cities')
   }
   else{
      return res.status(400).json({ msg: 'You have to login first' })
   }}
);

app.get('/hiking', function (req, res) {
   if(req.session.user){

   res.render('hiking')
   }
   else{
      return res.status(400).json({ msg: 'You have to login first' })
   }
});

app.get('/islands', function (req, res) {
if (req.session.user){
   res.render('islands')
}else{
   return res.status(400).json({ msg: 'You have to login first' })

}
});

app.get('/paris', function (req, res) {
   if (req.session.user){
   res.render('paris')
}else{
   return res.status(400).json({ msg: 'You have to login first' })
}

});
app.post('/paris',async (req,res) =>{
   const client = await connecttodb(); 
   const db = client.db('myDB');

   if(req.session.user.wantogolist.includes("paris")){
      return res.status(400).json({ msg: 'This destination is in the list already' });
   }
   else{
      req.session.user.wantogolist.push("paris");
      req.session.save();
      db.collection("myCollection").updateOne({username:req.session.user.username},{$set:{wantogolist:req.session.user.wantogolist}});
      res.redirect("/paris");
   }
});

app.get('/rome', function (req, res) {
   res.render('rome')
});

app.post('/rome',async (req,res) =>{
   const client = await connecttodb(); 
   const db = client.db('myDB');
   if(req.session.user.wantogolist.includes("Rome")){
      return res.status(400).json({ msg: 'This destination is in the list already' });
   }
   else{
      req.session.user.wantogolist.push("Rome");
      req.session.save();
      db.collection("myCollection").updateOne({username:req.session.user.username},{$set:{wantogolist:req.session.user.wantogolist}});
      res.redirect("/rome");
   }
});

app.get('/bali', function (req, res) {
   res.render('bali')
});
app.post('/bali',async (req,res) =>{
   const client = await connecttodb(); 
   const db = client.db('myDB');
   if(req.session.user.wantogolist.includes("Bali")){
      return res.status(400).json({ msg: 'This destination is in the list already' });
   }
   else{
      req.session.user.wantogolist.push("Bali");
      req.session.save();
      db.collection("myCollection").updateOne({username:req.session.user.username},{$set:{wantogolist:req.session.user.wantogolist}});
      res.redirect("/bali");
   }
});

app.get('/santorini', function (req, res) {
   res.render('santorini')
});

app.post('/santorini',async (req,res) =>{
   const client = await connecttodb(); 
   const db = client.db('myDB');
   if(req.session.user.wantogolist.includes("Santorini")){
      return res.status(400).json({ msg: 'This destination is in the list already' });
   }
   else{
      req.session.user.wantogolist.push("Santorini");
      req.session.save();
      db.collection("myCollection").updateOne({username:req.session.user.username},{$set:{wantogolist:req.session.user.wantogolist}});
      res.redirect("/santorini");
   }
});

app.get('/inca', function (req, res) {
   res.render('inca')
});

app.post('/inca',async (req,res) =>{
   const client = await connecttodb(); 
   const db = client.db('myDB');
   if(req.session.user.wantogolist.includes("Inca")){
      return res.status(400).json({ msg: 'This destination is in the list already' });
   }
   else{
      req.session.user.wantogolist.push("Inca");
      req.session.save();
      db.collection("myCollection").updateOne({username:req.session.user.username},{$set:{wantogolist:req.session.user.wantogolist}});
      res.redirect("/inca");
   }
});

app.get('/annapurna', function (req, res) {
   res.render('annapurna')
});
app.post('/annapurna',async (req,res) =>{
   const client = await connecttodb(); 
   const db = client.db('myDB');
   if(req.session.user.wantogolist.includes("Annapurna")){
      return res.status(400).json({ msg: 'This destination is in the list already' });
   }
   else{
      req.session.user.wantogolist.push("Annapurna");
      req.session.save();
      db.collection("myCollection").updateOne({username:req.session.user.username},{$set:{wantogolist:req.session.user.wantogolist}});
      res.redirect("/annapurna");
   }
});

app.get('/wanttogo', function (req, res) {
   list = user.wantogolist ;
   console.log(list);
   res.render('wanttogo',{wantogolist: req.session.user.wantogolist} )
});


app.get('/registration', function (req, res) {
   res.render('registration')
});

app.post('/search', function (req, res) {
   var x = req.body.Search;
   console.log(x);
   var  options = ['bali','inca', 'paris','rome','santorini','annapurna']
   for(var i=0; i<options.length; i++){
      if (options[i].indexOf(x) !== -1){
         arr.push(options[i]);
      }
   }
   res.redirect('/searchresults');
});

app.post('/register',  async(req, res)=> {
   var username = req.body.username;
   var password = req.body.password;
   var wantogolist = [];
   
   const user = { username, password , wantogolist};
   const client = await connecttodb(); 
   const db = client.db('myDB');
   //check if user exists
   
   if(!username||!password){
      return res.status(400).json({ msg: 'Some fields are left empty' });
   }
   else{
    const userExists = await db.collection('myCollection').findOne({ username
    });
    
   if (userExists) { //if user exists != null  //there is a user
      return res.status(400).json({ msg: 'User already exists' });
   }
   else
      {
             await db.collection('myCollection').insertOne(user);
             res.redirect('/');
      }
   }
 });


 app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
      if(username=='admin' && password=='admin'){
         res.redirect('/Home');
      }
      else{
    const client = await connecttodb();
     const db = client.db('myDB');
     
       user = await db.collection('myCollection').findOne({ username
       });
      if (!user) { //if user ==null  //there is no user
         return res.status(400).json({ msg: 'User does not exist' });
     }
      if (password === user.password) {
         req.session.user=user;
         req.session.save();
         res.redirect('/Home');
      } else {
         res.status(400).json({ msg: 'Incorrect password' });
    }

   }
   });

app.listen(3000);


