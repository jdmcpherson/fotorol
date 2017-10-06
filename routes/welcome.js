const Express = require('express');
const router = Express.Router();

router.get('/', (request, response) => {
    response.render('home')
})

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

// Assign to `module.exports` the object that you want the file export when it
// is required with the `require` function.
module.exports = router