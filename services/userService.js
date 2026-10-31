const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');

//signup
async function signup(email,password) {
    const HashedPassword = await bcrypt.hash(password,10);
    return await userRepository.create(email,HashedPassword,'employee');
}

//login
async function getUserByEmail(email) {
    return await userRepository.findByEmail(email);
}

module.exports = { signup,getUserByEmail };