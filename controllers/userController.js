const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (req, res) => {
    console.log(req.body);

    const { fname, lname, email, password, phone } = req.body;

    if (!fname || !lname || !email || !password || !phone) {
        return res.json({
            "success": false,
            "message": "Please enter all fields!"
        });
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.json({
                "success": false,
                "message": "User Already Exists!"
            });
        }

        const randomSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, randomSalt);

        const user = new User({
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            password: hashedPassword,
        });

        await user.save();

        return res.json({
            "success": true,
            "message": "User Created Successfully!"
        });

    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            return res.json({
                "success": false,
                "message": "Internal Server Error!"
            });
        }
    }
}

const loginUser = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            "success": false,
            "message": "Please enter all fields!"
        });
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.json({
                "success": false,
                "message": "User doesn't exist!!"
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.json({
                "success": false,
                "message": "Password not matched!"
            });
        }

        const token = await jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Optional: token expiry time
        );

        return res.json({
            "success": true,
            "message": "User Logged in Successfully",
            "token": token,
            "userData": user
        });

    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            return res.json({
                "success": false,
                "message": "Internal Server Error!"
            });
        }
    }
}


//exporting
module.exports = {
    createUser,
    loginUser,
}