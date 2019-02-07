angular.module('nutri',['ngMaterial','ngMessages'])
.controller('nutriCtr',function($scope){
  $scope.a='hannad'
})

const button = document.getElementById('search');
const textField = document.getElementById('searchField');
let searchTerm = '';
button.addEventListener('click',function(){
  searchTerm = textField.value;
  sendMessageToContent(searchTerm)
})

function sendMessageToContent(message){
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
      tabs[0].id,
      {from: 'popup', subject: 'search' , 'message': message},
      // ...also specifying a callback to be called 
      //    from the receiving end (content script)
      );
    });
  }