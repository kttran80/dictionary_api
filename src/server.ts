import app from './app';

let port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log('Express server starts on port: ' + port);
});