const express = require('express');

//todo this ensures that the mongoose connects to the database
require('./db/mongoose')

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT||3000



//todo
// Without Middleware: new request -> run route handler
// With Middleware : new request -> do something -> run route handler
// Registering Middleware function....needs to be first
//
// app.use((req,res,next)=>{
// //todo next is specific to the middleware
//
// //todo blocking the get method
//     if(req.method === 'GET'){
//         res.send('GET request are disabled');
//     }else {
//         //todo this is Imp so as the next thing to run i.e. Route Handler
//         next();
//     }
//
// })


//todo middleware for maintenance mode
// app.use((req,res,next)=>{
//     res.status(503).send(`Site is currently down. check back soon`);
// })



//todo automatically parse incoming json to
// an object
app.use(express.json())


//todo Registering a Router
app.use(userRouter);
app.use(taskRouter);


//
// //todo Creating a new Router
//  const router = new express.Router();
//
// //todo Creating Routes
// router.get('/test',(req,res)=>{
//     res.send(`This is from other router`);
// })
// //todo IMP register the router
// app.use(router);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

const bcrypt = require('bcryptjs');


//todo After user logs in we send a JWT for Authentication
const jwt = require('jsonwebtoken');
//todo Note that client  sends a token in the
// request header in order to get authenticated
// with key as Authorization   and  value as  Bearer followed by token value


const myFunction = async ()=>{

    //todo this creates a new JSON WEB TOKEN
    // the returned value from sign is a unique Token
    // First parameter is the data that will be embeded in token..should be a unique Identifier
    // for the user that is authenticated
    // Second parameter is the secret that is used to sign the token
    // to ensure that it is not tampered in any way
    // Third Argument is the time after which the token will expire
    // Whole point of jwt is to create Data(First Parameter) that is verifiable using the Signature(Second Parameter)
    const token =  jwt.sign({_id:'abcd123'},'thisismynewcourse',{expiresIn: '7 days'});
    console.log(token);

    //todo this is to verify the token, i.e. Authentication
    const data = jwt.verify(token,'thisismynewcourse');
    console.log(data);

    //todo jwt is made up of 3 distinct parts ..seperated by two period
    // first is base64 encoded header..contain info about what kind of token it is (jwt) and algo used to generate it
    // Second is base64 encoded payload ...contains the body
    // Third is base64 encoded signature
}

myFunction()


const Task = require('./models/task');
const User = require('./models/user');


const main = async ()=>{
    //  const task = await Task.findById('606f0ce2f44e174f84395233');
    // //todo conversion from id of the owner to entire profile of that owner
    // // using populate method..it allows to populate Data from a RelationShip
    // // execPopulate is to actually run the populate method
    // //     console.log(task);
    //
    //  await task.populate('owner').execPopulate();
    //  console.log(task.owner);


     const user = await User.findById('606f0bae2e7b2129245fc354');
     // console.log(user);
      await user.populate('tasks').execPopulate();
     console.log(user.tasks)

}

main();