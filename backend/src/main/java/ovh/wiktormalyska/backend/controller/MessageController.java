package ovh.wiktormalyska.backend.controller;

import ovh.wiktormalyska.backend.model.Message;
import ovh.wiktormalyska.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable Long id) {
        return messageService.getMessageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Message> createMessage(@RequestParam String content, @RequestParam Long senderId, @RequestParam Long receiverId) {
        try {
            Message message = messageService.createMessage(content, senderId, receiverId);
            return ResponseEntity.ok(message);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/sent/{senderId}")
    public List<Message> getMessagesBySenderId(@PathVariable Long senderId) {
        return messageService.getMessagesBySenderId(senderId);
    }

    @GetMapping("/received/{receiverId}")
    public List<Message> getMessagesByReceiverId(@PathVariable Long receiverId) {
        return messageService.getMessagesByReceiverId(receiverId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        try {
            messageService.deleteMessage(id);
            return ResponseEntity.noContent().build();
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}