package ovh.wiktormalyska.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ovh.wiktormalyska.backend.dto.ChatDto;
import ovh.wiktormalyska.backend.dto.MessageDto;
import ovh.wiktormalyska.backend.model.Chat;
import ovh.wiktormalyska.backend.model.Message;
import ovh.wiktormalyska.backend.service.ChatService;
import ovh.wiktormalyska.backend.service.MessageService;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {
    private final ChatService chatService;
    private final MessageService messageService;

    @Autowired
    public ChatController(ChatService chatService, MessageService messageService) {
        this.chatService = chatService;
        this.messageService = messageService;
    }

    @GetMapping
    List<Chat> getAllChats() {
        return chatService.getAllChats();
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<Chat> getChatById(@PathVariable("chatId") Long chatId) {
        return chatService.getChatById(chatId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/getUserChat")
    public ResponseEntity<Chat> getChatBetweenUsers(@RequestBody ChatDto chatDto) {
        return chatService.getChatBetweenUsers(chatDto.getUser1Id(), chatDto.getUser2Id())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/createChat")
    public ResponseEntity<Chat> createChat(@RequestBody ChatDto chatDto) {
        try {
            Chat chat = chatService.createChat(chatDto.getUser1Id(), chatDto.getUser2Id());
            return ResponseEntity.ok().body(chat);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/delete/{chatId}")
    public ResponseEntity<Void> deleteChat(@PathVariable("chatId") Long chatId) {
        try {
            chatService.deleteChat(chatId);
            return ResponseEntity.noContent().build();
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{chatId}/messages")
    public ResponseEntity<List<Message>> getMessagesByChatId(@PathVariable("chatId") Long chatId) {
        List<Message> messages = messageService.getMessagesByChatId(chatId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/{chatId}/message")
    public ResponseEntity<Message> sendMessage(@PathVariable("chatId") Long chatId, @RequestBody MessageDto messageDto) {
        Message message = messageService.createMessage(messageDto.getContent(), messageDto.getSenderId(), chatId );
        return ResponseEntity.status(HttpStatus.CREATED).body(message);
    }
}
