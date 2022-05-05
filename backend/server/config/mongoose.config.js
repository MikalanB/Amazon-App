const mongoose = require('mongoose');
// mongodb+srv://mikalanb:root@cluster0.6sucj.mongodb.net/amazon?retryWrites=true&w=majority"

mongoose.connect("mongodb://localhost/products", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
.then(() => console.log("Successfully established a connection"))
.catch(err => console.log("Unable to establish a connection"));
