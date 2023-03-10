const { ApolloServer, gql } = require('apollo-server');
const ConstraintDirective = require('graphql-constraint-directive')
 const typeDefs = gql`
 
 type Products {
    userID:String
 }

 type Query{
    getUser : [Products]
 }

type User{
    userID:Int
    userName:String
    email:String
    phone:Int
    password :String
    role:String
    message : String
 }

 type Authentication{
    token:String
    message:String
 }

 type Message {
   message : String
 }

type Mutation{
    createUser(userID:Int, userName:String,email:String,phone:Int,password :String,role:String ):User
    login(email:String,password:String):Authentication
    logout(token:String):Message
   }
`;
module.exports = typeDefs;