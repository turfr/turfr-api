import { createApp } from "./server.js";

const server = createApp();

const port = Number(process.env.PORT) || 3000;

server.listen(port, "0.0.0.0", () => {
    console.log(`turfr-api listening on port ${port}`);
});