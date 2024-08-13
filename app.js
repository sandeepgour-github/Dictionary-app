const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let word = document.getElementById("inp-word");
let btn = document.getElementById("btn");
let mice = document.getElementById("mice");
let result = document.getElementById("result-box");
let audio = document.createElement("audio");
let autoplay = document.createAttribute("autoplay");
let src = document.createAttribute("src");
mice.addEventListener("click", () => {
  let recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";
  recognition.addEventListener("result", (event) => {
    word.value = event.results[0][0].transcript;
  });
  recognition.start();
});
btn.addEventListener("click", () => {
  fetch(`${url + word.value}`).then((response) => {
    response
      .json()
      .then((data) => {
        // console.log(data[0].word);
        // console.log(data[0].meanings[0].definitions[0].definition);
        // console.log(`audio: ${data[0].phonetics[0].audio}`);
        let i, j;
        if (word.value === "hello" || word.value === "Hello") {
          i = 1;
          j = 2;
        } else {
          i = 0;
          j = 0;
        }
        result.innerHTML = `
      <div class="word">
          <span id="btn2"><i class="fa-solid fa-volume-high"></i></span>
          <h3>${word.value}</h3>
        </div>
        <div class="details">
           <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>${data[0].phonetics[i].text}</p>
        </div>
        <p class="word-meaning">
         Meaning: ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
           Example: ${data[0].meanings[j].definitions[0].example}
        </p>`;
        let btn2 = document.getElementById("btn2");
        console.log(btn2);
        btn2.addEventListener("click", () => {
          audio.setAttribute("autoplay", "null");
          audio.setAttribute("src", data[0].phonetics[0].audio);
        });
      })
      .catch((error) => {
        result.innerHTML = `<div class="error-box"><h3>Couldn't find the word</h3></div>`;
      });
  });
});
