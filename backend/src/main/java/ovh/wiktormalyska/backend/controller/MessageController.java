package ovh.wiktormalyska.backend.controller;

import ovh.wiktormalyska.backend.dto.MessageDto;
import ovh.wiktormalyska.backend.model.Message;
import ovh.wiktormalyska.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
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
    public List<Message> getAllMessages(@RequestParam(defaultValue = "100") int limit) {
        int finalLimit = Math.min(limit, 100);
        Pageable pageable = PageRequest.of(0, finalLimit);
        return messageService.getAllMessages(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable Long id) {
        return messageService.getMessageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Message> createMessage(@RequestBody MessageDto messageDto) {
        try {
            Message message = messageService.createMessage(
                    messageDto.getContent(),
                    messageDto.getSenderId(),
                    messageDto.getChatId()
            );
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