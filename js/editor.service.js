'use strict';

var gCanvas;
var gCtx;

function resetCanvas() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
}

