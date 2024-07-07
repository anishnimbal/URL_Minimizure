const express = require('express')
const {connectToMongoDB}=require("./connect");
const urlRoute = require("./routes/url"); 

const URL = require('./models/url')
const app = express();
const PORT = 8001;
 
app.use(express.json());
connectToMongoDB('mongodb://localhost:27017/short-url').then(
    console.log("MongoDB connected")
);

app.use("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.json())

app.use("/url",urlRoute);
app.get("/test",async(req,res) =>{
const allUrls = await URL.find({});
    return res.end(`
        <html>
        <head></head>
        <body>
            <ol>
                ${allUrls
                    .map(
                        (url) =>
                                `<li>${url.shortId} - ${utl.redirectURL} - ${url.visitHistory}</li>`
                    )
                   .join("") 
                }
            </ol>
        </body>
        </html>
    `);
});
app.get('/:shortID', async(req,res) =>{
    const shortID = req.params.shortID;
    const emtry = await URL.findOneAndUpdate({
        shortID,
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        },
        },
    }
    );
    res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server started at ${PORT}`))