function toggleActiveClass() {
  chrome.storage.local.get(['extnOn'], function (result) {
    var extnOn = !result.extnOn; // Toggle the value of extnOn
    chrome.storage.local.set({ extnOn: extnOn }, function() {
      // Update the class of toggleButton based on the new value
      console.log("Value got on click :",result );
      console.log("Value updated on click : ",extnOn);
      document.getElementById('toggleButton').classList.toggle('active', extnOn);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('toggleButton');
  button.addEventListener('click', toggleActiveClass);
  
  // Set initial state of toggleButton based on stored value
  chrome.storage.local.get(['extnOn'], function (result) {
    console.log("Setting from popup value :",result);
    button.classList.toggle('active', result.extnOn);
  });
});