if (getParams(window.location.href)['redirect'] === '1') {
    messageBubble("Message Sent")
} else { document.getElementById('pop_up').style.display = "none" }

document.getElementById("TEXT")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("ButtoN").click();
        }
    });

/**
 * @param {String} url The URL To redirect
 * @return {null} Just gives a alert
 */

function input_validate(url) {
    var input = document.getElementById("TEXT").value;

    if (input.length === 0) {
        messageBubble("Can't Send empty Message")
    } else {
        post(url, { "text": input });
    }
};

/**
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
function getParams(url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};
/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 */

function post(path, params, method = 'post') {

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
};

/**
 *
 * @param {String} text The message for the bubble
 */
function messageBubble(text) {
    var opac = 0;
    var time = 0;
    var id = null;
    var elem = document.getElementById("pop_up");
    elem.style.display = "block";
    elem.style.opacity = 0;
    elem.innerHTML = text
    clearInterval(id);
    id = setInterval(frame, 10);

    function frame() {
        if (time === 4000) {
            clearInterval(id)
            console.log("yes")
        } else if (time >= 0 && time < 500) {
            // if (time && 100 != 0) {
            opac = (time / 100) * 2;
            opac = opac.toString();
            var temp = opac.split(".");
            if (temp[1]) {
                opac = temp[0] + temp[1]
            } else {
                opac = temp[0]
            }
            console.log("." + opac);
            elem.style.opacity = "." + opac;
            // }
        } else if (time >= 3500) {
            if (opac != 10) {
                opac -= 2;
                console.log("." + opac);
                elem.style.opacity = "." + opac;
            } else if (opac == 10) {
                elem.style.opacity = "0"
            }
        }
        time += 10;
    }
};