import * as express from "express"
import * as  multer  from "multer";
import * as cors from "cors";
var bodyParser = require('body-parser')
var storage = multer.memoryStorage()
const upload = multer({ storage });
import * as PDFMerger from 'pdf-merger-js';

var app = express.Router()
app.use(cors())
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use("/dist", express.static(__dirname+"/public/dist"))
app.use("/js", express.static(__dirname+"/public/dist"))
app.use("/pdf", express.static(__dirname+"/public/pdf"))
app.use("/imgs", express.static(__dirname+"/public/imgs"))


app.post('/api/pdf/upload', upload.array("files", 10), async function (req, res, next) {
    var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var files = {};

    for (var i in (req.files as any) ) {
        files[abc[i]] = {
            file: req.files[i]
        }
    }
    var imagenes = JSON.parse( req.body["orden"] ) as {id: string, page_number: number, file_id: string}[]
    console.log("files", Object.keys(files).length)
    var merger: any = new PDFMerger();
    for (var img of imagenes) {
        merger.add(files[img.file_id].file.buffer, [img.page_number] as any)
    }

    merger.doc.pipe(res)
    await merger.doc.end().catch(err => {
        console.log(err)
    })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/views/index.html")
})

export const router = app;