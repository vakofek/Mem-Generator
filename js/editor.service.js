'use strict';

var FONT_KEY = 'font';

var gCanvas;
var gCtx;
var gSelectedMem;
var gIsChange = false;
var gCurrFont;
var gPreveLineIdx;

function resetCanvas() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
}

function changeTextLine() {
    if (gIsChange) {
        gIsChange = false;
        return false;
    }
    gSelectedMem.selectedLineIdx++;
    if (gSelectedMem.selectedLineIdx >= gSelectedMem.lines.length) gSelectedMem.selectedLineIdx = 0;
    gIsChange = true;
    saveToStorage(SELECTED_MEME, gSelectedMem);
    return true;
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

function updateFont(font) {
    gCurrFont = font;
    saveToStorage(FONT_KEY, gCurrFont)
}

function getFont() {
    gCurrFont = loadFromStorage(FONT_KEY)
    if (!gCurrFont) return 'Impact';
    return gCurrFont;
}

function updateFontColor(color) {
    gSelectedMem.lines[gSelectedMem.selectedLineIdx].color = color;
    saveToStorage(SELECTED_MEME, gSelectedMem);
}