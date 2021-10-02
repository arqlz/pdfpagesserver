
export declare const pdfjsLib: typeof import("pdfjs-dist")

export var current_code = 0;
export var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export async function getThumbnails(path: string | ArrayBuffer = "../pdf/test.pdf") {
    return new Promise<{ data: string; id: any; page_number: number; }[]>((resolve, reject) => {

        current_code++;
        console.log(abc[current_code - 1]);
        var imagenes = [];
        pdfjsLib.getDocument(path as any).promise.then(async (doc) => {

            var paginas = doc.numPages;
            for (var page_index = 1; page_index <= paginas; page_index++) {
                var canvas = document.createElement("canvas") as HTMLCanvasElement;
                var canvasContext = canvas.getContext("2d");

                var page = await doc.getPage(page_index);
                var viewport = page.getViewport({ scale: 0.2 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext, viewport }).promise;
                var img = canvas.toDataURL("image/png");
                imagenes.push({ data: img, page_number: page_index, id: abc[(current_code - 1) % (abc.length)] + page_index });
            }


            resolve(imagenes);
        });
    });
}
