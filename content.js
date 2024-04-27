const svgString = `<svg width="20px" height="20px" viewBox="0 -7 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    
    <title>Search on YT</title>
    <desc>Created with Sketch.</desc>
    <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Color-" transform="translate(-200.000000, -368.000000)" fill="#CE1312">
            <path d="M219.044,391.269916 L219.0425,377.687742 L232.0115,384.502244 L219.044,391.269916 Z M247.52,375.334163 C247.52,375.334163 247.0505,372.003199 245.612,370.536366 C243.7865,368.610299 241.7405,368.601235 240.803,368.489448 C234.086,368 224.0105,368 224.0105,368 L223.9895,368 C223.9895,368 213.914,368 207.197,368.489448 C206.258,368.601235 204.2135,368.610299 202.3865,370.536366 C200.948,372.003199 200.48,375.334163 200.48,375.334163 C200.48,375.334163 200,379.246723 200,383.157773 L200,386.82561 C200,390.73817 200.48,394.64922 200.48,394.64922 C200.48,394.64922 200.948,397.980184 202.3865,399.447016 C204.2135,401.373084 206.612,401.312658 207.68,401.513574 C211.52,401.885191 224,402 224,402 C224,402 234.086,401.984894 240.803,401.495446 C241.7405,401.382148 243.7865,401.373084 245.612,399.447016 C247.0505,397.980184 247.52,394.64922 247.52,394.64922 C247.52,394.64922 248,390.73817 248,386.82561 L248,383.157773 C248,379.246723 247.52,375.334163 247.52,375.334163 L247.52,375.334163 Z" id="Youtube">

</path>
        </g>
    </g>
</svg>`
const googleString = `<svg width="20px" height="20px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z" fill="#4285F4"/>
<path d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z" fill="#34A853"/>
<path d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z" fill="#FBBC05"/>
<path d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z" fill="#EB4335"/>
</svg>`


function addButtons() {
  var selectedText = window.getSelection().toString().trim();
  if (selectedText !== '') {
    var parser = new DOMParser();
    var svgEl1 = parser.parseFromString(svgString, 'image/svg+xml').documentElement;
    var svgEl2 = parser.parseFromString(googleString, 'image/svg+xml').documentElement;

    svgEl1.onclick = function () {
      window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(selectedText));
    };
    svgEl2.onclick = function () {
      window.open('https://www.google.com/search?q=' + encodeURIComponent(selectedText));
    };

    var div = document.createElement('span');
    div.style = "margin-left: 2px; margin-right: 2px; width: 20px; height: 20px; border: none; background: none; padding: 0; cursor: pointer;"

    div.appendChild(svgEl1);
    div.appendChild(svgEl2);

    var range = window.getSelection().getRangeAt(0);
    var clonedRange = range.cloneRange();
    range.collapse(false);
    range.insertNode(div);

    window.getSelection().removeAllRanges();
    window.getSelection().addRange(clonedRange);

    setTimeout(() => {
      // Delete inserted node
      div.parentNode.removeChild(div);
    }, 5000)
  }
}

chrome.storage.local.get(['extnOn'], function (result) {
  if (result?.extnOn) {
    document.addEventListener('mouseup', addButtons);
  } else {
    document.removeEventListener('mouseup', addButtons);
  }
});

// Listen for changes in extnOn
chrome.storage.onChanged.addListener(function(changes) {
  if ('extnOn' in changes) {
    var extnOn = changes.extnOn.newValue;
    console.log("Changes value from contentjs", extnOn);
    if (extnOn) {
      document.addEventListener('mouseup', addButtons);
    } else {
      document.removeEventListener('mouseup', addButtons);
    }
  }
});