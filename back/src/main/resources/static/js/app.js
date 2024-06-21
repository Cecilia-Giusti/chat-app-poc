'use strict';

const usernamePage = document.querySelector('#username-page');
const chatPage = document.querySelector('#chat-page');
const usernameForm = document.querySelector('#usernameForm');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#message');
const messageArea = document.querySelector('#messageArea');
const connectingElement = document.querySelector('.connecting');

let stompClient = null;
let username = null;

const colors = [
    '#9682f3', '#45c75c', '#d1d445', '#ff4558',
    '#ffa22f', '#abff5d', '#ff5d21', '#48bb8b'
];

/**
 * Connects to the WebSocket server with the provided username.
 * @param {Event} event - The event object from the form submission.
 */
function connect(event) {
    username = document.querySelector('#name').value.trim();

    if (username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        const socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

/**
 * Callback function called when the client successfully connects to the WebSocket server.
 */
function onConnected() {

    stompClient.subscribe('/topic/public', onMessageReceived);

    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({ sender: username, type: 'JOIN' })
    );

    connectingElement.classList.add('hidden');
}

/**
 * Callback function called when there's an error connecting to the WebSocket server.
 */
function onError() {
    connectingElement.textContent = 'Impossible de se connecter au serveur WebSocket. Veuillez actualiser cette page pour réessayer!';
    connectingElement.style.color = 'red';
}

/**
 * Sends a message to the WebSocket server.
 * @param {Event} event - The event object from the form submission.
 */
function sendMessage(event) {
    const messageContent = messageInput.value.trim();
    if (messageContent && stompClient) {
        const chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

/**
 * Callback function called when a message is received from the WebSocket server.
 * @param {Object} payload - The message payload received from the server.
 */
function onMessageReceived(payload) {
    const message = JSON.parse(payload.body);

    const messageElement = document.createElement('li');

    if (message.type !== 'JOIN' && message.type !== 'LEAVE') {
        messageElement.classList.add('chat-message');

        const usernameElement = document.createElement('span');
        usernameElement.classList.add('username');
        const usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);

        const messageTextElement = document.createElement('div');
        messageTextElement.classList.add('message-content');
        const messageText = document.createTextNode(message.content);
        messageTextElement.appendChild(messageText);

        messageElement.appendChild(usernameElement);
        messageElement.appendChild(messageTextElement);
    }

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

usernameForm.addEventListener('submit', connect, true);
messageForm.addEventListener('submit', sendMessage, true);
