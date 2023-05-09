const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
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