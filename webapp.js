import bodyParser from "body-parser";
import flash from "connect-flash";
import csurf from "csurf";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import config from "./config.js";
// Configure application routes
import routes from "./controllers/router.js";
import notifyOnError from "./middleware/twilioNotifications.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create Express web app
var app = express();

// Use morgan for HTTP request logging in dev and prod
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

// Serve static assets
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming form-encoded HTTP bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Create and manage HTTP sessions for all requests
app.use(
  session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true,
  })
);

// Use connect-flash to persist informational messages across redirects
app.use(flash());

var router = express.Router();

// Add CSRF protection for web routes
if (process.env.NODE_ENV !== "test") {
  app.use(csurf());
  app.use(function (request, response, next) {
    response.locals.csrftoken = request.csrfToken();
    next();
  });
}

routes(router);
app.use(router);

// Handle 404
app.use(function (request, response, next) {
  response.status(404);
  response.sendFile(path.join(__dirname, "public", "404.html"));
});

//WEIRD PLACE used to be twilioNotifications
// Mount middleware to notify Twilio of errors
app.use(notifyOnError);

// Handle Errors
app.use(function (err, request, response, next) {
  console.error("An application error has occurred:");
  console.error(err.stack);
  response.status(500);
  response.sendFile(path.join(__dirname, "public", "500.html"));
});

// Export Express app
export default app;
