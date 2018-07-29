import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { DefaultRoutes } from "./routes/defaultRoutes";
import * as pretty from "express-prettify";

class App {
    // this is a entry point
    public app: express.Application;
    private mongoUrl: String = 'mongodb://localhost/testDb';
    private defaultRoutes: DefaultRoutes = new DefaultRoutes();

    constructor(){

        // reference to express js framework
        this.app = express();

        // config the body parser
        // must be before the router config
        this.config();

        // config routes
        this.defaultRoutes.apply(this.app);


        // connect to mongo db database
        //this.connectToDb();
    }

    private connectToDb() : void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

    private config() : void {
        this.app.use(pretty({ query: 'pretty' }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;