"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPDFTEST = void 0;
async function getPDFTEST(url) {
    return fetch(url).then(res => {
        return res.arrayBuffer();
    });
}
exports.getPDFTEST = getPDFTEST;
