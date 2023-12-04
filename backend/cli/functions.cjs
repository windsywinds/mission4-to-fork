const { MongoClient, ObjectId } = require('mongodb'); //we would use this for MongoDB package

const mongoose = require('mongoose'); 

const carSchema = require('../models/carSchema.cjs'); //A schema is required for mongoose, but not mongoDB

// This function is adding the entry data from the 'add' command to the database
const addEntry = async (inputData) => {
    try {
        // Connect to the MongoDB URL and database
        await mongoose.connect('mongodb://localhost:27017/NewDatabaseName', { useNewUrlParser: true });

        // Create a model based on the schema
        const Car = mongoose.model('Car', carSchema);

        // Insert the entry data into the "cars" collection
        const result = await Car.create(inputData);

        // Log the success message with the ID of the entry to confirm it worked
        console.info(`A new entry was added and auto assigned the ID: ${result._id}`);

        // Now we could also fetch all entries from the "cars" collection, 
        // but this should probably be its own function we call with a new command
        const entry = await Car.find({});

        // Log the entries and the count
        console.info(entry);
        console.info(`${entry.length} matches in the cars collection`);
    } catch (error) {
        // Handle errors
        console.error('Some error handling here', error);
    } finally {
        // We use 'finally' to say "Always do this as the last step, even if there's an error".
        // Close the Mongoose connection
        await mongoose.connection.close();
    }
};


//This example below is for using MongoDB, the commands.cjs work the same for both because commands are just calling functions


// //this function is adding the entry data from the 'add' command to the database
// const addEntry = async (inputData) => {
//     //initialize our client to talk to the database
//     const client = new MongoClient('mongodb://localhost:27017/')
//     try {
//         //connect our client to the database
//       await client.connect();

//       //We could think of each line here as we did in mongosh. But this basically creates our path so we can interact with the database:
//       //use NewDatabaseName
//       const database = client.db('NewDatabaseName');
//       //db.createCollection("CollectionName")
//       const collection = database.collection('CollectionName');
//       //db.CollectionName.insertOne({inputData}) //remember the questions? each answer was an array item, so we're sending an array inside this variable
//                                                 //if we just allowed an answer, then it would be a string.
//       const result = await collection.insertOne(inputData);
//       //now we could log this in the console to let the user know it worked with the ID of the entry
//       console.info(`A new entry was added and auto assigned the ID: ${result.insertedId}`);


//       //now it's also add some lines that will tell us more, These could be removed and added to their own function to be called with a seperate command
//       //if we send an empty array {} then we can just return all results.
//       const entry = await collection.find({}).toArray();
//       //then add some lines to read out the info to the user
//       console.info(entry);
//       console.info(`${entry.length} matches in the ${collection} collection`)
//     } catch (error) {
//         console.error("Some error handling here")
//     } finally {
//         //we need to close the connection because we're no longer using it.
//         await client.close();
//     }
//   }

  module.exports = { addEntry }