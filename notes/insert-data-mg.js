const { MongoClient } = require("mongodb");
var db = require('../db') 
// Replace the following with your Atlas connection string                                                                                                                                        
 // The database to use
 const dbName = "db";
// const url = "mongodb+srv://<username>:<password>@clustername.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const url = "mongodb+srv://quanggdb:EGQdGnZmsy5HUFJ@clusterq.av0iy.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority"
const client = new MongoClient(url,{useUnifiedTopology: true});
// const client = new MongoClient(url);
 
                      
 async function run() {
    var products = db.get('products').value(),
    for (let i=1;i<products.length;i++){
        
    }
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("products");

         // Construct a document                                                                                                                                                              
         let personDocument = {
             "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);