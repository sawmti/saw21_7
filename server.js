const app = require('./api/app.js');
// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './config.env' });

// get MongoDB driver connection
const dbo = require('./api/database.js');

const port =  process.env.PORT || 4000;

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }
  });
app.listen(port, () => { 
    console.log(`Server has started on port ${port}`); 
}); 
