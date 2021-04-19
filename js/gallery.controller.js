'use strict';

function onInitGallery() {
    renderMemesGallery();
}

function renderMemesGallery() {
    var memes = getMemes();
    console.log(memes);
    var strHTML = memes.map(function (meme) {
        return ` <div onclick="onMemeSelected('${meme.id}')" class="image-card"><img src="${meme.imgUrl}" /></div>`
    });
    var elGallery = document.querySelector('.gallery-container');
    elGallery.innerHTML = strHTML.join('');
}

function onMemeSelected(memeId) {
    updateSelectedMeme(memeId);
    window.location.href='editor.html'
}