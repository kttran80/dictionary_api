import { CollinDictionaryController } from '../controllers/collinDictionaryController';
import { Request, Response } from 'express';

export class DefaultRoutes {

    private collinController: CollinDictionaryController = new CollinDictionaryController();

    public apply(app) : void{

        // root api endpoint
        app.route('/')
           .get((req: Request, res: Response) =>{
               res.send('Welcome to root api');
           });

        // dictionary api endpoint
        app.route('/collins/:word')
        .get(this.collinController.checkMeaning)
   
        
    }
}

