const express=require('express');
const { mailRouter } = require('./routes/mailRoute');
const port="3000";
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/mail',mailRouter)
app.listen(port,()=>{console.log(`app running on port ${port}`);})