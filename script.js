const chatArea = document.getElementById("chatArea");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const newChatButton = document.getElementById("newChat");
const welcome = document.getElementById("welcome");
const suggestions = document.querySelectorAll(".suggestions button");


// =========================
// ADD MESSAGE
// =========================

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;

    const avatar = type === "user" ? "👤" : "✦";

    message.innerHTML = `
        <div class="message-avatar">
            ${avatar}
        </div>

        <div class="message-content">
            ${escapeHTML(text)}
        </div>
    `;

    chatArea.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;
}


// =========================
// ESCAPE HTML
// =========================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// =========================
// SEND MESSAGE
// =========================

function sendMessage() {

    const text = messageInput.value.trim();

    if (!text) return;

    // Hide welcome screen
    welcome.style.display = "none";

    // Add user message
    addMessage(text, "user");

    // Clear input
    messageInput.value = "";

    // Temporary AI response
    showThinking();

    setTimeout(() => {

        removeThinking();

        addMessage(
            "Hello! I'm Nexora. 🚀\n\nMy AI brain isn't connected yet, but the chat system is working. Next we'll connect Nexora to an AI model.",
            "assistant"
        );

    }, 700);
}


// =========================
// THINKING INDICATOR
// =========================

function showThinking() {

    const thinking = document.createElement("div");

    thinking.id = "thinking";

    thinking.className = "message assistant";

    thinking.innerHTML = `
        <div class="message-avatar">
            ✦
        </div>

        <div class="message-content">
            Nexora is thinking...
        </div>
    `;

    chatArea.appendChild(thinking);

    chatArea.scrollTop = chatArea.scrollHeight;
}


function removeThinking() {

    const thinking =
        document.getElementById("thinking");

    if (thinking) {
        thinking.remove();
    }
}


// =========================
// ENTER TO SEND
// =========================

messageInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();
        }

    }
);


// =========================
// SEND BUTTON
// =========================

sendButton.addEventListener(
    "click",
    sendMessage
);


// =========================
// SUGGESTIONS
// =========================

suggestions.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            const prompt =
                button.getAttribute("data-prompt");

            if (!prompt) return;

            messageInput.value = prompt;

            messageInput.focus();
        }
    );

});


// =========================
// NEW CHAT
// =========================

newChatButton.addEventListener(
    "click",
    function() {

        chatArea.innerHTML = "";

        chatArea.appendChild(welcome);

        welcome.style.display = "flex";

        messageInput.value = "";

        messageInput.focus();
    }
);
