import fs from "fs";

fs.writeFile("./gcp.json", process.env.GCP_KEY, (err) =>
    console.log(err || "Credential File Generated")
);
