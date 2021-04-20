'use strict';

var gShowMode;

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
        return ` <div onclick="onMemeSelected('${meme.id}')" class="image-card"><img src="${meme.imgUrl}" /></div>`
    });
    var elGallery = document.querySelector('.gallery-container');
    elGallery.innerHTML = strHTML.join('');
}

function onMemeSelected(memeId) {
    updateSelectedMeme(memeId);
    console.log(getSelectedMeme());
    window.location.href = 'editor.html'
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