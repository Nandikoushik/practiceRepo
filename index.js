const express= require("express");
const bodyparser= require("body-parser");
const app=express();
const route=require('./route');
const router=require('./Router');
const mid=express.raw({type: 'application/json'})
const mid1=express.json();
const mid2=express.urlencoded({ extended: true });
const mid3=bodyparser.json();



 app.use('/webhookRouter',mid,route);
 //app.use('/',mid1,mid2,mid3,route);


app.get('/',(req,res)=>{
    res.send(
        {"name":"Koushik nandi"}
    );

});




app.listen(8080, function (err) {
    if (err) console.log(err);
    console.log("Server listening on 8080", 8080);
})
