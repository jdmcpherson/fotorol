const Express = require('express');
const kx = require('../db/connection')
const router = Express.Router();


router.get('/', (request, response) => {

    // Form data is available as an object on the property request.body
    // if you've setup 'body-parser' middleware.
    console.log(request.body);

    // doing database query with knex is asynchronous operation. knew 
    // will return the results. We will receive the reuslts of query as
    // argument to the callback given to '.then'.
    // This means that any code must be run after query or that needs
    // the results must written inside of the body the callback passed to '.then'
    kx
        .select()
        .from('posts')
        .then(posts => {
            response.render('index', {content: null, posts})
        })

    // response.render will render a template from the '/views'
    // directory as the content the response to the client.
    // Specify file by it path skipping '/views' and disregarding
    // its extention.
    // response.render('index', { content: null });
});

router.post('/', (request, response) => {

    console.log(request.body);

    const { body } = request;
    // ^^ this syntax suger for:
    // const body = request.body

    // request.body's properties will be all the name attribiutes of the 
    // input fields in the submitted form. We have 'textarea' with the 'name'
    // 'content' which makes available on 'request.body'.
    const {content} = request.body;

    kx 
        .insert({content: `Look at my ballin' post`, username: `baller_roller`})
        .into('posts')
        .then(console.log)

    // response.render can take a second argument. It's an object where
    // all of its properties will be available as local variables inside of the rendered template
    // response.render('index', body);

    // response.redirect will respond to the client with status code 302.
    // Indicating that it should make a GET request the givent URL as argument.
    // '/' in this case
    response.redirect('/')
});

router.get('/about', (request, response) => {
    response.render('about')
})

router.get('/hello-world', (request, response) => {
    // The 'request' object represents what the client is
    // asking of the server.
    // The 'response' object represets the reply that our
    // server is going to send to the client


    // When running node with the '--inspect' command,
    // you open a Chrome console and click on the Node logo in the
    // upper-left corner of the console to opwn a dedicated
    // debugger for Node. Anywhere you wriet the keyword, 'debugger'
    // in your code, the debugger will pause program and you'll
    // be able to inspect the state of your program.
    // debugger
    response.send('Hello, World!')
});

// Assign to module.exports the object that you want the file to export when it
// is required with the 'require' function.
module.exports = router;