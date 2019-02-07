console.log('content script has loaded')




chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  console.log('i listented')
  if ((msg.from === 'popup') && (msg.subject === 'search')) {
      const message = msg.message;
      console.log(message);
      message.forEach(item=>{
        searchInDom(item);
      });
    response('hey');
  }
});

function searchInDom(searchTerms){
  const nodeTypesIgnored = ['DIV','ARTICLE','SECTION','HEADER','FOOTER','IMG', 'SCRIPT','BODY', 'HEAD','UL', 'BR', 'NAV','FORM','INPUT' ,'svg','path', 'polygon','MAIN'];
  const className = makeid();
  $('*', 'body')
  .addBack()
  .contents()
  .filter(function(){
      const isValid = !nodeTypesIgnored.includes(this.nodeName);
      return isValid
  })
  .filter(function(){
      const isValid = (!!(this.nodeValue && isInString(this.nodeValue,searchTerms))) || (!!(this.innerText && isInString(this.innerText,searchTerms)));
      return isValid
  })
  .each(function(){
      var elem = this.nodeValue !==null ? $(this).parent() : $(this); 
      elem.addClass(className)
  });
  
  $('#dynamicStyle').remove();

  const style = $('<style/>').attr('id','dynamicStyle').text(
    `
    .${className},  .${className} * {
      background-color: #3f51b5 !important;
      color:white !important;
    }
    `
  )
  $('head').append(style);

}
function isInString(str,term){
  return lowerCaseTrimmed(str).indexOf(term) !== -1;
}

function lowerCaseTrimmed(str){
  return str.toLowerCase().trim();
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
