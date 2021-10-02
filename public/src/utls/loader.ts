export async function getPDFTEST(url) {
    return fetch(url).then(res => {
        return res.arrayBuffer()
    })
}