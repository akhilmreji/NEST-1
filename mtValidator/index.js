const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req,res,next) => {

    return res.status(200).json({"msg": "Hello from mtvalidation"})
})


app.listen(8002, () => {
    console.log('mtvalidation is Listening to Port 8002')
})