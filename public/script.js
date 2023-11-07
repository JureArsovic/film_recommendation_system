// Get the send button and input field elements from the DOM
const sendButton = document.getElementById('sendButton');
const inputField = document.getElementById('textInput');
const responseContainer = document.getElementById('response');

// Add a click event listener to the send button
sendButton.addEventListener('click', function() {
    const userInput = inputField.value;
    console.log("User input: ", userInput);
    askQuestion(userInput);
    inputField.value = '';
});

function askQuestion(question) {
    console.log("Asking question: ", question);
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
  console.log("Bot response: ", text);
  let responseText = text.bot;

  responseContainer.innerText = responseText;
}
