function toggleActiveClass() {
  chrome.storage.local.get(['extnOn'],function(result) {
    console.log(result.extnOn);
    document.getElementById('toggleButton').classList.toggle('active',result.extnOn == false);
    chrome.storage.local.set({extnOn: result.extnOn == false});
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('toggleButton');
  button.addEventListener('click', toggleActiveClass);
});

chrome.storage.local.get(['extnOn'],function(result) {
  console.log("Setting from popup");
  document.getElementById('toggleButton').classList.toggle('active',result.extnOn);
})