const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

// accept post resquests
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

require('./server/config/mongoose.config');
// require('./server/models/user.model');
// require('./server/models/order.model');
// require('./server/models/product.model');



require("./server/routes/product.routes")(app);
require("./server/routes/user.routes")(app);
require("./server/routes/order.routes")(app);




app.listen(port, () => console.log(`Listening on port ${port}`));