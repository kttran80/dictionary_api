import * as mongoose from "mongoose";
import { Request, Response } from 'express';
import { TestSchema } from "../models/testModel";

const Test = mongoose.model('Test', TestSchema);

export class TestController {

    public addATest(req: Request, res: Response) {
        
        console.log(req.body);

        let newTest = new Test(req.body);

        newTest.save((err, test)=>{
            if (err){
                console.log(err);
            }

            res.json(test);
        });
    
    };

    public getTestCollection(req: Request, res: Response) {

        Test.find({}, (err, test) =>{
            if (err){
                console.log(err);
            }

            res.json(test);
        });
        
    };

    public modifyATet(req: Request, res: Response) {

        res.send("modify a test here");
        
    };
}