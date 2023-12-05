const sendButton = document.getElementById('sendButton');
const inputField = document.getElementById('textInput');
const responseContainer = document.getElementById('response');

sendButton.addEventListener('click', function() {
    const userInput = inputField.value;
    //console.log("User input: ", userInput);
    askQuestion(userInput);
    inputField.value = '';
});

function askQuestion(question) {
    //console.log("Asking question: ", question);
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        console: JSON.stringify({ prompt: question }),
        body: JSON.stringify({ prompt: question })
    })
    .then(response => response.json())
    .then(data => {
        displayResponse(data);
    }).catch(err => {
        console.error(err);
    });
}

function displayResponse(text) {
  //console.log("Bot response: ", text);
  let responseText = text.bot;
  speakText(responseText);

  responseContainer.innerText = responseText;
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        var sentences = text.split('.');
        
        sentences.forEach(function(sentence) {
            sentence = sentence.trim();
            
            if (sentence) {
                var utterance = new SpeechSynthesisUtterance(sentence);
                utterance.lang = 'en-US';
                utterance.rate = 1;
                utterance.pitch = 1;
                window.speechSynthesis.speak(utterance);
            }
        });
    } else {
        console.error('Text-to-speech not supported.');
    }
}



if ('webkitSpeechRecognition' in window) {
  var recognition = new webkitSpeechRecognition();

  recognition.continuous = false; 
  recognition.interimResults = true;
  recognition.onresult = function(event) {
      var transcript = event.results[0][0].transcript;
      document.getElementById('textInput').value = transcript;
  };

  recognition.onstart = function() {
      console.log("Voice recognition started. Speak into the microphone.");
  };

  recognition.onerror = function(event) {
      console.log("Error occurred in recognition: " + event.error);
  };

  function startListening() {
    //console.log("startListening");
    recognition.start();
  }
  document.getElementById('speakButton').addEventListener('click', startListening);

} else {
  console.error("Speech recognition not supported in this browser.");
}

