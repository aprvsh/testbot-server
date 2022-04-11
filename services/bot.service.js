import dialogflow from "@google-cloud/dialogflow";
import { v4 as uuid } from "uuid";

async function queryBot(queryText) {
    const sessionId = uuid();
    const projectId = process.env.GCP_PROJECT_ID;

    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "gcp.json",
    });
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: queryText,
                languageCode: "en-US",
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log("  No intent matched.");
    }

    return result.fulfillmentText;
}

async function getIntents() {
    const projectId = process.env.GCP_PROJECT_ID;

    const intentsClient = new dialogflow.IntentsClient({
        keyFilename: "gcp.json",
    });

    async function listIntents() {
        const projectAgentPath = intentsClient.projectAgentPath(projectId);

        const request = {
            parent: projectAgentPath,
        };

        const [response] = await intentsClient.listIntents(request);
        const intentNames = [];
        response.forEach((intent) => {
            if (intent.displayName.toLowerCase() != "fallback")
                intentNames.push(intent.displayName);
        });
        return intentNames;
    }

    const res = listIntents();
    return res;
}

export default {
    queryBot,
    getIntents,
};
