(function() {
  var f = window.__fuse = window.__fuse || {};
  var modules = f.modules = f.modules || {}; f.dt = function (x) { return x && x.__esModule ? x : { "default": x }; };

  f.bundle = function(collection, fn) {
    for (var num in collection) {
      modules[num] = collection[num];
    }
    fn ? fn() : void 0;
  };
  f.c = {};
  f.r = function(id) {
    var cached = f.c[id];
    if (cached) return cached.m.exports;
    var module = modules[id];
    if (!module) {
      
      throw new Error('Module ' + id + ' was not found');
    }
    cached = f.c[id] = {};
    cached.exports = {};
    cached.m = { exports: cached.exports };
    module(f.r, cached.exports, cached.m);
    return cached.m.exports;
  }; 
})();
__fuse.bundle({

// public/src/app.tsx @1
1: function(__fusereq, exports, module){
exports.__esModule = true;
var loader_1 = __fusereq(2);
var {useState, useCallback, useEffect} = React;
var getThumbnails_1 = __fusereq(3);
var crearPDF_1 = __fusereq(4);
function MainApp({docs}) {
  var [sideBarVisivility, setSideBarVisivility] = useState(true);
  useEffect(() => {
    let check = false;
    (function (a) {
      if ((/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i).test(a) || (/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i).test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    if (check) setSideBarVisivility(false);
  }, []);
  return React.createElement("div", {
    className: "column main"
  }, React.createElement("div", {
    onClick: e => setSideBarVisivility(!sideBarVisivility),
    style: {
      height: 55
    }
  }, React.createElement("img", {
    style: {
      width: 30,
      padding: 10
    },
    src: "imgs/outline_menu_black_24dp.png"
  })), React.createElement("div", {
    className: "row flex",
    style: {
      overflow: "hidden",
      "flex-wrap": "nowrap"
    }
  }, React.createElement(LeftPanel, {
    className: sideBarVisivility ? "" : "sidebarhide"
  }), React.createElement(PageEditor, {
    docs: docs
  })));
}
function PageEditor({docs}) {
  var [list, setList] = useState([]);
  var [documents, setDocuments] = useState(docs);
  var [dropMode, setDropMode] = useState(false);
  useEffect(() => {
    var imagenes = [];
    for (var d of documents) imagenes = imagenes.concat(d.imagenes);
    setList(imagenes);
  }, []);
  function onDragOver(e, target) {
    console.log("DRAG OVER");
    if (e.dataTransfer.types.includes("Files")) {
      e.preventDefault();
      setDropMode(true);
      return;
    }
    var text = e.dataTransfer.getData("text");
    if (text) {
      var data = JSON.parse(text);
    } else {
      var id = (e.dataTransfer.types.map(c => c.split("/")).find(c => c[0] == "id") || [])[1];
      if (id) {
        if (id == target.toLowerCase()) return;
        var item_index = list.findIndex(c => c.id.toLocaleLowerCase() == id);
        var target_index = list.findIndex(c => c.id == target);
        var n_list = [];
        for (var i in list) {
          if (n_list.length == target_index) n_list.push(list[item_index]);
          if (list[i].id.toLowerCase() != id) n_list.push(list[i]);
        }
        if (n_list.findIndex(c => c.id == list[item_index].id) == -1) n_list.push(list[item_index]);
        if (n_list.map(c => c.id).join("") != list.map(c => c.id).join("")) setList(n_list);
      }
    }
  }
  function onDragEnd(e) {
    setDropMode(false);
  }
  function generarDocumento() {
    crearPDF_1.crearPDF(documents.map(c => c.buffer), list);
  }
  function dragoverfile(e) {
    if (e.dataTransfer.types.includes("Files") == false) return;
    e.preventDefault();
  }
  async function getThumbnailsFromFile(file) {
    var buffer = await file.arrayBuffer();
    var imagenes = await getThumbnails_1.getThumbnails(buffer);
    return {
      buffer,
      imagenes
    };
  }
  async function dropfile(e) {
    if (e.dataTransfer.types.includes("Files") == false) return;
    e.preventDefault();
    var files = [];
    if (e.dataTransfer.items) {
      for (var i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          var file = e.dataTransfer.items[i].getAsFile();
          files.push(file);
        }
      }
    } else {
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        files.push(e.dataTransfer.files[i]);
      }
    }
    var docs = [];
    for (var f of files) {
      var res = await getThumbnailsFromFile(f);
      list = list.concat(res.imagenes);
      docs.push(res);
    }
    console.log(docs);
    setList(list);
    setDocuments(documents.concat(docs));
    setDropMode(false);
  }
  function onRemove(img) {
    var index = list.findIndex(f => f.id == img.id);
    if (index >= 0) {
      list.splice(index, 1);
      setList([...list]);
    }
  }
  return React.createElement("div", {
    className: "column editor flex",
    onDragLeave: e => setDropMode(false),
    onDragOver: dragoverfile,
    onDrop: dropfile
  }, React.createElement("div", {
    className: "flex",
    style: {
      overflow: "auto",
      maxHeight: "100vh"
    }
  }, React.createElement("div", {
    className: "page_list row flex",
    style: {
      overflow: "auto"
    }
  }, dropMode == false && list.length ? list.map(img => {
    return React.createElement(PageItemView, {
      onRemove: onRemove,
      onDragEnd: onDragEnd,
      onDrop: onDragOver,
      onDragOver: onDragOver,
      imagen: img,
      key: img.id
    });
  }) : React.createElement("div", {
    className: "center",
    style: {
      padding: 50,
      width: "100%",
      background: "#efefef"
    }
  }, "Arroja un archivo"))), React.createElement("div", {
    style: {
      background: "#313a46",
      padding: 10
    },
    className: "row"
  }, React.createElement("div", {
    className: "flex"
  }), React.createElement("button", {
    onClick: generarDocumento
  }, "Generar documento PDF")));
}
function PageItemView({imagen, onDragOver, onDrop, onDragEnd, onRemove}) {
  var [mark, setMark] = useState(false);
  var [gray, setGray] = useState(false);
  function ondragstart(e) {
    e.dataTransfer.setData("text", JSON.stringify({
      id: imagen.id
    }));
    e.dataTransfer.setData("id/" + imagen.id, imagen.id);
  }
  function ondragover(e) {
    setMark(true);
    var id = (e.dataTransfer.types.map(c => c.split("/")).find(c => c[0] == "id") || [])[1];
    if (imagen.id.toLowerCase() == id) setGray(true);
    onDragOver(e, imagen.id);
  }
  function ondragleave(e) {
    setMark(false);
    setGray(false);
  }
  function remove(e) {
    onRemove(imagen);
  }
  var style = {
    paddingBottom: 15
  };
  if (mark) {
    style.borderWidth = 2;
    style.borderColor = "#555";
    style.padding = 9;
  }
  if (gray) {
    style.backgroundColor = "#bbb";
  }
  return React.createElement("div", {
    onDrop: onDrop,
    onDragOver: ondragover,
    onDragLeave: ondragleave,
    draggable: true,
    onDragStart: ondragstart,
    onDragEnd: onDragEnd,
    className: "page column item",
    style: style
  }, React.createElement("img", {
    draggable: false,
    src: imagen.data
  }), React.createElement("div", {
    className: "row"
  }, React.createElement("button", {
    onClick: remove,
    className: "deletebutton"
  }, "X"), React.createElement("div", {
    className: "center bold",
    style: {
      paddingTop: 8
    }
  }, " ", imagen.id, " ")));
}
function LeftPanel({className}) {
  return React.createElement("div", {
    className: "sidebar " + className
  }, React.createElement("div", {
    style: {
      width: 200
    }
  }, React.createElement("div", {
    className: "center",
    style: {
      marginTop: 20
    }
  }, "\r\n             PDF Sort\r\n        "), React.createElement("div", {
    className: "center",
    style: {
      borderTop: "solid 1px #cccccc",
      marginTop: 30
    }
  }), React.createElement("div", {
    className: "center instrucciones",
    style: {
      fontSize: 13,
      fontWeight: 400,
      paddingTop: 10
    }
  }, React.createElement("ol", null, React.createElement("li", null, "\r\n                Arrastra uno o varios documentos pdf desde tu ordenador, hasta el centro de la pagina.\r\n                "), React.createElement("li", null, "\r\n                Una vez se generen las imagenes de vista previa, ordena las hojas segun decees, o elimina las que no necesitas.\r\n                "), React.createElement("li", null, "\r\n                Finalmente haz click en generar documento, y descargalo. \r\n                "))), React.createElement("div", {
    className: "center",
    style: {
      borderTop: "solid 1px #cccccc",
      marginTop: 30
    }
  }), React.createElement("div", {
    className: "center",
    style: {
      fontSize: 13,
      fontWeight: 400,
      paddingTop: 10
    }
  }, "\r\n             por Jesus L Zorrilla\r\n        "), React.createElement("div", {
    className: "center button",
    style: {
      marginTop: 10,
      padding: 10,
      fontSize: 13,
      fontWeight: 400
    }
  }, React.createElement("a", {
    href: "mailto:preefiapp@gmail.com"
  }, "\r\n             preefiapp@gmail.com\r\n             ")), React.createElement("div", {
    className: "center",
    style: {
      borderTop: "solid 1px #cccccc",
      marginTop: 10
    }
  }), React.createElement("div", {
    className: "center button",
    style: {
      marginTop: 10,
      padding: 10,
      fontSize: 13,
      fontWeight: 400
    }
  }, React.createElement("a", {
    href: "https://www.preefi.com"
  }, React.createElement("div", null, "\r\n                    www.preefi.com\r\n                "))), React.createElement("div", {
    className: "center"
  }, React.createElement("a", {
    href: "https://www.preefi.com"
  }, React.createElement("img", {
    className: "center",
    src: "https://www.preefi.com/icons/logos/logo_preefi_white.png"
  })))));
}
async function startApp() {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `dist/pdf.worker.js`;
  var docs = [];
  if (false) {
    var buffer = await loader_1.getPDFTEST("pdf/A1.pdf");
    var imagenes = await getThumbnails_1.getThumbnails(buffer);
    docs.push({
      buffer,
      imagenes
    });
    buffer = await loader_1.getPDFTEST("pdf/D1.pdf");
    imagenes = await getThumbnails_1.getThumbnails(buffer);
    docs.push({
      buffer,
      imagenes
    });
    docs.push({
      buffer,
      imagenes
    });
  }
  ReactDOM.render(React.createElement(MainApp, {
    docs: docs
  }), document.getElementById("core"));
}
startApp();

},

// public/src/utls/loader.ts @2
2: function(__fusereq, exports, module){
async function getPDFTEST(url) {
  return fetch(url).then(res => {
    return res.arrayBuffer();
  });
}
exports.getPDFTEST = getPDFTEST;

},

// public/src/getThumbnails.tsx @3
3: function(__fusereq, exports, module){
exports.__esModule = true;
exports.current_code = 0;
exports.abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
async function getThumbnails(path = "../pdf/test.pdf") {
  return new Promise((resolve, reject) => {
    exports.current_code++;
    var imagenes = [];
    pdfjsLib.getDocument(path).promise.then(async doc => {
      var paginas = doc.numPages;
      for (var page_index = 1; page_index <= paginas; page_index++) {
        var canvas = document.createElement("canvas");
        var canvasContext = canvas.getContext("2d");
        var page = await doc.getPage(page_index);
        var viewport = page.getViewport({
          scale: 0.2
        });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({
          canvasContext,
          viewport
        }).promise;
        var img = canvas.toDataURL("image/png");
        imagenes.push({
          data: img,
          page_number: page_index,
          id: exports.abc[(exports.current_code - 1) % exports.abc.length] + page_index
        });
      }
      resolve(imagenes);
    }).catch(err => {
      console.error(err);
      alert(`Error, uno de los archivos no es un documento PDF valido`);
      resolve([]);
    });
  });
}
exports.getThumbnails = getThumbnails;

},

// public/src/crearPDF.tsx @4
4: function(__fusereq, exports, module){
exports.__esModule = true;
var downloadjs_1 = __fusereq(5);
function crearPDF(files, order) {
  var form = new FormData();
  for (var f of files) form.append("files", new Blob([f], {
    type: "application/pdf"
  }));
  form.append("orden", JSON.stringify(order.map(c => {
    return {
      id: c.id,
      page_number: c.page_number,
      file_id: c.id[0]
    };
  })));
  return fetch("/api/pdf/upload", {
    body: form,
    method: "POST"
  }).then(response => {
    console.log(response);
    return response.arrayBuffer();
  }).then(blob => {
    console.log("descargar a la pc", blob);
    downloadjs_1(blob, "concat.pdf", "application/pdf");
    return;
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = "concat.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }).catch(err => {
    console.error(err);
  });
}
exports.crearPDF = crearPDF;

},

// node_modules/downloadjs/download.js @5
5: function(__fusereq, exports, module){
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.download = factory();
  }
})(this, function () {
  return function download(data, strFileName, strMimeType) {
    var self = window, defaultMime = "application/octet-stream", mimeType = strMimeType || defaultMime, payload = data, url = !strFileName && !strMimeType && payload, anchor = document.createElement("a"), toString = function (a) {
      return String(a);
    }, myBlob = self.Blob || self.MozBlob || self.WebKitBlob || toString, fileName = strFileName || "download", blob, reader;
    myBlob = myBlob.call ? myBlob.bind(self) : Blob;
    if (String(this) === "true") {
      payload = [payload, mimeType];
      mimeType = payload[0];
      payload = payload[1];
    }
    if (url && url.length < 2048) {
      fileName = url.split("/").pop().split("?")[0];
      anchor.href = url;
      if (anchor.href.indexOf(url) !== -1) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", url, true);
        ajax.responseType = 'blob';
        ajax.onload = function (e) {
          download(e.target.response, fileName, defaultMime);
        };
        setTimeout(function () {
          ajax.send();
        }, 0);
        return ajax;
      }
    }
    if ((/^data:([\w+-]+\/[\w+.-]+)?[,;]/).test(payload)) {
      if (payload.length > 1024 * 1024 * 1.999 && myBlob !== toString) {
        payload = dataUrlToBlob(payload);
        mimeType = payload.type || defaultMime;
      } else {
        return navigator.msSaveBlob ? navigator.msSaveBlob(dataUrlToBlob(payload), fileName) : saver(payload);
      }
    } else {
      if ((/([\x80-\xff])/).test(payload)) {
        var i = 0, tempUiArr = new Uint8Array(payload.length), mx = tempUiArr.length;
        for (i; i < mx; ++i) tempUiArr[i] = payload.charCodeAt(i);
        payload = new myBlob([tempUiArr], {
          type: mimeType
        });
      }
    }
    blob = payload instanceof myBlob ? payload : new myBlob([payload], {
      type: mimeType
    });
    function dataUrlToBlob(strUrl) {
      var parts = strUrl.split(/[:;,]/), type = parts[1], decoder = parts[2] == "base64" ? atob : decodeURIComponent, binData = decoder(parts.pop()), mx = binData.length, i = 0, uiArr = new Uint8Array(mx);
      for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);
      return new myBlob([uiArr], {
        type: type
      });
    }
    function saver(url, winMode) {
      if (('download' in anchor)) {
        anchor.href = url;
        anchor.setAttribute("download", fileName);
        anchor.className = "download-js-link";
        anchor.innerHTML = "downloading...";
        anchor.style.display = "none";
        document.body.appendChild(anchor);
        setTimeout(function () {
          anchor.click();
          document.body.removeChild(anchor);
          if (winMode === true) {
            setTimeout(function () {
              self.URL.revokeObjectURL(anchor.href);
            }, 250);
          }
        }, 66);
        return true;
      }
      if ((/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//).test(navigator.userAgent)) {
        if ((/^data:/).test(url)) url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
        if (!window.open(url)) {
          if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) {
            location.href = url;
          }
        }
        return true;
      }
      var f = document.createElement("iframe");
      document.body.appendChild(f);
      if (!winMode && (/^data:/).test(url)) {
        url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
      }
      f.src = url;
      setTimeout(function () {
        document.body.removeChild(f);
      }, 333);
    }
    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(blob, fileName);
    }
    if (self.URL) {
      saver(self.URL.createObjectURL(blob), true);
    } else {
      if (typeof blob === "string" || blob.constructor === toString) {
        try {
          return saver("data:" + mimeType + ";base64," + self.btoa(blob));
        } catch (y) {
          return saver("data:" + mimeType + "," + encodeURIComponent(blob));
        }
      }
      reader = new FileReader();
      reader.onload = function (e) {
        saver(this.result);
      };
      reader.readAsDataURL(blob);
    }
    return true;
  };
});

}
}, function(){
__fuse.r(1)
})
//# sourceMappingURL=app.js.map