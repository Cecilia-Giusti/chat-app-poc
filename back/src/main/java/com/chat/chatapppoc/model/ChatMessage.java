package com.chat.chatapppoc.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Model representing a chat message.
 */
@Setter
@Getter
@Builder
public class ChatMessage {
    private String sender;
    private String content;
    private MessageType type;

    /**
     * Enum for the type of chat message.
     */
    public enum MessageType {
        CHAT, JOIN, LEAVE
    }
}
