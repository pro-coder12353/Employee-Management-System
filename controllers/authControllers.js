const bcrypt =  require ('bcrypt');
const jwt = require ('jsonwebtoken');
const userService = require('../services/userService');

async function signup(req, res) {
    const { email,password } = req.body;

    const user = await userService.signup(email, password);
    res.json(user);
}

async function login(req, res) {
    const { email,password } = req.body;

    const user = await userService.getUserByEmail(email);
    
    if(!user) {
        return res.status(401).json({error: 'Invalid Credentials'});
    }

    const match = await bcrypt.compare(password,user.password);
    if(!match) {
        return res.status(401).json({error:'Invalid Credentials'});
    }

    const token = jwt.sign(
        {user_id: user.user_id , role: user.role},
        process.env.JWT_SECRET,
        {expiresIn : '24h'}
    );
    res.json({ token });

}


module.exports = { signup,login };