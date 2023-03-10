const musicModal = require('../Modal/musicModal')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');
const yup = require("yup");
const {AppError} = require('../Error/apolloError')
const { body, validationResult, param, check } = require('express-validator');

const musicResolver = {
    Query: {
        getUser: () => {
        },
        getMusic:async(root,args,context,info) =>{
           const allUsers =  await musicModal.find({}).catch(err=>console.log(err))
            return allUsers;
        }
    },
    Mutation:{
        createMusic : async(root,args,context,info)=>{
            await musicModal.create({
                artistName : args.artistName,
                title : args.title,
                album : {
                    full_title : args.album.full_title,
                    url : args.album.url,
                    name : args.album.name
                },
                label : args.label
            }).catch(err=>console.log(err))
            let obj = {}
            obj.message = "Successfully Added";
            return obj;
        }
    }
} 
module.exports =musicResolver;