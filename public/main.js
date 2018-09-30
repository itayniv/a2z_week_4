var height = 16;
var width = 16;
var onLoad = false;
var container;
let wikiInputOne;
let wikiInputTwo;
let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=';
let url;
let url2;
let response;
let searchResult1;
let searchResult2;
let searchResult1discription;
let searchResult2discription;
let wordOne;
let allDec = '';
let currSpanID;

let antonymRecieved = [];

let allDecleration = [decleration1, decleration2, decleration3, decleration4, decleration5, decleration6, decleration7, decleration8, decleration9, decleration10, decleration11, decleration12, decleration13, decleration14, decleration15, decleration16, decleration17, decleration18, decleration19, decleration20];


/// on page load do the next things:

$.ajax({
  url: "/GetGridSize",
  context: document.body
}).done(function(data) {
  // console.log(data);
});

//on page load finish do the next things:


window.onload = function() {
  onLoad = true;
  console.log("window_load");
  init();
};


function init(){


  // document.getElementById("header").innerHTML = Trumpheader;


  let headerSplit =  Trumpheader.split(" ");
  console.log(headerSplit);

  for (let i = 0; i < headerSplit.length; i++) {
    // console.log(allDecSplit[i]);
    addElementHeader(headerSplit[i]+ " ",("headerSpan"+i));
  }

  for (let i = 0; i < 26; i++) {
  allDec = allDec + " " + allDecleration[i+1];
  }

  let allDecSplit = allDec.split(" ");

  for (let i = 0; i < allDecSplit.length; i++) {
    // console.log(allDecSplit[i]);
    addElement(allDecSplit[i]+ " ",("span"+i));
  }



  socket.on('sendAntonym', function(antonyms){
    // let seqarr = steps;
    // console.log('new array recieved from server - steps', antonyms);
    antonymRecieved = antonyms;
    if (antonymRecieved[0] != undefined){
      let thisstr = document.getElementById(currSpanID).innerHTML;
      var result = thisstr.strike();

      document.getElementById(currSpanID).innerHTML = result + "  " + antonymRecieved[0] + " ";
    }

  });
}




function clickSpan(e){
  let word = e.target.innerHTML;
  // let checkedNewPeriod = word.replace(/\./g, "");
  // let checkedNewComa = checkedNewPeriod.replace(/\,/g, "");
  let checkedWord = word.replace(/[^A-Za-z0-9]/g, ' ');
  // console.log(checkedWord);
  currSpanID = e.target.id;
  socket.emit('sendGesture', {'Data': "currCell", 'wordsToflip': checkedWord});
}


function addElement (content, spanID) {
  // create a new span element
  var newSpan = document.createElement("span");
  newSpan.id = spanID ;
  // and give it some content
  var newContent = document.createTextNode(content);
  // add the text node to the newly created div
  newSpan.appendChild(newContent);
  // add the newly created element and its content into the DOM
  var currentSpan = document.getElementById("div1");
  document.getElementById('spanDIVS').appendChild(newSpan);
  // document.body.insertBefore(newSpan, currentSpan);
  newSpan.addEventListener('click', clickSpan);
}

function addElementHeader (content, spanID) {
  // create a new span element
  var newSpan = document.createElement("span");
  newSpan.id = spanID ;
  // and give it some content
  var newContent = document.createTextNode(content);
  // add the text node to the newly created div
  newSpan.appendChild(newContent);
  // add the newly created element and its content into the DOM
  var currentSpan = document.getElementById("div1");
  document.getElementById('header').appendChild(newSpan);
  // document.body.insertBefore(newSpan, currentSpan);
  newSpan.addEventListener('click', clickSpan);
}
