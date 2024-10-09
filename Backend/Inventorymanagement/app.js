const express=require('express');
const app=express();
const cors=require('cors');
const controller=require('./controller');

app.use(cors());
app.use(
    express.urlencoded({
        extended:true,

    })
);

app.use(express.json());

app.get('/inventory',(req,res)=>{
    var Obj=[];
    controller.getInventory((req,res,next)=>{
        res.send()
    });
});
app.post('/inventory',(req,res)=>{
    controller.addInventory(req.body,(callback)=>{
        res.send();
    });
});