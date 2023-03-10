const { ApolloServer, gql } = require('apollo-server');
const ConstraintDirective = require('graphql-constraint-directive')

const musicTypeDef = gql`
type Products {
    userID:String
 }
type albumObject {
    full_title:String 
    url:String 
    name:String
} 
type allData {
    artistName : String
    title: String
    album : albumObject
    label : String
}

 type Query{
      getUser : [Products]
      getMusic : [allData]  
}
type Music{
    message:String
}
input Album {
    full_title:String 
    url:String 
    name:String
} 
type Mutation{
    createMusic(artistName :String, title:String,label:String, album:Album ):Music
}

`
module.exports=  musicTypeDef ;