const express = require('express');

//todo this ensures that the mongoose connects to the database
require('./db/mongoose')

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT||3000

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

const myFunction = async ()=>{
    const password = 'Nick1234!';
    //todo 8 is the number of rounds of hashing to be performed
    const hashedPassword = await bcrypt.hash(password,8);

    console.log(hashedPassword);
    const isMatch = await bcrypt.compare('Nick1234!',hashedPassword);
    console.log(isMatch);
}

myFunction()