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
/// on page load do the next things:

$.ajax({
  url: "/GetGridSize",
  context: document.body
}).done(function(data) {

});

//on page load finish do the next things:

window.onload = function() {
  onLoad = true;
  // console.log("window_load");
};



function searchNoOne() {
  // wikiInputOne = document.getElementById("wikinumber01").value;
  // let term = wikiInputOne;
  // url = searchUrl + term;
  // // console.log("search01", url);
  // loadJSON1(url);
}

function onFocus() {
  wikiInputOne = document.getElementById("wikinumber01").value;
  let term = wikiInputOne;
  url = searchUrl + term;
  // loadJSON1(url);

  fetch(url)
  .then(response => response.json())
  .then(json => {
    searchResult1 = json[1][0];
    searchResult1discription = json[2][0];
    console.log(searchResult1, searchResult1discription);
  })
  .catch(err => console.log("promiseerror", err));

}


function searchNoTwo(){
  wikiInputTwo = document.getElementById("wikinumber02").value;
  let term = wikiInputTwo;
  url = searchUrl + term;
  // loadJSON2(url);

  fetch(url)
  .then(response => response.json())
  .then(json => {
    searchResult2 = json[1][0];
    searchResult2discription = json[2][0];
    console.log(searchResult2, searchResult2discription);
  }).then(refreshcontent2)
  .catch(err => console.log("promiseerror", err));

}


function refreshcontent2(){
  mixedContent();
}


function mixedContent(){

  document.getElementById("answerDiv").style.display = "block";

  //combine two topics
  let result = searchResult1.concat(searchResult2);
  let string = result.split("");
  string.sort(function(a, b){return 0.5 - Math.random()});
  let shortenedName = string.length = (Math.floor(Math.random() * 7) + 5 );
  // console.log(shortenedName);

  let combinedNameString = string.toString();
  combinedNameString = combinedNameString.replace(/#|,/g,'')
  let combinedNameStringLowercase = combinedNameString.toLowerCase();

  //remove first letter
  let combinedNameStringLowercaseWithout = combinedNameStringLowercase.substr(1);

  //get the first letter
  let firstLetter = combinedNameStringLowercase.charAt(0); // alerts 's'
  let firstLetterUpper = firstLetter.toUpperCase();
  // console.log(firstLetterUpper);

  let finalPar = firstLetterUpper+combinedNameStringLowercaseWithout;
  document.getElementById("mixedHeader").innerHTML = firstLetterUpper+combinedNameStringLowercaseWithout;
  // console.log("finalPar", finalPar);


//mix two topics

  let def1 = searchResult1discription;
  let res1 = def1.split(" ");

  let def2 = searchResult2discription;
  let res2 = def2.split(" ");

  //combine two arrays
  let combinedArrays = res1.concat(res2);


  combinedArrays.sort(function(a, b){return 0.5 - Math.random()});
  let shortPar = combinedArrays;
  combinedArrays.length = 50;
  let combinedString = combinedArrays.toString();
  combinedString = combinedString.toLowerCase();

  //remove first letter
  let combinedStringMinLetter = combinedString.substr(1);
  let firstLetterParagraph = combinedString.charAt(0); // alerts 's'
  let firstLetterParagraphUpper = firstLetter.toLowerCase();

  let newParagraphUpperLetter = firstLetterParagraphUpper + combinedStringMinLetter;



  let combinedNoComma = newParagraphUpperLetter;
  newParagraphUpperLetter = combinedNoComma.replace(/#|,/g,' ');
  // let combinedlowercase = combinedNoComma.toLowerCase();

  document.getElementById("mixedAnswer").innerHTML= "A " + finalPar + " " + "is " + newParagraphUpperLetter + ".";
}
