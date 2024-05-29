const User = require("../models/userModel");
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    //1. Check incoming data
    console.log(req.body);

    //2. Destructure the incoming data
    const { firstName, lastName, email, password } = req.body;

    //3.Validate the data (if empty, stop the process and send res)
    if (!firstName || !lastName || !email || !password) {
        res.json({
            "success": false,
            "message": "Please enter all fields!"
        })
    }
    //4. Error Handling (Try Catch)
    try {
        //5. Check if the user is already registered
        const existingUser = await User.findOne({ email: email })
        //5.1 If the user is found: Send response
        if(existingUser){
            return res.json({
                "success": false,
                "message": "User Already Exists!"
            })
        }

        //5.2.1 Hash the password
        // Hashing/Encryption of the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, randomSalt)

        const user = new User({
            //Database Fields: Client's Value
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        });

        //5.2.2 Save to the database
        await user.save()

        //5.2.3 Send successful response
        res.json({
            "success": true,
            "message": "User Created Successfuly!"
        })

    } catch (error) {
        console.log(error)
        res.json({
            "success":false,
            "message":"Internal Server Error!"
        })
    }
}

module.exports = {
    createUser
}