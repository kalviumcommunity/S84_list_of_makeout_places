const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

module.exports = (client) => {
  const db = client.db("asapdb"); // Change if you use a different db name
  const spotsCollection = db.collection("romanticSpots");

  // GET all spots
  router.get("/spots", async (req, res) => {
    const spots = await spotsCollection.find({}).toArray();
    res.json(spots);
  });

  // POST a new spot
  router.post("/spots", async (req, res) => {
    const { name, description } = req.body;
    const result = await spotsCollection.insertOne({ name, description });
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
