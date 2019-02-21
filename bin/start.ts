// Load required modules
import express = require('express')
import { Server } from "../server";

// Construct the NodeJS Express Server
const server = new Server(express());

// Init the NodeJS Express server, which configures middlewares, api, routes, controllers, etc...
server.init();

// Start the NodeJS Exporess server Once things are all configured
server.run();
