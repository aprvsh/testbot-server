import "dotenv/config";
import express from "express";
import cors from "cors";
import botRoute from "./routes/bot.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/bot", botRoute);

const port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`🟢 Server listening on port ${port}`);
});
