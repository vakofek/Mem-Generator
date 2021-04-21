'use strict';

var MEMES_KEY = 'all memes';
var SELECTED_MEME = 'selcted meme';
var KEYWORD_KEY = 'keywords'
var SAVED_MEMES = 'saved memes';

var gMemes;
var gSavedMemes;
var gMeme;

var gKeyword = {
    'happy': 20,
    'funny': 20,
    'politic': 20,
    'pets': 20,
    'qute': 20,
    'funny': 20,
    'boring': 20,
    'evil': 20,
    'love': 20,
    'chears': 20,
    'toys': 20
};

_loadSavedMems();
_createMemes();
function _createMemes() {
    var memes = loadFromStorage(MEMES_KEY);
    if (!memes || !memes.length) {
        memes = _getMemesFromLocalDB();
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
                txt: 'EDIT ME !',
                size: 30,
                font: 'Impact',
                align: 'center',
                color: '#FFFFFF',
                pos: {
                    startX: 175,
                    startY: 100,
                    length: 173.608
                },
                isDragging: false,
                isSelected: false
            }
        ]
    }
}

function _loadSavedMems() {
    gSavedMemes = loadFromStorage(SAVED_MEMES);
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
    var meme = gMemes.find(function (meme) {
        return meme.id === memeId;
    })
    if (!meme) {
        meme = gSavedMemes.find(function (meme) {
            return meme.id === memeId;
        });
    }
    return meme;

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
                size: 30,
                font: 'Impact',
                align: 'center',
                color: '#FFFFFF',
                isDragging: false,
                isSelected: false,
                pos: {
                    startX: 175,
                    startY: 100,
                    length: getTextLength(txt)
                }
            })
    });
    saveToStorage(SELECTED_MEME, selctedMeme)
}

function getTextLength(txt) {
    var length = gCtx.measureText(txt).width;
    console.log(length);
    return length;
}

function getKeyWords() {
    return Object.getOwnPropertyNames(gKeyword);
}

function getKeyWordSize(keyword) {
    gKeyword = loadFromStorage(KEYWORD_KEY)
    return gKeyword[keyword];
}

function updateKeywordSize(keyword) {
    if (gKeyword[keyword] === 50) return;
    gKeyword[keyword] += 5;
    saveToStorage(KEYWORD_KEY, gKeyword)
}

function resetKeywords() {
    if (!loadFromStorage(KEYWORD_KEY)) saveToStorage(KEYWORD_KEY, gKeyword);
}

function getKeyWordsLength() {
    return getKeyWords().length;
}

function getSavedMemes() {
    return loadFromStorage(SAVED_MEMES);
}








//  ******** DB **********
function _getMemesFromLocalDB() {
    var memes = [];
    memes.push(_createMeme(1, 'politic'));
    memes.push(_createMeme(2, 'pets'));
    memes.push(_createMeme(3, 'qute'));
    memes.push(_createMeme(4, 'pets'));
    memes.push(_createMeme(5, 'funny'));
    memes.push(_createMeme(6, 'happy'));
    memes.push(_createMeme(7, 'qute'));
    memes.push(_createMeme(8, 'boring'));
    memes.push(_createMeme(9, 'evil'));
    memes.push(_createMeme(10, 'politic'));
    memes.push(_createMeme(11, 'love'));
    memes.push(_createMeme(12, 'evil'));
    memes.push(_createMeme(13, 'chears'));
    memes.push(_createMeme(14, 'evil'));
    memes.push(_createMeme(15, 'evil'));
    memes.push(_createMeme(16, 'boring'));
    memes.push(_createMeme(17, 'politic'));
    memes.push(_createMeme(18, 'toys'));
    return memes;
}

