package ovh.wiktormalyska.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ovh.wiktormalyska.backend.model.Chat;
import ovh.wiktormalyska.backend.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    ChatService chatService;

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

    @GetMapping("/{user1Id}/{user2Id}")
    public ResponseEntity<Chat> getChatBetweenUsers(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        return chatService.getChatBetweenUsers(user1Id, user2Id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/createChat/{user1Id}/{user2Id}")
    public ResponseEntity<Chat> createChat(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        try {
            Chat chat = chatService.createChat(user1Id, user2Id);
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
