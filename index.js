import http from "http";
import config from "./config.js";
// Create Express web app
import app from "./webapp.js";

// Create an HTTP server and listen on the configured port
var server = http.createServer(app);
server.listen(config.port, function () {
  console.log("Express server listening on *:" + config.port);
});
