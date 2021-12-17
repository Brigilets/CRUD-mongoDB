//CRUD create read update delete
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectId = mongoDB.ObjectID
const { MongoClient, ObjectID, FindCursor } = require('mongodb')
const dotenv = require('dotenv')

dotenv.config()
const connectionURL = process.env.DBURL
const databaseName = process.env.DBNAME

//const id = new ObjectID()
//console.log(id.id.length)
//console.log(id.toHexString().length)

//checking if we are connected to the db
MongoClient.connect(connectionURL, {useNewUrlParser: true},(error,client)=>{
if(error){
    return console.log('Unable to connect to database!')
}
//console.log('Connected correctly!')
//gives db reference:
const db = client.db(databaseName)

// insert document inside users collection
/*db.collection('users').insertOne({
  _id
    name:"John",
    age:29
}, (error,result)=>{
    if(error){
        return console.log('Unable to insert user')
    }
    console.log(result.insertedId)
    })

   db.collection('users').insertMany([
        {
            name:'Dan',
            age:35
        },{
            name:'Julien',
            age: 36
        }
    ], (error,result)=>{
        if(error){
            return console.log('Unable to insert users')
        }

        console.log(result.insertedIds)
    })
*/

db.collection('tasks').insertMany([
    {
        task: 'Go to school',
        completed: true,
    },
    {
        task: 'Shopping',
        completed: false
    },
    {
        task: 'Water the plants',
        completed: false
    }
], (error,result)=>{
    if(error){
        return console.log('Unable to add tasks')
    }

    console.log(result.insertedIds)
})*/
//searching for user in our db by name in this case
//IF user DOES NOT exist in db, it will return null (not error) 

//searching for db entries by ID:
//db.collection('users').findOne({_id: new ObjectID("61b9cc3603d6cb441c687bbf")}, (error,user)=>{

/*db.collection('users').findOne({name:'Julien'}, (error,user)=>{
    if(error){
        return console.log('Unable to fetch')
    }
    console.log(user)
})
*/
/*
db.collection('users').find({ age: 29 }).toArray((error,users)=>{
  //returns the array with data
    console.log(users)
})

db.collection('users').find({ age: 29 }).count((error,count)=>{
  //retuns count of documents in collection matching criteria
    console.log(count)
})*/

//READ

db.collection('tasks').findOne({_id: new ObjectID("61b9c5b8ec1e33f4b15c55de")}, (error,task)=>{
    if(error){
        return console.log('Unable to fetch')
    }
    console.log(task)
})

db.collection('tasks').find({completed: false}).toArray((error,tasks)=>{
    console.log(tasks)
})

//UPDATE

const updatePromise = db.collection('users').updateOne({
    _id: new ObjectID("61b9cc3603d6cb441c687bbf")
}, {
    $set :{
        name: 'Brigi'
    }
})
updatePromise.then((result)=>{
console.log(result)
}).catch((error)=>{
console.log(error)
})

//shorthand version of update
/*
db.collection('users').updateOne({
    _id: new ObjectID("61b9cc3603d6cb441c687bbf")
},{
    $set: {
        name:'Brigita'
    }//,{
       // $inc:{
         //   age: 1 //(-1 for decrement)
     //   }
    
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})*/
// UPDATE
/*
db.collection('tasks').updateMany({completed:false},
   {
       $set: {
           completed: true
       }
   }).then((result)=>{
       console.log(result)
   }).catch((error)=>{
       console.log(error)
   })
*/

// DELETE

db.collection('users').deleteMany({
    age : 30
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})
 
db.collection('tasks').deleteOne({
    task: 'Shopping'
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})
})
