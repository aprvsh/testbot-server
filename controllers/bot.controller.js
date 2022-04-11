import botService from "../services/bot.service.js";

async function queryBot(req, res) {
    const { queryText } = req.body;

    try {
        const botResponse = await botService.queryBot(queryText);
        res.send(botResponse);
    } catch (err) {
        res.status(500).send({
            message: "Bot Query failed",
        });
    }
}

async function getIntents(req, res) {
    try {
        const intents = await botService.getIntents();
        res.send(intents);
    } catch (err) {
        res.status(500).send({
            message: "Failed to fetch intents",
        });
    }
}

export default {
    queryBot,
    getIntents,
};
