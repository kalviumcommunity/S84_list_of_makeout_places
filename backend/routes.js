const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

module.exports = (client) => {
  const db = client.db("asapdb"); // Change if you use a different db name
  const spotsCollection = db.collection("romanticSpots");

  router.get("/spots", async (req, res) => {
    const userId = req.query.userId;
    const filter = userId ? { created_by: userId } : {};
    const spots = await spotsCollection.find(filter).toArray();
    res.json(spots);
  });
  
  

 // POST a new spot with created_by
 router.post("/spots", async (req, res) => {
    const { name, description } = req.body;
  
    if (!name || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    const result = await spotsCollection.insertOne({
      name,
      description,
      image: `https://source.unsplash.com/random/800x600?romantic,spot,${Date.now()}`
    });
  
    res.json(result);
  });
  
  

  // PUT update a spot
  router.put("/spots/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await spotsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, description } }
    );
    res.json(result);
  });

  // DELETE a spot
  router.delete("/spots/:id", async (req, res) => {
    const { id } = req.params;
    const result = await spotsCollection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  });

  return router;
};
