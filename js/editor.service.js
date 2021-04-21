'use strict';

var FONT_KEY = 'font';


var gCanvas;
var gCtx;
var gSelectedMem;
var gIsChange = false;
var gPreveLineIdx;
var gLineColor;


function resetCanvas() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
}

function changeTextLine() {
    if (gIsChange) {
        gIsChange = false;
        updateFontColor(gLineColor);
        return false;
    }
    gSelectedMem.selectedLineIdx++;
    if (gSelectedMem.selectedLineIdx >= gSelectedMem.lines.length) gSelectedMem.selectedLineIdx = 0;
    gLineColor = gSelectedMem.lines[gSelectedMem.selectedLineIdx].color;
    updateFontColor('red');
    gIsChange = true;
    saveToStorage(SELECTED_MEME, gSelectedMem);
    return true;
}

function updateLineColor(color) {
    gSelectedMem.lines[gSelectedMem.selectedLineIdx].color = color;
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
    saveToStorage(SELECTED_MEME, gSelectedMem);
}

function updateFont(font) {
    gSelectedMem.lines[gSelectedMem.selectedLineIdx].font = font;
    saveToStorage(SELECTED_MEME, gSelectedMem);
}


function getFont(idx) {
    var font = gSelectedMem.lines[idx].font;
    if (!font) return 'Impact';
    return font;
}

function updateFontColor(color) {
    if (gIsChange) gLineColor = color
    gSelectedMem.lines[gSelectedMem.selectedLineIdx].color = color;
    saveToStorage(SELECTED_MEME, gSelectedMem);
}

function getCnvas() {
    return gCanvas;
}

function getEmojies() {
    return gEmojies;
}

function getEmoji(emojiIdx) {
    return (gEmojies[emojiIdx]);
}

function alignText(align, posX) {
    gSelectedMem.lines[gSelectedMem.selectedLineIdx].align = align;
    gSelectedMem.lines[gSelectedMem.selectedLineIdx].pos.startX = posX;
    saveToStorage(SELECTED_MEME, gSelectedMem);
}

function getCnvasWidth() {
    return gCanvas.width;
}

function saveCanvas(){
    // debugger
    var imgContant = getCnvas().toDataURL('image/jpeg');
    gSavedMemes=getSavedMemes();
    if(!gSavedMemes || !gSavedMemes.length) gSavedMemes=[];
    gSelectedMem.id=makeId();
    gSelectedMem.imgUrl=imgContant;
    gSavedMemes.push(gSelectedMem);
    saveToStorage(SAVED_MEMES,gSavedMemes)
}

function getSavedMemes(){
    return loadFromStorage(SAVED_MEMES);
}

function canPress(){
    return (!gIsChange || !gSelectedMem.lines.length)? false:true;
}

// ******* edito DB  *******

var gEmojies = ['😃', '😍', '😍', '😴', '😎', '😎'];