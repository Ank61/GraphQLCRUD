const userModal = require('../Modal/User')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');
const yup = require("yup");
const {AppError} = require('../Error/apolloError')
const { body, validationResult, param, check } = require('express-validator');

const MY_KEY = process.env.SECRET_KEY
const userSchema = yup.array().of(
    yup.object({
        userID: yup.number(),
        userName: yup.string(),
        email: yup.string().email().required(),
        phone: yup.number(),
        password:yup.string().required(),
        role : yup.string(),
        account_status : yup.string()
    })
);


const resolvers = {
    Query: {
        getUser: () => {
        }
    },
    Mutation: {
        createUser: async (root, args, context, info) => {
            const checkEmail = await userModal.findOne({ email: args.email }).catch(err => console.log(err))
            if (checkEmail) {
                throw new Error("User already Exists")
            }
            try{
                await userSchema.isValid(args);
            }
            catch(err){
                return ({ type: err.name })
            }
            // else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(args.password, salt, async function (err, hash) {
                        const newUser = await userModal.create({
                            userID: args.userID,
                            userName: args.userName,
                            email: args.email,
                            phone: args.phone,
                            password: hash,
                            role: args.role
                        }).catch(err => console.log(err))
                         return newUser
                    });
                });
            let obj  = {}
            obj.message = "Successfully inserted new user"
            return obj;
            //}
        },


        login: async (root, args, context, info) => {
            let response = {}
            console.log(context ,"This is context...." )
            const { email, password } = args
             try{
                 await userSchema.isValid(args);
             }
             catch(err){
                 return ({ type: err.name })
             }
            const checkEmail = userModal.findOne({ email: email }).then(res=>{
                if(res!=null) return res
                else return false
            }).catch(err => console.log("Error occured in login section", err))
            const Data = await checkEmail.then()
            const hash = Data.password
            const test =  await bcrypt.compare(password, hash)
            if(Data &&  test){  
                    const token = jwt.sign({ email: email }, MY_KEY , { expiresIn: '2m' })
                    await userModal.updateOne({ email: email }, { $set: { token: token } }).catch(err => console.log(err))
                    response.token   = token
                    response.message = "Successfully Logged in"
                        return response
                }
                else{
                    response.message = "Invalid Credentials"
                    response.token = ""
                     return response
                }
            },

        logout: async (root, args, context, info) => {
            let sendMessage = {}
            const { token } = args
            const deleteToken = userModal.findOne({ token: token })
            .then(res => {
                if (res != null) return true
                else  return false
            })
            const isValid = await userSchema.isValid(args);
            if (!isValid) {
                throw new AppError({ msg: 'Invalid User Data for logout', code: 400 });
            }
            try {
                const user =await deleteToken.then()
                if (user) {
                    const Update =  userModal.updateOne({token:token},{ $set : {token:" "}})
                    .then(result=>{
                        if(result.modifiedCount>0) return true
                        else return false
                    })
                    const CheckUpdate = await Update.then()
                    if(CheckUpdate){
                        sendMessage.message = "Successfully Logged Out"
                        return sendMessage}
                    else{
                        sendMessage.message = "Failed to Log out"
                        return sendMessage
                    }}
                     else{
                        sendMessage.message = "Could not found token"
                        return sendMessage
                     }
            }
            catch {
                throw new Error("Error Occured while loging Out")
            }
        }

    }
}

module.exports = resolvers
// if (!isValid) {
            //     throw new AppError({ msg: 'Invalid User Data for login', code: 400 });
            // }