const questions = [
    "Hey! How's your day going?",
    "What’s new with you?",
    "How have you been?",
    "Anything exciting happen today?",
    "What’s been on your mind lately?",
    "Hope you're having a good day! What’s up?",
    "What’s a little secret you don’t mind sharing?",
    "Have you been daydreaming about something (or someone)?",
    "Did anything make you smile today?",
    "How’s everything going for you?",
    "Feeling motivated or just vibing today?",
    "What’s something small that made your day better?",
    "What’s something good that happened today?",
    "How are things with you?",
    "Is there anything you’re looking forward to?",
    "How’s life treating you?",
    "What’s been keeping you busy?",
    "Hope today’s been kind to you! How are you feeling?"
];

let controller = new AbortController();
let isSending = false;
let loadingTimeout;

document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        cancelMessage();
    }
});

async function sendMessage() {
    let userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;
    let sendButton = document.getElementById("sendButton");

    sendButton.onclick = cancelMessage;
    sendButton.className = "fa-solid fa-square";
    sendButton.innerHTML = " ";
    sendButton.style.fontSize = "17px";
    sendButton.style.height = "40px";
    sendButton.style.backgroundColor = "#0f9ad6";

    document.getElementById("userInput").value = "";
    let chatbox = document.getElementById("chatbox");
    let userBubble = document.createElement("div");
    userBubble.classList.add("chat-container");
    userBubble.innerHTML = `<div class="chat-bubble">${createTypingEffect(userInput)}</div>`;
    chatbox.appendChild(userBubble);
    scrollToBottom();

    loadingTimeout = setTimeout(() => {
        let loadingBubble = document.createElement("div");
        loadingBubble.classList.add("bot-container", "loading-bubble");
        loadingBubble.id = "loadingBubble";
        loadingBubble.innerHTML = `<div class="bot-bubble">
            <i class="fa-solid fa-circle fa-bounce fa-xs"></i>
            <i class="fa-solid fa-circle fa-bounce fa-xs" style="animation-delay: 0.2s;"></i>
            <i class="fa-solid fa-circle fa-bounce fa-xs" style="animation-delay: 0.4s;"></i>
        </div>`;
        chatbox.appendChild(loadingBubble);
        scrollToBottom();
    }, 1000);

    try {
        controller = new AbortController();
        isSending = true;
        let response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userInput }),
            signal: controller.signal
        });
        clearTimeout(loadingTimeout);
        isSending = false;
        document.getElementById("loadingBubble").remove();
        let data = await response.json();
        let botBubble = document.createElement("div");
        botBubble.classList.add("bot-container");
        botBubble.innerHTML = `<div class="bot-bubble">${createTypingEffect(data.reply)}</div>`;
        chatbox.appendChild(botBubble);
        scrollToBottom();
        sendButton.className = "fas";
        sendButton.innerHTML = "&#xf062;";
        sendButton.onclick = sendMessage;
        sendButton.removeAttribute("style");
    } catch (error) {
        clearTimeout(loadingTimeout);
        if (error.name === 'AbortError') {
            setTimeout(() => {
                let loadingBubble = document.getElementById("loadingBubble");
                if (loadingBubble) {
                    loadingBubble.remove();
                }
                let canceledBubble = document.createElement("div");
                canceledBubble.classList.add("bot-container");
                chatbox.appendChild(canceledBubble);
                scrollToBottom();
            }, 1000); 

        } else {
            let errorBubble = document.createElement("div");
            document.getElementById("loadingBubble").remove();
            errorBubble.classList.add("bot-container");
            errorBubble.innerHTML = `<div class="bot-bubble">${createTypingEffect("Error 521: server is down")}</div>`;
            chatbox.appendChild(errorBubble);
            scrollToBottom();
        }
        sendButton.className = "fas";
        sendButton.innerHTML = "&#xf062;";
        sendButton.onclick = sendMessage;
        sendButton.removeAttribute("style");
    }
}

function cancelMessage() {
    if (controller && isSending) {
        controller.abort();
        isSending = false;
        clearTimeout(loadingTimeout);
        setTimeout(() => {
            let loadingBubble = document.getElementById("loadingBubble");
            if (loadingBubble) {
                loadingBubble.remove();
            }
            let sendButton = document.getElementById("sendButton");
            sendButton.className = "fas";
            sendButton.innerHTML = "&#xf062;";
            sendButton.onclick = sendMessage;
            sendButton.removeAttribute("style");
        }, 1000); 
    }
}

function randomQuestion() {
    let randomIndex = Math.floor(Math.random() * questions.length);
    document.getElementById("title2").innerHTML = `<h3 style="color: rgb(73, 73, 73);">${questions[randomIndex]}</h3>`;
}

function scrollToBottom() {
    let chatbox = document.getElementById("chatbox");
    chatbox.scrollTop = chatbox.scrollHeight;
}

function createTypingEffect(text) {
    let lines = text.split('\n');
    return lines.map((line, index) => `<span style="animation-delay: ${index * 0.05}s">${line}</span>`).join('<br>');
}

window.onload = randomQuestion;

function themeChange () {
    

}