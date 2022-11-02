// Asynchronous JavaScript

// Set simple timeout
setTimeout(callback1, 1000);
function callback1() {
    console.log("Callback 1");
}

// Set timeout with arguments
setTimeout(callback2, 1000, "Callback", "called");
function callback2(arg1, arg2) {
    console.log(arg1 + " " + arg2);
}

// Set interval
setInterval(callback3, 1000);
function callback3() {
    console.log("Interval");
}

// Waiting for the page load using XMLHttpRequest and onload event
function fullyLoaded(someText) {
    console.log('The page is fully loaded');
    console.log('Response: ' + someText);
}

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true);
xhr.onload = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        fullyLoaded(xhr.responseText);
    } else {
        console.error(xhr.statusText);
    }
}
xhr.send();

// Set the timeout using Promise
const myPromise = new Promise(function(resolve, _) {
    setTimeout(function(){ resolve("Promise resolved in 3 seconds"); }, 3000);
});

myPromise.then(function(value) {
    // noinspection JSValidateTypes
    document.getElementById("demo").innerHTML = value;
});

// Re-implement the previous example with the Promise and fetch() function
function fetchAsync(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.text())
            .then(text => resolve(text))
            .catch(err => reject(err))
    });
}

fetchAsync("https://jsonplaceholder.typicode.com/todos/1")
    .then(data => console.log(data))
    .catch(reason => console.log(reason.message));
