const { GenerateToken, HashedPassword, checkPassword } = require('../lib/auth');
const UserModel = require('../model/userModel');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await UserModel.find({
            email: email,
        });

        if (existingUser.length) {
            return res.status(400).send('User Already exists!');
        }

        const hashedPassword = await HashedPassword(password);
        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(200).send("User Created Successfully.");
    }
    catch (error) {
        res.status(500).send("Sign up Failed!");
    }
});

router.post('/login',async(req,res)=>{
    const { email, password } =req.body;
    try{
        const existingUser = await UserModel.find({
            email: email,
        });

        if (!existingUser.length) {
            return res.status(400).send('User Does not exists!');
        }

        const user = existingUser[0];
        const result = await checkPassword(password,user.password);
        if(!result) return res.status(401).send("Incorrect Password!");

        const token = GenerateToken({email});
        res.send({token: token});
    }
    catch(error){
        res.status(500).send("Login Failed!");
    }
});

module.exports = router;