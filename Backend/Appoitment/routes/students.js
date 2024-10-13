const router = require("express").Router();
const { error } = require("console");
let student = require ("../BACKEND/models/student");

router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const age = Number (req.body.age);
    const gender = req.body.gender;

    const newStudent = new student({
        name,
        age,
        gender
    })

    newStudent.save().then(()=>{
        res.json("student Added")
    }).catch((err)=>{
        console.log(err);
    })
});

router.route("/").get((req,res)=>{

    student.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err)
    })
});

router.route("/update/:id").put(async (req, res)=>{
    let userId = req.params.id;
    const {name,age,gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }

    const update = await student.findByIdAndUpdate(userId,updateStudent)
    .then(()=>{
     res.status(200).send({status: "User Update"})
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error with updating data",error: err.message});
})

});

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await student.findByIdAndDelete(userId)
      .then(()=> {
        res.status(200).send({status: "User deleted"});
      }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error: err.message});
    })
});

router.route("/get/:id").get(async (req, res) =>{
    let userId = req.params.id;
   const user = await student.findById(userId)
    .then((student)=>{
        res.status(200).send({status: "User fetched",student})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message});
    })
});
module.exports = router;