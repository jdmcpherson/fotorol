const Express = require('express');
// The Express is returned as function and we can use
// to create a web application by called it.
// This creates an instance of a Express web app server:
const app = Express();

app.use((request, response, next) => {
    const {method, path} = request;
    // ^^^ This assigns the property `method` from `request` to the variable `method`.
    // const method = request.method;
    // const path = request.path;
    // This is called destructuring

    const message = `${method} ${path} at ${new Date()}`;
    console.log(message);

    // next is function given to middleware callbacks as an arguement.
    // It is always the third argument. When called, Express will move
    // on the next middleware line
    next();
});

app.get('/', (request, response) => {
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

const PORT = 4545;
app.listen(
    PORT,
    () => console.log(`Server listening on http://localhost:${PORT}`)
)