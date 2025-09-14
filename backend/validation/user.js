const joi = require("joi");

const addUserValidation = async(request, response, next) =>{
    const user = request.body;
    const schema = joi.object({
            name: joi
            .string()
            .min(3)
            .max(10)
            .pattern(/[a-zA-Z]{3,10}/)
            .required(),
            email: joi.string().email().min(5).max(20).required(),
            password: joi.string().min(6).max(20).required(),
            address: joi.string().min(6).max(20).required(),
            city: joi.string().min(1).max(20).required(),
        });
        const validationResult = schema.validate(user);
        if(validationResult.error){
            return response.status(400).json(validationResult.error);
        }
    next()
};
const loginValidation = async (request, response, next) =>{
    const user = request.body;
    const loginSchema = joi.object({
            email: joi.string().email().min(6).max(20).required(),
            password: joi.string().min(6).max(20).required(),
        });
        const isValidData = loginSchema.validate(user);
        if (isValidData.error){
            return response.status(400).json(isValidData); 
        }
        next()
};

module.exports = {addUserValidation, loginValidation};