const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// testing server is working or not
app.get('/', (req, res)=>{
    res.send('Server is Working');
});


const uri = `mongodb+srv://${process.env.EXPRESSO_USER}:${process.env.EXPRESSO_PASS}@cluster0.as9pvg2.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const coffeeCollection = client.db('expressoDB').collection('coffee');


    //get or read all the coffee
    app.get('/coffees', async(req, res)=>{
        const cursor = coffeeCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    // add or post a new coffee
    app.post('/coffees', async(req, res)=> {
        const newCoffee = req.body;
        console.log(newCoffee);
        const result = await coffeeCollection.insertOne(newCoffee);
        res.send(result);
    })


    //delete coffee card
    app.delete('/coffees/:id', async(req, res)=>{
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id)};
        const result = await coffeeCollection.deleteOne(query);
        res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






// which port server is working
app.listen(port, ()=>{
    console.log(`Server is working on PORT: ${port}`);
});