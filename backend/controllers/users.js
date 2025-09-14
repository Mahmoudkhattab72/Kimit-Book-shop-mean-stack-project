const usersModel = require("../models/users");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const add = async (request, response) => { 
    const user = request.body;
    user.imageName = request.newFileName;
    const duplicatedEmail = await usersModel.selectOne({
            email: user.email,
        });
        if (duplicatedEmail !== null) {
            return response.status(403).json({
                status: "error",
                msg: 'email ${user.email} already exists',
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedText = bcrypt.hashSync(user.password, salt);
        user.password = hashedText;

    
        const insertResult = await usersModel.insert(user);
    return response.status(200).json(insertResult);
};

const select = async (request, response) => { 
    const users = await usersModel.selectAll();
    return response.status(200).json(users);

};

const update = async (request, response) => { 
    const userid = request.params.id;
    const newUser = request.body;
    const updateSchema = joi.object({
        name: joi
        .string()
        .min(3)
        .max(10)
        .pattern(/[a-zA-Z]{3,10}/)
        .required(),
        email: joi.string().email().min(5).max(20).required(),
        address: joi.string().min(6).max(20).required(),
        city: joi.string().min(6).max(20).required(),
    });
    const validationResult = updateSchema.validate(newUser);
    if (validationResult.error) {
        return response.status(400).json(validationResult.error);
    }
    const isDuplicated = await usersModel.selectOne({
        email: newUser.email,
    });
    if(isDuplicated !== null  && !isDuplicated._id.equals(userid)){
        return response.status(403).json({
        status:"error",
        mse:'Email :: ${newUser.email} is already exists',
        });  
    }
    const updateResult = await usersModel.updateData(userid, newUser);
    if (updateResult === null) {
        return response.status(404).json("id not found");
    }
    response.status(201).json('user :: ${userId} updated');

};

const deleteUsers = async (request, response) => {
    const id = request.params.id;
    const deleteResult = await usersModel.deleteUserById(id);
    console.log("deleteResult ::", deleteResult);

    if(deleteResult.modifiedCount === 0) {
        return response.status(404).json('user with ID: ${id} is not found')
    }
    response.status(200).json('user ID: ${id} deleted');
};

const recover = async (request, response) => {
    const id = request.params.id;
    console.log("id ::", id);
    
    const recoverResult = await usersModel.recover(id);
    if(recoverResult.modifiedCount === 0) {
        return response.status(404).json('user with id: ${id} not found');
    }
    return response.status(200).json('user id ${id} recovered ');
};
const login = async(request, response) => {
    const user = request.body;
    const selectOneResult = await usersModel.selectOne({
        email: user.email,
    });
    if (selectOneResult === null){
        return response.status(404).json('Email not found ${user.email}')
    }
    console.log("selectOneResult ::", selectOneResult);
    console.log("user ::", user);
const isPasswordCorrect = bcrypt.compareSync(user.password, selectOneResult.password);
if (isPasswordCorrect){
    const token = jwt.sign(
        {
            name: selectOneResult.name,
            email: selectOneResult.email,
        },
        "key@123"
    );
    return response.status(200).json({
        status: "ok",
        token,
    });
    
}else{
    return response.status(401).json("wrong password");
}
};


module.exports = {
    select,
    add,
    update,
    deleteUsers,
    recover,
    login,
};