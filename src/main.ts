import { createApp } from "./server.js";

const server = createApp();

server.listen(3000, () => {
    console.log("turfr-api listening on http://localhost:3000");
});1