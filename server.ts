import * as express from "express";
import * as cors from "cors"
import * as createError from 'http-errors'
import * as path from 'path'
import * as http from 'http'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import Proxy = require('express-http-proxy') 
import {RegisterRoutes} from './routes/routes';
import * as db from './db/main'
import * as SwaggerConnector from './utils/swaggerConnector'
import bunyan = require('bunyan');
export class Server{
    private log = bunyan.createLogger({name: "grocery-planner"});
    constructor(private app: express.Application) {
    }
  
    public async init(){
        try{
            this.app.use(cors());
            this.app.use(logger('dev'));
            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: false }));
            this.app.use(cookieParser());

            SwaggerConnector.default.Setup(this.app, '../swagger.json');
            RegisterRoutes(this.app);
            const proxy = Proxy("http://localhost:3005");
            this.app.use("/", (req, res, next) => {
                const URL = req.originalUrl;
                if (URL.indexOf("/groceryplanner/api") >= 0 || URL.indexOf("docs") >= 0) {
                    return next();
                }  else {
                    proxy(req, res, next);
                }
            });

            db.init().then(async () => {

            });
        }catch(err){
            console.log("error: "+err);
            throw(err);
        }
    }

    public async run(){
        try {
            let server = http.createServer(this.app);
            server.listen(3006);
            this.log.info("Server started on port 3006");
        }
        catch(err){
            this.log.info({ error: err }, "Fatal error occurred", err);
            throw err;
        }
    }
}