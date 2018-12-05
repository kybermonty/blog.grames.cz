$(function () {
    // parse emoji
    var arr = document.getElementsByTagName('article');
    for (var i = 0; i < arr.length; i++) {
        twemoji.parse(arr[i]);
    }
});
