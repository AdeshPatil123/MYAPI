const UserData = require("../Models/UserData");

exports.login = async (req, res) => {
    try {
        const payload = {
            email : req.query.Email,
            password : req.query.Password
        };

        //Check whether email already exists in db
        const verify = await UserData.findOne({email : req.query.Email});
        console.log(verify);

        if(!verify) {
            return res.status(400).send({
                message : "User not registered. Please signup"
            });
        }

        if(verify.password !== req.query.Password) {
            return res.status(400).send({
                message : "Wrong password. Try again"
            })
        }

        res.status(200).send({
            message : "Login successful",
            user : payload
        })
    }
    catch (err) {
        res.status(500).send(err);
    }
}

exports.signup = async (req, res) => {
    try {
        //Get user's data from req body to make User Object
        const user = new UserData({
            name : req.query.Name,
            email : req.query.Email,
            password : req.query.Password
        });

        //Check whether email already exists in db
        const verify = await UserData.find({email : req.query.Email});
        console.log(verify);

        let result, verifiedUser;
        if(verify.length > 0) {
            //User already exists
            result = false;                     
        }
        else {
            //User does not exist so add in db
            verifiedUser = await user.save();
            result = true;
        }
        if(result) {
            res.status(200).send({
                message : "User data added. Signup successful",
                user : verifiedUser
            });
        }
        else {
            res.status(400).send({
                message : "User already exists. Signup failed"
            })
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}