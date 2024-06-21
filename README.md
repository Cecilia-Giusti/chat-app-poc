# Chat Application POC

This project is a Proof of Concept (POC) for a real-time chat application using WebSocket, STOMP, and SockJS. It includes a backend implemented with Spring Boot and a frontend using plain HTML, CSS, and JavaScript.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
-   [Usage](#usage)
-   [License](#license)

## Features

-   Real-time messaging with WebSocket and STOMP.
-   User joins and leaves notifications.
-   Simple UI for entering a username and sending messages.

## Technologies Used

-   **Backend:** Java, Spring Boot, WebSocket, STOMP
-   **Frontend:** HTML, CSS, JavaScript, SockJS, STOMP.js
-   **Build Tool:** Maven

## Getting Started

### Prerequisites

-   Java 8 or higher
-   Maven

### Installation

1.  **Clone the repository:**
    
 
	   ` git clone https://github.com/your-username/chat-application-poc.git
	    cd chat-application-poc` 
    
2.  **Build and run the backend:**
    
    `cd backend
    mvn clean install
    mvn spring-boot:run` 
    
3.  **Serve the frontend:** Simply open the `frontend/index.html` file in your browser.

## Usage

1.  Open your browser and navigate to `http://localhost:8080`.
2.  Enter your username and start chatting.
