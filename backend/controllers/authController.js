const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async(req, res) => {
    const {username, email, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password: hashedPassword});
        await user.save();
        res.status(201).send({message:'User created sccessfully'});
    } catch (error) {
        res.status(400).send(error);
    }
};

const login = async (req, res)=> {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).send({message:'User not found'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send({message: 'Invalid credentials'});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).send({token});
    } catch (error) {
        res.status(500).send(error);
    }
};

const getUser = async (req, res) =>{
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.status(200).send({user});
    } catch (error) {
        res.status(500).send({error: 'Error fetching user information'});
    }
};

module.exports = {register, login, getUser};