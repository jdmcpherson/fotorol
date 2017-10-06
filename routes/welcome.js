const Express = require('express');
const multer = require('multer');
const path = require('path');
const kx = require('../db/connection')
const router = Express.Router();

const upload = multer({dest: path.join(__dirname, '..', 'public', 'uploads')})

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

// To upload files with a form, form you must give it the html attribite:
// enctype="multipart/form-data"

/* <input 
    class="form-control" 
    name="photo" <-- "photo" is the argument to upload.single("photo")
    type="file"
    > */

// When using multer with the '.single', only the one file is allowed to be 
// sent and it must share the same name as the argument

router.post('/', upload.single('photo'), (request, response) => {

    console.log(request.body);

    debugger;

    const { body } = request;
    // ^^ this syntax suger for:
    // const body = request.body

    // request.body's properties will be all the name attribiutes of the 
    // input fields in the submitted form. We have 'textarea' with the 'name'
    // 'content' which makes available on 'request.body'.
    const {content, username} = request.body;
    const {filename} = request.file;

    // We do not save files to our DB. We instead save the relative URL
    // to the file in the database.
    kx 
        .insert({content: content, username: username, photo_path: `/uploads/${filename}` })
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