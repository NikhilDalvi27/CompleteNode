
//todo use this to connect to the Database
const {MongoClient, ObjectID } = require('mongodb');

//todo
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager';


MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log(`Unable to connect to database`);
    }
    //todo you can directly connect to the database,no need to create it first
    const db =  client.db(databaseName);


    //todo Create one
    // db.collection('users').insertOne({
    //     _id:id,
    //     name:'Vikram2',
    //     age:27
    // },(error,result)=>{
    //     if(error) {
    //         return console.log(`Unable to insert user`);
    //     }
    //
    //     console.log(result.ops);
    //
    // });
    //
    //
    //todo Create Multiple
    // db.collection('tasks').insertMany([
    //     {
    //         description :'Clean house',
    //         completed:true
    //     },
    //     {
    //         description :'Renew Inspection',
    //         completed:false
    //     },
    //     {
    //         description :'Pot plants',
    //         completed:false
    //     }
    //
    // ],(error,result)=>{
    //     if(error) {
    //         return console.log(`Unable to insert user`);
    //     }
    //
    //     console.log(result.ops);
    //
    // })


    //
    // //todo Reading Single Record
    // db.collection('users').findOne({name:'Jen'},(error,user)=>{
    //     if(error)
    //         return console.log(`Unable to fetch that user`);
    //
    //     console.log(user);
    // })
    //
    // //todo Reading Single Record based upon ID
    // db.collection('users').findOne({_id: new ObjectID("606c51eb6f827f266873a02b")},(error,user)=>{
    //     if(error)
    //         return console.log(`Unable to fetch that user`);
    //
    //     console.log(user);
    // })
    //
    // //todo Reading multiple records
    // db.collection('users').find({ age:27}).toArray((error,users)=>{
    //     console.log(users);
    // })
    // db.collection('users').find({ age:27}).count((error,count)=>{
    //     console.log(count);
    // })
    //
    //
    // console.log();
    //
    // db.collection('tasks').findOne({_id: new ObjectID("606c53c9d967a5037092f4d7")},(error,task)=>{
    //     console.log(task);
    // })
    //
    //
    // db.collection('tasks').find({completed: false}).toArray((error,tasks)=>{
    //     console.log(tasks);
    // })




    // //todo Update
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("606c51eb6f827f266873a02b")
    // },{
    //     $set :{
    //         name : 'Rocky'
    //     }
    // })
    // //todo this is Promise Syntax
    // updatePromise.then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })

    //todo update Many
    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount);
    // }).catch((error)=>{
    //     console.log(error);
    // })

    //todo delete Many

    // db.collection('users').deleteMany({
    //     age:27
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })

    //todo Delete One

    // db.collection('tasks').deleteOne({
    //     description:'Renew Inspection'
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })


})

