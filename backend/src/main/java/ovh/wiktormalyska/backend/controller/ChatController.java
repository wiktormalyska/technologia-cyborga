package ovh.wiktormalyska.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ovh.wiktormalyska.backend.dto.ChatDto;
import ovh.wiktormalyska.backend.model.Chat;
import ovh.wiktormalyska.backend.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    final
    ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping
    List<Chat> getAllChats() {
        return chatService.getAllChats();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Chat> getChatsByUserId(@PathVariable Long userId) {
        return chatService.getChatsByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getChat")
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

    @DeleteMapping("/{chatId}")
    public ResponseEntity<Void> deleteChat(@PathVariable Long chatId) {
        try {
            chatService.deleteChat(chatId);
            return ResponseEntity.noContent().build();
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
