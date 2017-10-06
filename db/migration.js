const kx = require('./connection')

// createTable will generate a sql query to create a table 
// in out database
kx.schema.createTable('posts', table => {
    // .increments creates a column that auto increments. It's argument is
    // a string that represents the name of the column.
    table.increments('id')
    table.string('username')
    table.text('content')
    table.string('photo_path')
    // .timestamps creates two timestamp columns names 'created_at' and 
    // 'updated_at' using the type 'timestamptz' (inlcuding time zone).
    table.timestamps(false, true)
}).then(() => process.exit())
    .catch(() => process.exit()) // The callback passes to .catch will run only if the query fails with an error message

// Terminate the query tith '.toString()' to the exact SQL code
// for the knex query.

// To execute it, instead terminate with '.then()'. Then can also take callback
// that will run once the query is complete. This necessary, because doing
// a database is an asynchronous operation.