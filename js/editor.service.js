'use strict';

var gCanvas;
var gCtx;
var gSelectedMem;

var gPreveLineIdx;

function resetCanvas() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
}

function changeTextLine() {
    gPreveLineIdx = gSelectedMem.selectedLineIdx;
    gSelectedMem.selectedLineIdx++;
    if (gSelectedMem.selectedLineIdx >= gSelectedMem.lines.length) gSelectedMem.selectedLineIdx = 0;
    else if (gPreveLineIdx >= gSelectedMem.lines.length) gPreveLineIdx = 0;
    var currIdx = gSelectedMem.selectedLineIdx
    gSelectedMem.lines[currIdx].color = 'red';
    gSelectedMem.lines[gPreveLineIdx].color = '#FFFFFF';
    saveToStorage(SELECTED_MEME, gSelectedMem);
}

function removeText() {
    gSelectedMem.lines.splice(gSelectedMem.selectedLineIdx, 1);
    saveToStorage(SELECTED_MEME, gSelectedMem);
}

function increaseFont() {
    gSelectedMem.lines[gSelectedMem.selectedLineIdx].size += 5;
    saveToStorage(SELECTED_MEME, gSelectedMem);
}

function decreaseFont() {
    gSelectedMem.lines[gSelectedMem.selectedLineIdx].size -= 5;
    saveToStorage(SELECTED_MEME, gSelectedMem);

}
function updateInputPlaceOlder(elTxtInput) {
    elTxtInput.value = gSelectedMem.lines[gSelectedMem.selectedLineIdx].txt;
}


function updateTextInput(txt) {
    gSelectedMem.lines[gSelectedMem.selectedLineIdx].txt = txt;
}