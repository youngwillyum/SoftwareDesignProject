import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app = express(); //create instance and store in app (create server/express app)

//app.use applys middlewear, when a request reaches backend express execute these in order
app.use(cors());
app.use(express.json()); //body parser - parses incoming json in body and stores in req.body

//specify initial routes
//app listens for requests that match the specified routes AND methods ex. app.get() app.post()
//when app detects a match, it calls the specified callback fxn(s) - if more than one CB fxn, must use next() 
app.use("/api/v1/restaurants", restaurants);
app.use("*", (req, res) =>{
    res.status(404).json({error: "not found"})
})

//export the app
export default app;
