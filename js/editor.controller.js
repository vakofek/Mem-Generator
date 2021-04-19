'use strict';

var gCurrMeme;


function onInit() {
    resetCanvas();
    gSelectedMem = loadFromStorage(SELECTED_MEME);
    resizeCanvas();
    renderCanvas();
    renderEditor();
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function renderCanvas() {
    var img = new Image()
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        gSelectedMem.lines.forEach(function (line) {
            var txt = line.txt;
            if (!txt) txt = '';
            gCtx.font = line.size + 'px  Impact';
            gCtx.fillStyle = line.color;
            gCtx.fillText(txt, line.startX, line.startX);
        });
    }
    img.src = gSelectedMem.imgUrl;
}

function renderEditor() {
    var strHTML = `
    <input class="meme-txt" type="text" placeholder="Enter your text here">
            <button class="up-down-btn" onclick="onCangeTextLine()"><img src="icons/up-and-down-opposite-double-arrows-side-by-side.png"></button>
            <button class="add-btn" onclick="onAddText()"><img src="icons/add.png"></button>
            <button class="trash-btn" onclick="onRemoveText()"><img src="icons/trash.png"></button>
            <button class="increase-font-btn" onclick="onIncreaseFont()"><img src="icons/increase font - icon.png"></button>
            <button class="decrease-font-btn" onclick="onDecreaseFont()"><img src="icons/decrease font - icon.png"></button>
            <button class="left-btn"><img src="icons/align-to-left.png"></button>
            <button class="center-btn"><img src="icons/center-text-alignment.png"></button>
            <button class="right-btn"><img src="icons/align-to-right.png"></button>
            <select class="impact-select" name="" id="">Impact</select>
            <button class="stroke-btn"><img src="icons/text stroke.png"></button>
            <button class="paint-btn"><img src="icons/paint-board-and-brush.png"></button>
            <select class="imoji-select" name="" id="">Imoji</select>
            <button class="share-btn">Share</button>
    `;
    document.querySelector('.edit-container').innerHTML = strHTML;
}

function onAddText() {
    var elTxtInput = document.querySelector('.meme-txt');
    var txt = elTxtInput.value;
    addText(txt);
    renderEditor();
    location.reload();
}

function onCangeTextLine() {
    changeTextLine();
    renderCanvas();
}

function onRemoveText() {
    removeText();
    renderCanvas();
}

function onIncreaseFont() {
    increaseFont();
    renderCanvas();
}

function onDecreaseFont() {
    decreaseFont();
    renderCanvas();
}


