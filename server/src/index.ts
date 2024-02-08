import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const startServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 8000;
    app.use(express.json());

    //initalise an appolo server
    const gqlServer = new ApolloServer({
        typeDefs : `
        type Query {
            hellow : String
            say (name:String): String
        }
        `,
        resolvers : {
            Query : {
                hellow : ()=>"hellow from graphql",
                say : (parent,{name})=>name
            }
        }
    })

    //Starting the server->To start the server we canot use await in global space. so we will create a async function and will call it later
    await gqlServer.start();
    // Specify the path where we'd like to mount our server
    app.use('/graphql',expressMiddleware(gqlServer));
    app.get('/', (req, res) => {
        res.json({ msg: "Server is up and running" })
    })
    app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`))
}

startServer();