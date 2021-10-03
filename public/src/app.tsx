
import { getPDFTEST } from "./utls/loader";
export declare const pdfjsLib: typeof import("pdfjs-dist")
declare const React: typeof import("react")
declare const ReactDOM: typeof import("react-dom")
var {useState, useCallback, useEffect} = React;
import { getThumbnails } from "./getThumbnails";
import { crearPDF } from "./crearPDF";

interface ImageItem {
    id: string;
    data?: string;
    page_number: number;
}
interface PDFDocuments {
    buffer: ArrayBuffer;
    imagenes: ImageItem[]
}


function MainApp({docs}: {docs: PDFDocuments[]}) {
    var [sideBarVisivility, setSideBarVisivility] = useState(true)
    useEffect(() => {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window["opera"]);
        if (check) setSideBarVisivility(false)

    }, [])
    return <div className="column main">
        <div onClick={e => setSideBarVisivility(!sideBarVisivility) } style={{height: 55}} >
            <img style={{width: 30, padding: 10}} src="imgs/outline_menu_black_24dp.png" />
        </div>
        <div className="row flex" style={{overflow: "hidden", flexWrap: "nowrap"}}>        
            <LeftPanel className={sideBarVisivility? "" : "sidebarhide"} />               
            <PageEditor docs={docs} />
        </div>
    </div>
}

function PageEditor({docs}: {docs: PDFDocuments[]}) {
    var [list, setList] = useState([])
    var [documents, setDocuments] = useState(docs)
    var [dropMode, setDropMode] = useState(false)
    useEffect(() => {
        var imagenes = []
        for (var d of documents) imagenes = imagenes.concat(d.imagenes)
        setList(imagenes)

    }, [])

    function swap(source_id, target) {
        var id = source_id.toLocaleLowerCase()

        if (id == target.toLowerCase()) return
        var item_index = list.findIndex(c => c.id.toLocaleLowerCase() == id)
        var target_index = list.findIndex(c => c.id == target)  
        var n_list = [];
        
        for (var i in list) {
            if ( n_list.length == target_index ) n_list.push(list[item_index])
            if (list[i].id.toLowerCase() != id) n_list.push(list[i])
        }

        if (n_list.findIndex(c => c.id == list[item_index].id) == -1) n_list.push(list[item_index])     

        if (n_list.map(c=>c.id).join("") != list.map(c=>c.id).join("") ) setList(n_list)  
    }

    function onDragOver(e, target) {   
        if (e.dataTransfer.types.includes("Files") ) {
            e.preventDefault();
            setDropMode(true)
            return
        }
        var text = e.dataTransfer.getData("text");
        if (text) {
            var data = JSON.parse(text) as {id: string};
        } else {
            var id = ((e.dataTransfer.types as string[]).map(c => c.split("/")).find(c => c[0] == "id") || [])[1]
            if (id) {
                swap(id, target)
                /*
                if (id == target.toLowerCase()) return
                var item_index = list.findIndex(c => c.id.toLocaleLowerCase() == id )
                var target_index = list.findIndex(c => c.id == target)  
                var n_list = [];
                
                for (var i in list) {
                    if ( n_list.length == target_index ) n_list.push(list[item_index])
                    if (list[i].id.toLowerCase() != id) n_list.push(list[i])
                }
                if (n_list.findIndex(c => c.id == list[item_index].id) == -1) n_list.push(list[item_index])     

                if (n_list.map(c=>c.id).join("") != list.map(c=>c.id).join("") ) setList(n_list)  
                */

            }
        }
    }
    function onDragEnd(e) { 
        setDropMode(false)
    }

    function generarDocumento() {        
        crearPDF(documents.map(c => c.buffer), list)
    }
    function dragoverfile(e) {
        if (e.dataTransfer.types.includes("Files") == false) return;
        e.preventDefault();
    }
    async function getThumbnailsFromFile(file): Promise<PDFDocuments> {
        var buffer = await file.arrayBuffer();
        var imagenes = await getThumbnails(buffer)
        return {buffer, imagenes}
    }
    async function procesarYMontarArchivos(files) {
        var docs = [];
        for (var f of files) {
            var res = await getThumbnailsFromFile(f)        
            list = list.concat(res.imagenes)
            docs.push(res)
        }

      
        setList(list)
        setDocuments(documents.concat(docs))
    }
    async function dropfile(e) {  
        if (e.dataTransfer.types.includes("Files") == false) return;
        e.preventDefault();

        var files = []
        if (e.dataTransfer.items) {
            for (var i = 0; i < e.dataTransfer.items.length; i++) {
              if (e.dataTransfer.items[i].kind === 'file') {
                var file = e.dataTransfer.items[i].getAsFile();
                files.push(file)
              }
            }
          } else {
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                files.push(e.dataTransfer.files[i])
            }
          }

        await procesarYMontarArchivos(files)

        setDropMode(false)
    }
    function selectFiles(e) {
        var input = document.createElement("input")
        input.type = "file"
        input.multiple = true;
        input.accept = "application/pdf";
   
        input.style.display = "none"
        document.body.append(input)
        input.onchange = async (e) => {
            e.preventDefault();
           var files = input.files;     
   
           await procesarYMontarArchivos(files)
           document.body.removeChild(input)

        }
        input.click()
    }

    function onRemove(img) {
        var index = list.findIndex(f => f.id == img.id)
        if (index>=0){
            list.splice(index, 1)
            setList([...list])
        } 
    }

    function move(id, direction) {
        var item_index = list.findIndex(c => c.id == id)
        if (direction < 0 && item_index > 0) {       
            var target_index = item_index - 1
            swap(id, list[target_index].id)
        } else if (direction> 0 && item_index < list.length -1 ) {
            var target_index = item_index + 1
            swap(id, list[target_index].id)
        }
    }

    return (<div className="column editor flex" 
    onDragLeave={e => setDropMode(false)} 
    onDragOver={dragoverfile} 
    onDrop={dropfile} >

        <div className="flex" style={{overflow: "auto", maxHeight: "100vh"}} onClick={selectFiles}>
            <div className="page_list row flex" style={{overflow: "auto"}} >
                {dropMode == false && list.length ? list.map( (img)=> {
                    return <PageItemView 
                    onRemove={onRemove}
                    onDragEnd={onDragEnd}
                    onDrop={onDragOver} 
                    onMove={move}
                    onDragOver={onDragOver} imagen={img} key={img.id}/>
                }): 
                    <div className="center" style={{ padding: 50, width: "100%", height: "100%", background: "#efefef"}}>
                        
                        <h3>
                            Ordena, agrega y elimina paginas de tus pdf
                        </h3>
                           <div className="center">
                           Haz click para seleccionar tus archivos o arrastralos hasta aqui y sueltalos aqui
                           </div>
                            <div style={{margin: 30}}>
                                <img src="imgs/outline_picture_as_pdf_black_24dp.png" />
                            </div>
                        </div>
                }
            </div>
        </div>
        <div style={{background: "#313a46", padding: 10}} className="row footer">
            <div className="flex"></div>
            <button onClick={generarDocumento}>Generar documento PDF</button>
        </div>
  
  
    </div>)
}

function PageItemView({imagen, onDragOver, onDrop, onDragEnd, onRemove, onMove}: 
    {imagen: {data: string, id: string}, onDragOver, onDrop, onDragEnd, onRemove, onMove}) {


    var [mark, setMark] = useState(false);
    var [gray, setGray] = useState(false);
    function ondragstart(e) {
        e.dataTransfer.setData("text", JSON.stringify({id: imagen.id}));
        e.dataTransfer.setData("id/"+ imagen.id,  imagen.id)
    }
  
    function ondragover(e) {   
        setMark(true)   
        var dataTransfer = e.dataTransfer;

        var id = ((dataTransfer.types as string[]).map(c => c.split("/")).find(c => c[0] == "id") || [])[1]

        if (imagen.id.toLowerCase() == id) setGray(true) 
        onDragOver(e, imagen.id);        
    }
    function ondragleave(e) {
        setMark(false)
        setGray(false) 
    }

    function remove(e) {
        e.preventDefault()
        e.stopPropagation()
        onRemove(imagen)
    }
    function move(e, direction) {
        e.preventDefault()
        e.stopPropagation()
        onMove(imagen.id, direction)
    }


    var style: any = {paddingBottom: 15};
    if (mark) {
        style.borderWidth = 2;
        style.borderColor = "#555";
        style.padding = 9;
    }
    if (gray) {
        style.backgroundColor = "#bbb";
    }
    return (
        <div onDrop={onDrop} onDragOver={ondragover} 
        onDragLeave={ondragleave} draggable 
        onDragStart={ondragstart}
        onDragEnd={onDragEnd} 
        onClick={e => {
            e.preventDefault()
            e.stopPropagation()
        }}
        className="page row item" style={style}>
            <div className="flex column">                    
                <div>              
                    <img draggable={false} src={imagen.data} />     
                </div>            
            
            <div className="row">
                <button onClick={remove} className="deletebutton" style={{ float: "right"}}>
                    X
                </button>
                <div className="center bold" style={{paddingTop: 8}}> 
                    {imagen.id} 
                </div>        
            </div>
           </div>  
           <div className="column sideControls">
                <button onClick={e => move(e, -1)} className="movebutton flex">
                    <img src="imgs/outline_arrow_back_ios_white_24dp.png" className="icon" />
                </button>
                <button onClick={e => move(e, 1)} className="movebutton flex">
                    <img src="imgs/outline_arrow_forward_ios_white_24dp.png" className="icon" />
                </button>
            </div> 
     
        </div>
    )
}


function LeftPanel({className}) {
    return <div className={"sidebar "+className}>
        <div style={{width: 200}}>
            
        <div className="center" style={{marginTop: 20}}>
             PDF Sort
        </div>
        <div className="center" style={{ borderTop: "solid 1px #cccccc", marginTop: 30}} />

        <div className="center instrucciones" style={{ fontSize: 13, fontWeight: 400, paddingTop: 10}}>
            <ol>
                <li>
                Arrastra uno o varios documentos pdf desde tu ordenador, hasta el centro de la pagina.
                </li>
                <li>
                Una vez se generen las imagenes de vista previa, ordena las hojas segun decees, o elimina las que no necesitas.
                </li>
                <li>
                Finalmente haz click en generar documento, y descargalo. 
                </li>
            </ol>
          
        </div>

        <div className="center" style={{ borderTop: "solid 1px #cccccc", marginTop: 30}} />

        <div className="center" style={{ fontSize: 13, fontWeight: 400, paddingTop: 10}}>
             por Jesus L Zorrilla
        </div>
        <div className="center button" style={{marginTop: 10, padding: 10, fontSize: 13, fontWeight: 400}}>
             <a href="mailto:preefiapp@gmail.com">
             preefiapp@gmail.com
             </a>
        </div>

        <div className="center" style={{ borderTop: "solid 1px #cccccc", marginTop: 10}} />
     
       
        <div className="center button" style={{marginTop: 10, padding: 10, fontSize: 13, fontWeight: 400}}>
             <a href="https://www.preefi.com">
                <div>
                    www.preefi.com
                </div>            
             </a>
        </div>
        <div className="center">
             <a href="https://www.preefi.com">
                <img className="center" src="https://www.preefi.com/icons/logos/logo_preefi_white.png" />
             </a>
        </div>
        </div>

    </div>
}




async function startApp() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `dist/pdf.worker.js`
    var docs: PDFDocuments[]  = [];
    if (false) {
        var buffer = await getPDFTEST("pdf/A1.pdf")
        var imagenes = await getThumbnails(buffer);
        docs.push({buffer, imagenes})
    }
    
    ReactDOM.render(<MainApp docs={docs} />, document.getElementById("core") )

}

startApp()

