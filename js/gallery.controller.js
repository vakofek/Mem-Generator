'use strict';

var gShowMode;
var gIsSavedMemes=false;

function onInitGallery() {
    gShowMode = false;
    renderMemesGallery();
    resetKeywords();
    renderSearch(3)
}

function toggleMenu(){
    document.body.classList.toggle('menu-open');
}

function renderSearch(keyNums) {
    var keyword = getKeyWords();
    var strHTML = `<li style="font-size:25px" class="search-more" onclick="renderMemesGallery()">All</li>`;
    for (var i = 0; i < keyNums; i++) {
        var fontSize = getKeyWordSize(keyword[i]);
        strHTML += `<li style="font-size:${fontSize}px;"  onclick="onSearchKeyword(this.innerText ,${keyNums})">${keyword[i]}</li>`;
    }
    strHTML += `<li style="font-size:25px" class="search-more" onclick="onShowFilters()">${getShowMode()}</li>`;
    document.querySelector('.search-key').innerHTML = strHTML;
}

function renderMemesGallery() {
    var memes = getMemes();
    var strHTML = memes.map(function (meme) {
        return ` <div onclick="onMemeSelected('${meme.id}','gallery')" class="image-card"><img src="${meme.imgUrl}" /></div>`
    });
    var elGallery = document.querySelector('.memes-container');
    elGallery.innerHTML = strHTML.join('');
}

function onMemeSelected(memeId,galleryType) {
    if(!gIsEditorMode) toggelEditor();
    updateSelectedMeme(memeId);
    resetCanvas();
    gSelectedMem = loadFromStorage(SELECTED_MEME);
    addListeners();
    renderCanvas();
    renderEditor();
    gIsEditorMode=true;
    if(galleryType==='gallery') return;
    if(gIsSavedMemes) toggleMemes();
}

function onSearchKeyword(keyword, keyNums) {
    updateKeywordSize(keyword);
    renderSearch(keyNums);
    renderFilterdGallery(keyword);
}

function onShowFilters() {
    gShowMode = !gShowMode;
    if (gShowMode) {
        var keyNums = getKeyWordsLength();
        renderSearch(keyNums);
    }
    else renderSearch(3);

}

function getShowMode() {
    return (gShowMode) ? 'close X' : 'more..';
}

function renderFilterdGallery(keyword) {
    var memes = getMemes();
    memes = memes.filter(meme => meme.keyword === keyword);
    var strHTML = memes.map(function (meme) {
        return ` <div onclick="onMemeSelected('${meme.id}')" class="image-card"><img src="${meme.imgUrl}" /></div>`
    });
    var elGallery = document.querySelector('.gallery-container');
    elGallery.innerHTML = strHTML.join('');

}




// ************************************************************

function onInitMemes(){
    gIsSavedMemes=true;
    renderSavedMemesGallery();
    toggleMemes();
}

function renderSavedMemesGallery(){
    var memes=getSavedMemes();
    var strHTML='<div class="saved-gallery-container gallery-container"> <div><button onclick="toggleMemes()">X</button></div>';
    if(!memes || !memes.length) strHTML+=`<span>You don't have saved memes yet !<span>`
    else{

        var elMemes=memes.map(function(meme){
            return `<div onclick="onMemeSelected('${meme.id}')" class="image-card"><img src="${meme.imgUrl}" /></div>`;
        });
        strHTML+=elMemes.join('');
    }
    strHTML+=('</div>');
    document.querySelector('.saved-memes-container').innerHTML=strHTML;
}

function toggleMemes(){
    document.body.classList.toggle('memes-open');
}



