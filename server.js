const express = require('express')
const userModal = require('./Modal/User')
const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const bodyparser = require('body-parser')
const cors = require('cors')
const {AppError} = require('./Error/apolloError')
const mongoose = require('mongoose')
const typeDefs = require('./TypeDefination/typeDef')
const resolvers = require('./Resolver/resolver')
const musicTypeDef = require('./TypeDefination/musicTypeDef')
const musicResolver = require('./Resolver/musicResolver')
const app = express()
const { makeExecutableSchema } = require('graphql-tools');
//const { ApolloServer, gql  } = require('apollo-server');
const { ApolloServer, gql } = require('apollo-server-express');
const schema = makeExecutableSchema({
    typeDefs : [typeDefs , musicTypeDef],
    resolvers : [resolvers, musicResolver],
})
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors()) 
const cookieparser = require('cookie-parser');
app.use(cookieparser());
const server = new ApolloServer({
    schema:schema,
    context: ({ req, res }) => ({ req, res }),
        // console.log(req)
    //     if (req.headers && req.headers.authorization &&req.body.operationName !=="login") {
    //         var auth = req.headers.authorization;
    //         var parts = auth.split(" ");
    //         var bearer = parts[0];
    //         var token = parts[1];
    //         if (bearer == "Bearer") {
    //             jwt.verify(token, process.env.SECRET_KEY,  function(err, decoded) {
    //                 if (err) {
    //                     console.log(err);
    //                     throw new AuthenticationError("Invalid Token");
    //                 }
    //                 try{
    //                     userModal.find({email : decoded.email})
    //                     console.log("hit")
    //                 }
    //                 catch{
    //                     throw  Error("Invalid Token" );
    //                 }
    //             });
    //        } 
    //       else {
    //         throw  Error("Token is required");
    //       }
    //   }
} 
) 


const MONGO_KEY = process.env.MONGO_URL
mongoose.connect(MONGO_KEY, {
    dbName: 'Music'
}).then((res) => {
    console.log('Database connected successfully',)
}).catch((error) => {
    console.log("Error occured while connecting")
})

app.listen(8080, async() => {
    await server.start()
server.applyMiddleware({ app });
    console.log("Server has started on : ", 8080)
})
// //Load balancers?
// let music = require('./RESTAPI/GET/getAllSongs')
// app.use('/',music)
//////////////////////////////////////////////////////////////////////////////////

// const userCredentials = {
//     username: 'admin',
//     password: 'admin123',
//     email: 'admin@gmail.com'
// }

// app.post('/login', (req, res) => {
//     // Destructuring username & password from body
//     const { username, password } = req.body;

//     // Checking if credentials match
//     if (username === userCredentials.username && 
//         password === userCredentials.password) {
        
//         //creating a access token
//         const accessToken = jwt.sign({
//             username: userCredentials.username,
//             email: userCredentials.email
//         },"MYSECRETACCESS", {
//             expiresIn: '10m'
//         });
//         // Creating refresh token not that expiry of refresh 
//         //token is greater than the access token
        
//         const refreshToken = jwt.sign({
//             username: userCredentials.username,
//         },"MYREFRESHTOKENSECRET", { expiresIn: '1d' });
//         console.log(refreshToken)
//         // Assigning refresh token in http-only cookie 
//         res.cookie('jwt', refreshToken, { httpOnly: true, 
//             sameSite: 'None', secure: true, 
//             maxAge: 24 * 60 * 60 * 1000 });
//         return res.json({ accessToken });
//     }
//     else {
//         // Return unauthorized error if credentials don't match
//         return res.status(406).json({ 
//             message: 'Invalid credentials' });
//     }
// })

// app.post('/refresh', (req, res) => {
//     console.log(req)
//     if (req.cookies?.jwt) {

//         // Destructuring refreshToken from cookie
//         const refreshToken = req.cookies.jwt;
//         // Verifying refresh token
//         jwt.verify(refreshToken,"MYREFRESHTOKENSECRET", 
//         (err, decoded) => {
//             if (err) {

//                 // Wrong Refesh Token
//                 return res.status(406).json({ message: 'Unauthorized' });
//             }
//             else {
//                 // Correct token we send a new access token
//                 const accessToken = jwt.sign({
//                     username: userCredentials.username,
//                     email: userCredentials.email
//                 },"MYSECRETACCESS", {
//                     expiresIn: '10m'
//                 });
//                 return res.json({ accessToken });
//             }
//         })
//     } else {
//         return res.status(406).json({ message: 'Unauthorized' });
//     }
// })
// app.listen(8081, () => {
//     console.log("Server has started on : ", 8081)
// })