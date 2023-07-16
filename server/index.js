const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getRandomFortune,showFortune,addFortune, deleteFortune, updateFortune } = require('./controller')

app.get("/api/fortune", getRandomFortune);
app.get("/api/show", showFortune);
app.post("/api/fortune", addFortune);
app.delete("/api/fortune/:id", deleteFortune);
app.put("/api/fortune/:id", updateFortune);
app.listen(4000, () => console.log("Server running on 4000"));
