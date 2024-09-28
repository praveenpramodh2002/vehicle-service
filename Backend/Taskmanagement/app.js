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

app.get('/task',(req,res)=>{
    var Obj=[];
    controller.getTask((req,res,next)=>{
        res.send()
    });
});
app.post('/addTask',(req,res)=>{
    controller.addTask(req.body,(callback)=>{
        res.send();
    });
});