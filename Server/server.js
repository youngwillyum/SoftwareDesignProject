import express from "express"
import cors from "cors"
import resturants from "./api/restaurants.route.js"
import tables from "./api/tables.route.js";
import reservations from "./api/reservations.route.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/restaurants", resturants)
app.use("/api/v1/tables", tables)
app.use("/api/v1/reservations", reservations)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app

