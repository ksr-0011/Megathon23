const express = require('express');
const user = require("../model/userModel.js");
const recents = require("../model/recentsModel.js")
router = express.Router()
module.exports = router;
router.post("/giveUsers", async (req, res) => {
    const users = await user.find()
    res.status(200).json({
        users:users
    })
})
router.post("/addRecent", async (req, res) => {
    await recents.create({
        user_ID:req.body.id
    })
    res.status(200).send("done")
})
router.get("/getRecents",async(req,res)=>{
    let recent_users = await recents.find()
    let arr=[]
    for (let i of recent_users)
    {
        arr.push(i.user_ID.toString())
    }
    output_arr= Array.from(new Set(arr))
    console.log(output_arr)
    let usersFound=[]
    for(let i of output_arr)
    {
        user_find = await user.findOne({_id:i})
        usersFound.push(user_find)
    }
    usersFound.slice(0,12)
    res.status(200).json({
        users:usersFound
    })
})
router.post("/createUser", async (req, res) => {
    const { fname, lname,email } = req.body;
    const userExists = await user.findOne({ email:email });
    if (userExists || fname === "" || lname === "" || email === "" || !email.includes('@') || !email.includes('.')) {
        res.status(400).send("User already exists");
    }
    else {
        const New_user = await user.create({
            email: email,
            fname: fname,
            lname: lname,
        })
        if (New_user) {
            res.json({
                token: New_user.id
            })
        }
        else {
            res.status(400).send("User details are incorrect");
        }
    }
})