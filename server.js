import { app } from './api/app.js';
import { createConnection } from './api/database.js';

const port =  process.env.PORT || 3000;

createConnection();
app.listen(port, () => { 
    console.log(`Server has started on port ${port}`); 
}); 
