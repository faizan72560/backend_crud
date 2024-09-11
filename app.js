const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cloudinary = require("cloudinary")
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload")
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT


const cors = require('cors');
const corsOpts = {
    // origin: 'http://localhost:3000',
    origin: [process.env.LOCALPORT],
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))


const post = require('./routes/postRoutes')


app.use('/api/v1', post)



const DB = process.env.DATABASE
// console.log(DB)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("connected")

}).catch((err) => {
    console.log(err)

})


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})





app.listen(port, () => {
    console.log(`started on ${port}`)
})
