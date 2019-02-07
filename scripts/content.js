console.log("content script has loaded");

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  // First, validate the message's structure
  console.log("i listented");
  if (msg.from === "popup" && msg.subject === "search") {
    const message = msg.message;
    console.log(message);
    message.forEach(item => {
      searchInDom(item);
    });
    highlighTerms(message);
    response("hey");
  }
});

function highlighTerms(matchedIngs) {
  var className = "marked";
  var style = $("<style/>")
    .attr("id", "dynamicStyle")
    .text(
      `
    .${className},  .${className} * {
      background-color: #3f51b5 !important;
      color:white !important;
    }
    `
    );
  $("head").append(style);
  var elementsToBeParsed = ["ul", "table"];
  elementsToBeParsed.forEach(el => {
    $(el).each(function() {
      const elm = this;
      matchedIngs.forEach(ings => {
        if (!$(elm).hasClass("marked")) {
          var pattern = new RegExp(ings, "g");
          var newhtml = $(elm)
            .html()
            .replace(pattern, '<span class="marked">' + ings + "</span>");
          $(elm).html(newhtml);
        }
      });
    });
  });
}

function isInString(str, term) {
  return lowerCaseTrimmed(str).indexOf(term) !== -1;
}

function lowerCaseTrimmed(str) {
  return str.toLowerCase().trim();
}

function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
