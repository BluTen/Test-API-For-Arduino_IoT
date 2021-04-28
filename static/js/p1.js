var timeoutID = 0;
var textInput = document.getElementById("TEXT");
var sendButton = document.getElementById("Button");
var input_value = "";


textInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        sendButton.click();
    }
});

/**
 * Sends a Message
 * 
 * @return {void} Nothing
 */
function sendMessage() {
    if (!inputValidate()) return;
    textInput.disabled = true;
    sendButton.classList.add("disabled");
    input_value = textInput.value;
    textInput.value = "";
    textInput.placeholder = "Wait...";
    sendRequest("/p1/api/message", { "text": input_value }, "post");
    document.getElementById("loading-circle").style.display = "block";
    clearTimeout(timeoutID);
};

/**
 * @return {boolean} Checks if the textbox text is empty.
 */

function inputValidate() {
    var input = textInput.value;
    if (input.length === 0) {
        messageBubble("Can't Send empty Message");
        return false;
    };
    return true;
};

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method] the method to use on the form
 */

function sendRequest(path, params, method) {
    var xhr = new XMLHttpRequest();
    var loader = document.getElementById("loading-circle");

    if (method.toUpperCase() === "POST") {
        console.log("* Sending POST Request...")
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status < 300 && this.status >= 200) {
                loader.style.display = "none";
                textInput.value = input_value;
                textInput.placeholder = "Your Message";
                textInput.disabled = false;
                sendButton.classList.remove("disabled");
                messageBubble("Message Sent");
                console.log(
                    "* Recived POST request response code: " + this.status +
                    ", With response text: \n\"" + this.responseText + "\"\n"
                )
            } else if (this.readyState == 4) {
                loader.style.display = "none";
                messageBubble("Message Not Sent");
                textInput.value = input_value;
                textInput.placeholder = "Your Message";
                textInput.disabled = false;
                sendButton.classList.remove("disabled");
                console.log(
                    "* Recived POST request response code: " + this.status +
                    ", With response text: \n\"" + this.responseText + "\"\n"
                )
            };
        };
        xhr.open("POST", path, true);
        xhr.setRequestHeader(
            "Content-type", "application/x-www-form-urlencoded"
        );
        var data = "";
        for (const key in params) {
            data += encodeURI(key) + "=" + encodeURI(params[key]) + "&"

        }
        data = data.slice(0, data.length - 1);
        xhr.send(data);
        console.log(
            "* Sent POST request, waiting for response..."
        )
    }
};

/**
 *
 * @param {String} text The message for the bubble
 */
function messageBubble(text) {
    var pop_up = document.getElementById("pop_up");
    pop_up.innerHTML = text;
    pop_up.style.display = "none";
    setTimeout(() => {
        pop_up.style.display = "block";
    }, 10);
    // elem.style.display = "block";
    // elem.innerHTML = text
    // elem.classList.remove("pop-up");
    // void elem.offsetWidth;
    // elem.classList.add("pop-up");
    // elem.style.display = "none";
    // elem.innerHTML = text;
    // elem.style.display = "block";
    // console.log("elem block");

};