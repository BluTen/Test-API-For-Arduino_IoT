document.getElementById("TEXT")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("ButtoN").click();
        }
    });

/**
 * Sends a Message
 * 
 * @return {void} Nothing
 */
function sendMessage() {
    if (!inputValidate()) return;
    var input = document.getElementById("TEXT").value;
    sendRequest("p1/api/message", { "text": input }, "post");
    var element = document.getElementById("loading-circle");
    element.style.display = "block";
};

/**
 * @return {boolean} Checks if the textbox text is empty.
 */

function inputValidate() {
    var input = document.getElementById("TEXT").value;
    if (input.length === 0) {
        messageBubble("Can't Send empty Message");
        return false
    }
    return true
};

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method] the method to use on the form
 */

function sendRequest(path, params, method) {

    var xhr = new XMLHttpRequest();
    if (method.toUpperCase() === "POST") {
        console.log("* Sending POST Request...")
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var element = document.getElementById("loading-circle");
                element.style.display = "none";
                messageBubble("Message Sent");
                console.log(
                    "* Recived POST request response code: " + this.status +
                    ", With response text: \"" + this.statusText + "\"\n"
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
    var elem = document.getElementById("pop_up");
    elem.innerHTML = text;
    elem.style.display = "none";
    elem.style.display = "block";
    setTimeout(() => { elem.style.display = "none"; }, 5000);
};