'use strict';

var gCurrMeme;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    resetCanvas();
    gSelectedMem = loadFromStorage(SELECTED_MEME);
    addListeners();
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
            gCtx.fillText(txt, line.pos.startX, line.pos.startX);
        });
    }
    img.src = gSelectedMem.imgUrl;
}

function renderEditor() {
    var strHTML = `
    <input class="meme-txt" type="text" onchange="onUpdateTextInput(this.value)" placeholder="Enter your text here">
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
    var elTxtInput = document.querySelector('.meme-txt');
    updateInputPlaceOlder(elTxtInput);
    renderCanvas();
}

function onUpdateTextInput(txt) {
    updateTextInput(txt);
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


// ******* mouse and touch events  *******

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
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
    const pos = getEvPos(ev)
    // if (!isCirlceClicked(pos)) return   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    gSelectedMem.lines[gSelectedMem.selectedLineIdx].isDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function getEvPos(ev) {
    // debugger
    const pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos.x = ev.pageX - ev.target.offsetLeft - ev.target.clientLeft;
        pos.y = ev.pageY - ev.target.offsetTop - ev.target.clientTop
        // pos = {
        //     x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        //     y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        // }
    }
    return pos
}

function onMove(ev) {
    if (gSelectedMem.lines[gSelectedMem.selectedLineIdx].isDragging) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        console.log(pos);
        gSelectedMem.lines[gSelectedMem.selectedLineIdx].pos.startX += dx
        gSelectedMem.lines[gSelectedMem.selectedLineIdx].pos.startY += dy

        // gCircle.pos = pos
        gStartPos = pos
        renderCanvas()
        // renderCircle()
    }
}

function onUp() {
    gSelectedMem.lines[gSelectedMem.selectedLineIdx].isDragging = false
    document.body.style.cursor = 'grab'
}