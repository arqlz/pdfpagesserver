"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThumbnails = exports.abc = exports.current_code = void 0;
exports.current_code = 0;
exports.abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
async function getThumbnails(path = "../pdf/test.pdf") {
    return new Promise((resolve, reject) => {
        exports.current_code++;
        console.log(exports.abc[exports.current_code - 1]);
        var imagenes = [];
        exports.pdfjsLib.getDocument(path).promise.then(async (doc) => {
            var paginas = doc.numPages;
            for (var page_index = 1; page_index <= paginas; page_index++) {
                var canvas = document.createElement("canvas");
                var canvasContext = canvas.getContext("2d");
                var page = await doc.getPage(page_index);
                var viewport = page.getViewport({ scale: 0.2 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                await page.render({ canvasContext, viewport }).promise;
                var img = canvas.toDataURL("image/png");
                imagenes.push({ data: img, page_number: page_index, id: exports.abc[(exports.current_code - 1) % (exports.abc.length)] + page_index });
            }
            resolve(imagenes);
        });
    });
}
exports.getThumbnails = getThumbnails;
