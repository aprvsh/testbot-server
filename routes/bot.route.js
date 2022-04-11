import { Router } from "express";
import botController from "../controllers/bot.controller.js";
import botService from "../services/bot.service.js";
const route = Router();

route.get("/query", botController.queryBot);
route.get("/intents", botController.getIntents);

route.get("/test", async (req, res) => {
    const result = await botService.queryBot("weather in new delhi");
    res.send(result);
});

export default route;
