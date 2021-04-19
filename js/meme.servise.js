'use strict';

var MEMES_KEY = 'mems';
var gMemes;
var gMeme;

var gKeyword = {
    'happy': 5,
    'funny': 5
}

_createMemes();
function _createMemes() {
    // debugger
    var memes = loadFromStorage(MEMES_KEY);
    if (!memes || !memes.length) {
        memes = [];
        memes.push(_createMeme(1, 'happy'));
        memes.push(_createMeme(2, 'happy'));
        memes.push(_createMeme(3, 'funny'));
        memes.push(_createMeme(4, 'happy'));
        memes.push(_createMeme(5, 'happy'));
        memes.push(_createMeme(6, 'happy'));
    }
    gMemes = memes;
    saveToStorage(MEMES_KEY, gMemes)
}

function _createMeme(imgUrl, keyword) {
    return {
        id: makeId(),
        imgUrl: makeImgUrl(imgUrl),
        selectedImgId: 1,
        selectedLineIdx: 0,
        keyword,
        lines: [
            {
                txt: 'add text',
                size: 20,
                aligb: 'left',
                color: 'red'
            }
        ]
    }
}




var gImgs = [{
    id: 1,
    url: 'img/1.jpg',
    keyword: ['happy']
}];


function getMeme(memeId) {

}

function getMemes() {
    return gMemes;
}

function updateSelectedMeme(memeId) {
    gMeme = _getMemeById(memeId);
}

function _getMemeById(memeId) {
    return gMemes.find(function (meme) {
        return meme.id === memeId;
    })
}

function getSelectedMeme() {
    return gMeme;
}







// var gMeme = {
//     id: makeId(),
//     selectedImgId: 1,
//     selectedLineIdx: 0,
//     lines: [
//         {
//             txt: 'add text',
//             size: 20,
//             aligb: 'left',
//             color: 'red'
//         }
//     ]
// };