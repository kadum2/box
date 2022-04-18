

//express tools and configuring
let express = require("express")
let app = express()
let cors = require("cors")
const path = require("path")
const fs = require("fs")
const multer  = require("multer") 

///body parser 
let bodyParser = require('body-parser')


// app.post("/upl2", (req, res)=>{
//     console.log("to upl2")
//     console.log(req.body)
// })


// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//express configuration 
// app.use(express.json())


app.use(cors())

////////mongodb 
//// mongo atlas

let mongodb = require("mongodb").MongoClient
const { ObjectID } = require("bson")
// const { markAsUntransferable } = require("worker_threads")
// let ObjectId = require('mongodb').ObjectID;
require("dotenv").config()
// let mongokey = "mongodb+srv://firstUser:LdUpMsCeuguJLKAe@cluster0.mf8v4.mongodb.net/db2?retryWrites=true&w=majority"




////////// pages to send
app.use(express.static("./public"))
// app.get("/", (req, res)=>{
//     res.sendFile(__dirname +"/public/index.html")
//     // res.sendFile(__dirname + "/public/map.js")
// })

app.get("/mode", (req, res)=>{
    res.sendFile(__dirname+"/mode/moderator.html")
})

app.get("/img", (req, res)=>{
    res.sendFile((__dirname+"/img.html"))
    // res.sendFile("/projects/anybox/img.html")

})

////// trying to send a whole folder (directory); 
// app.use('/mode', express.static('/mode'))
// app.use('/mode', express.static(path.join(__dirname, 'mode')))


// app.use(express.static('public'))





////////////////////////////////routes 


/////?? inserting 

// app.post("/loc", (req, res)=>{
    
//     console.log("post loc; "+req.body)

//     mongodb.connect(process.env.MONGOKEY, async (err, client)=>{
//     let dbb = client.db()

//     ////doc structure 
//     // Object.values(req.body).forEach(e=>dbb.collection("deleted").insertOne({path: e}))
//     dbb.collection("locs").insertOne({location: req.body.loc, title: req.body.title, mainImg: req.body.mainImg, log: []})
//     let results = await dbb.collection("locs").find().toArray()

//     res.send(results)
//     console.log(results)
//     })
// })

/////////////multer configuring

///////making storage plan
// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         // cb(null, "./locs; imgs")
//         cb(null, `./locs; imgs/${req.body.title}`)

//     },
//     filename: (req, file, cb)=>{
//         // console.log(file)
//         cb(null, Date.now() + path.extname(file.originalname))
//         // cb(null, "mainImg")

//     }
// })


let dir 
let dirna 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    //   let userId  = req.body.title
    // console.log(JSON.parse(JSON.stringify(req.body)))
    // let dir = `./locs; imgs/${req.body.title}`
    dir = `./public/locs;imgs/${req.body.title}`
    dirna = req.body.title

    fs.exists(dir, exist => {
    if (!exist) {
        return fs.mkdir(dir, error => cb(error, dir))
    }
    return cb(null, dir)
    })


    console.log(dir)
    },
    filename: (req, file, cb) => {
    //   const { userId } = req.body.title
    // cb(null, `UserId-${userId}-Image-${Date.now()}.png`)
    cb(null, `mainImg.png`)
    console.log(file)
    }
    })



//////making basic plan
const upload = multer({storage: storage})


//image handling
app.post("/upl", upload.any(),(req, res)=>{
    // res.json("image uploaded")
    console.log("get image")
    console.log(req.file)
    console.log(req.body)
    
    console.log(JSON.parse(JSON.stringify(req.body)))



    // console.log(req.body.img)
    // console.log(req.body.name)
    res.json("good")
})

app.get("/upl", (req, res)=>{
    // res.json(dir+"/mainImg.png")
    res.json(`/locs;imgs/${dirna}/mainImg.png`)
    // res.send(dir+"/mainImg.png")
    console.log(dir+"/mainImg.png")
})


/////making the main object to send for; locs



///////establishing
app.listen(process.env.PORT || 3442, ()=>console.log("listennig ..."))



