const express = require('express');
const app = express();
const router = require("./Routes/index");
const port =process.env.PORT|| 8000;
const cors = require("cors");
const mongoose = require('mongoose');
const DB = 'mongodb+srv://adesh9066:tvfY0bvpotQape2v@cluster0.3jskcba.mongodb.net/oggy';

// const DB = 'mongodb://localhost:27017/Chandrayan3';

mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{console.log('Connect to MongoDB')}).catch((err)=> console.log(err));
app.use(express.json());
app.use(cors());
app.use('/',router);

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server running on port ${port}!`)
})
