const Express = require('express');
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// ROUTES
const welcome = require('./routes/welcome')

// The Express is returned as function and we can use
// to create a web application by called it.
// This creates an instance of a Express web app server:
const app = Express();
// The following configures out Express application to use the 'ejs' templating
// language to render out views. For this to work, you must have the 'ejs'
// package insatlled.
app.set('view engine', 'ejs')

// To serve images, css, javascript, sounds & videos to a client of your
// serve you must make them available with the Express.static middleware.
// This will URLs for all file inside a given directory
// (eg.
// For a file public/css/index.css, the url would be http://localhost:4545/css/index.css
// For a file public/index.js, the url would be http://localhost:4545/index.js
// )

// _dirname is a globl variable in node that returns the full path
// to the file where it is written.

// 'path.join' is a method that joins a bunch of strings together  into
// a path (eg. path.join('project', 'fotorol', 'public') // project/public )
app.use(Express.static(path.join(__dirname, 'public')))
// morgan is a package for creating middleware functions that lof
// information about yout app's requests and responses
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'));
// Middleware functions are called in order of appearance in the
// code. This one happens before our hello world below.

// app.use((request, response, next) => {
//     const {method, path} = request;
//     // ^^^ This assigns the property `method` from `request` to the variable `method`.
//     // const method = request.method;
//     // const path = request.path;
//     // This is called destructuring

//     const message = `${method} ${path} at ${new Date()}`;
//     console.log(message);

//     // next is function given to middleware callbacks as an arguement.
//     // It is always the third argument. When called, Express will move
//     // on the next middleware line
//     next();
// });

app.use('/', welcome)

const PORT = 4545;
app.listen(
    PORT,
    () => console.log(`Server listening on http://localhost:${PORT}`)
)