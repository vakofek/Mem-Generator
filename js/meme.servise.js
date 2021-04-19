'use strict';

var MEMES_KEY = 'all memes';
var SELECTED_MEME = 'selcted meme';
var gMemes;
var gMeme;

var gKeyword = {
    'happy': 5,
    'funny': 5
}

_createMemes();
function _createMemes() {
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
                size: 50,
                align: 'left',
                color: '#FFFFFF',
                startX: getRandomInt(50, 300),
                starty: getRandomInt(50, 300),
                isDragging: false
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
    saveToStorage(SELECTED_MEME, gMeme)
}

function _getMemeById(memeId) {
    return gMemes.find(function (meme) {
        return meme.id === memeId;
    })
}

function getSelectedMeme() {
    return loadFromStorage(SELECTED_MEME);
}

function addText(txt) {
    var selctedMeme = getSelectedMeme();
    gMemes.find(function (meme) {
        if (meme.id === selctedMeme.id)
            selctedMeme.lines.push({
                txt,
                size: 50,
                align: 'left',
                color: '#FFFFFF',
                isDragging: false,
                pos: {
                    startX: getRandomInt(50, 300),
                    starty: getRandomInt(50, 300),
                }
            })
    });
    saveToStorage(SELECTED_MEME, selctedMeme)
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