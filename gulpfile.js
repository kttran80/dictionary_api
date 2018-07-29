var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function() {
    nodemon({
        exec:'ts-node ./src/server.ts',
        watch:['src'],
        ext: 'ts',
        env: {
            PORT: 8000
         },       
       ignore: ['./node_modules/**'] 
    })
    .on('restart', function(){
          console.log('------------------------');
          console.log('|  Restarting server    |');
          console.log('------------------------');
     });
});