import './dist/jquery.mark.js';
export function highlightKeyWords(arr){
    $(document.querySelectorAll("body")).mark(arr, {
        "element": "span",
        "className": "highlight"
    });
    // var instance = new Mark(document.querySelectorAll("body"));
    // instance.mark(arr, {"element": "span", "className": "highlight"});
}