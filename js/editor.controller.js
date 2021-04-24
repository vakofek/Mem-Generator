'use strict';

var gCurrMeme;
var gStartPos;
var gIsEditorMode = false;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    resetCanvas();
    gSelectedMem = lo5adFromStorage(SELECTED_MEME);
    addListeners();
    renderCanvas();
    renderEditor();
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function toggelEditor() {
    document.body.classList.toggle('editor-open');
}

function renderCanvas() {
    var img = new Image()
    var selectedMeme = getSelectedMeme();
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        if (selectedMeme.lines) {
            selectedMeme.lines.forEach(function (line, idx) {
                var txt = line.txt;
                gCtx.font = line.size + 'px ' + getFont(idx);
                gCtx.fillStyle = line.color;
                gCtx.textAlign = line.align
                gCtx.fillText(txt, line.pos.startX, line.pos.startY);
            });
        }
    }
    img.src = selectedMeme.imgUrl;
}

function renderEditor() {
    var strHTML = `
    <input class="meme-txt" type="text"  oninput="onUpdateTextInput(this.value)" placeholder="Enter your text here">
            <button class="up-down-btn" onclick="onCangeTextLine()"><img src="icons/up-and-down-opposite-double-arrows-side-by-side.png"></button>
            <button class="add-btn" onclick="onAddText()"><img src="icons/add.png"></button>
            <button class="trash-btn" onclick="onRemoveText()"><img src="icons/trash.png"></button>
            <button class="increase-font-btn" onclick="onIncreaseFont()"><img src="icons/increase font - icon.png"></button>
            <button class="decrease-font-btn" onclick="onDecreaseFont()"><img src="icons/decrease font - icon.png"></button>
            <button class="left-btn" onclick="onAlignText('start',0)"><img src="icons/align-to-left.png"></button>
            <button class="center-btn" onclick="onAlignText('center',${getCnvasWidth() / 2})"><img src="icons/center-text-alignment.png"></button>
            <button class="right-btn" onclick="onAlignText('end',${getCnvasWidth()})"><img src="icons/align-to-right.png"></button>
            <select class="font-select" onchange="onUpdateFont(this.value)">
            <option value="Impact">Impact</option>
            <option value="Permanet">Permanet</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Bubble">Bubble</option>
            </select>
            <button class="stroke-btn"><img src="icons/text stroke.png"></button>
            <input type="color" class="paint-btn" onchange="onUpdateFontColor(this.value)" />
            <select class="imoji-select" onchange="onAddStickers(this.value)">Imoji</select>
            <button class="share-btn">Share</button>
            <button class="save-btn" onclick="OnSaveCanvas()"><i class="far fa-save"></i></button>
            <button class="download-btn"><a href="#" onclick="downloadImg(this)" download="my-img.jpg">Download</a></button>
            `;
    document.querySelector('.edit-container').innerHTML = strHTML;
    renderEmojies();
}

function onAlignText(align, posX) {
    if (!gIsChange) return;
    alignText(align, posX);
    renderCanvas();
}

function renderEmojies() {
    var emojies = getEmojies();
    var strHTML = emojies.map(function (emoji, idx) {
        return `<option value="${idx}">${emoji}</option>`
    });
    document.querySelector('.imoji-select').innerHTML = strHTML.join('');
}

function onAddText() {
    var elTxtInput = document.querySelector('.meme-txt');
    var txt = elTxtInput.value;
    if (!txt) return;
    addText(txt);
    gSelectedMem = loadFromStorage(SELECTED_MEME);
    renderEditor();
    renderCanvas();
}

function onCangeTextLine() {
    if (!changeTextLine()) resetPlaceOlder();
    else {
        var elTxtInput = document.querySelector('.meme-txt');
        updateInputPlaceOlder(elTxtInput);
    }
    renderCanvas();
}

function onUpdateTextInput(txt) {
    if (!gIsChange) return
    updateTextInput(txt);
    renderCanvas();
}

function onRemoveText() {
    if (!gIsChange) return
    removeText();
    resetPlaceOlder()
    renderCanvas();

}

function resetPlaceOlder() {
    document.querySelector('.meme-txt').placeholder = 'Enter your text here';
    renderEditor();
}

function onIncreaseFont() {
    if (!gIsChange) return;
    increaseFont();
    renderCanvas();
}

function onDecreaseFont() {
    if (!gIsChange) return;
    decreaseFont();
    renderCanvas();
}

function onUpdateFont(font) {
    if (!gIsChange) return
    updateFont(font);
    renderCanvas();
}

function onUpdateFontColor(color) {
    if (!gIsChange) return
    updateFontColor(color);
    renderCanvas();
}

function downloadImg(el) {
    var imgContant = getCnvas().toDataURL('image/jpeg');
    el.href = imgContant;
}

function OnSaveCanvas() {
    saveCanvas();
    gIsEditorMode = false;
    toggelEditor();
}

function onAddStickers(emojiIdx) {
    var emoji = getEmoji(emojiIdx);
    addText(emoji);
    renderEditor();
    gSelectedMem = loadFromStorage(SELECTED_MEME);
    renderCanvas();
}


// ******* mouse and touch events  *******

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove);
    gCanvas.addEventListener('mousedown', onDown);
    gCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove);
    gCanvas.addEventListener('touchstart', onDown);
    gCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
    if (!gIsChange) return
    const pos = getEvPos(ev)
    gSelectedMem.lines[gSelectedMem.selectedLineIdx].isDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function getEvPos(ev) {
    const pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0]
        pos.x = ev.pageX - ev.target.offsetLeft - ev.target.clientLeft;
        pos.y = ev.pageY - ev.target.offsetTop - ev.target.clientTop
    }
    return pos
}

function onMove(ev) {
    if (gSelectedMem.lines.length!==0) {
        if (gSelectedMem.lines[gSelectedMem.selectedLineIdx].isDragging) {
            const pos = getEvPos(ev)
            gSelectedMem.lines[gSelectedMem.selectedLineIdx].pos.startX = pos.x
            gSelectedMem.lines[gSelectedMem.selectedLineIdx].pos.startY = pos.y
            saveToStorage(SELECTED_MEME, gSelectedMem);
            gStartPos = pos
            renderCanvas()
        }
    }
}

function onUp(ev) {
    if (gSelectedMem.lines.length!==0){
        var pos = getEvPos(ev);
        gSelectedMem.lines[gSelectedMem.selectedLineIdx].isDragging = false
        document.body.style.cursor = 'grab'
    }
}

