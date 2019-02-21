import SwaggerUI =  require('swagger-ui-express')
import bunyan = require('bunyan');
export default class SwaggerConnector{

    private static log = bunyan.createLogger({name: "grocery-planner"});
    static Setup(app, swaggerDocDir){
        try{
            const swaggerDocument = require(swaggerDocDir);
            app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));
        }catch(err){
            this.log.info({"error" : err},"Error occured during api setup");
        }
    }
}