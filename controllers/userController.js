const User = require("../models/userModel");
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    //1. Check incoming data
    console.log(req.body);

    //2. Destructure the incoming data
    const { firstName, lastName, email, password } = req.body;

    //3.Validate the data (if empty, stop the process and send res)
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            "message": "Please enter all fields!"
        })
    }
    //4. Error Handling (Try Catch)
    try {
        //5. Check if the user is already registered
        const existingUser = await User.findOne({ email: email })
        //5.1 If the user is found: Send response
        if (existingUser) {
            return res.status(400).json({
                "message": "User already exists"
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
        res.status(200).json({
            message: "User created successfully!"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createUser
}