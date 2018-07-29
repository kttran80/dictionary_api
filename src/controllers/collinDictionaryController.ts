import { Request, Response } from 'express';
import axios from "axios";

export class CollinDictionaryController {

   
    public checkMeaning(req: Request, res: Response) {

        var word = req.params.word;
        word = word.trim().replace(' ','-');

        var htmlData = '';

        // encapsulated all functions in this 
        var parsedWebPage = (html) => {
             // using cheerio library
            const  cheerio = require('cheerio');

            // return a json 
            var entry = { learner: {}, american: {}, british: {}, examples: {}};

            // each portion of the dictionary page
            var learner = { 'pronounce': '', 'defs': []};
            var american = { 'pronounce': '', 'defs': []};
            var british = { 'pronounce': '', 'defs': []};
            var examples = [];

            // load web page to cheerio
            var $ = cheerio.load(html);

            // learner dictionary
            var div = $('div[data-type-block="Learner"]');
            learner.pronounce = div.find('.pron').text().trim();
            div.find('.def').map(function (i, el){                       
                learner.defs.push({'id': i, 
                            'def': $(el).text().trim(),
                            });

            });                    

            // american dictionary
            var div = $('div[data-type-block="American"]');
            american.pronounce = div.find('.pron').text().trim();;
            div.find('.def').map(function (i, el){                       
                american.defs.push({'id': i, 
                            'def': $(el).text().trim(),
                            });

            });   
            
            // british dictionary
            var div = $('div[data-type-block="English"]');
            british.pronounce = div.find('.pron').text().trim();;
            div.find('.def').map(function (i, el){                       
                british.defs.push({'id': i, 
                            'def': $(el).text().trim(),
                            });

            });

            // example dictionary
            div = $('div[data-type-block="Example sentences"]');
            div.find('.quote').map(function (i, el){
                
                examples.push({'id': i, 
                            'quote': $(el).text().trim(),
                            'origin':$(el).next().text().trim(),
                            'year':$(el).next().next().text().trim()
                            });

            });

            entry.learner = learner;
            entry.american = american;
            entry.british = british;
            entry.examples = examples;

            // example.forEach(el =>{
            //     console.log(el.quote);
            // }); 

            // console.log(entry);        
            return entry;        
        }

        // var fs = require('fs'),
        //     path = require('path'),    
        //     filePath = path.join(__dirname, '/../collin-bird.txt');

        //     fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        //          if (!err) {
        //             var entry = parsedWebPage(data);

        //             // the web page
        //             res.send(data);
        //             // the parsed 
        //             //res.json(entry);
        //             console.log(entry);
        //          } else {
        //             console.log(err);
                
        //         }
        //     });        

        
        axios.get('https://www.collinsdictionary.com/us/dictionary/english/'+word)
            .then(function (response) {
                // handle success
                
                //console.log(response.data);
                //res.status(200).send(response.data);
                htmlData = response.data;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // fs.writeFile(filePath, htmlData, (err) => {  
                //     // throws an error, you could also catch it here
                //     if (err) throw err;
                
                //     // success case, the file was saved
                //     console.log('Lyric saved!');
                // });

                var entry = parsedWebPage(htmlData);
                // the web page
                //res.send(htmlData);
                // the parsed 
                res.json(entry);
                //console.log(entry);
            });
        
        
    };    
}