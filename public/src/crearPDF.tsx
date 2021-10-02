import * as download from "downloadjs";

export function crearPDF(files: any[], order: { id: string; page_number: number; file_id: string; }[]) {
    var form = new FormData();
    for (var f of files)
        form.append("files", new Blob([f], { type: "application/pdf" }));
    form.append("orden", JSON.stringify(order.map(c => {
        return { id: c.id, page_number: c.page_number, file_id: c.id[0] };
    })));
    return fetch("/api/pdf/upload", {
        body: form,
        method: "POST",
    }).then(response => {
        console.log(response)
        return response.arrayBuffer()//.blob()
    })
        .then(blob => {
            console.log("descargar a la pc", blob)
            download(blob, "concat.pdf", "application/pdf");
            return;
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "concat.pdf";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove(); //afterwards we remove the element again         
        }).catch(err => {
            console.error(err)
        });
}
