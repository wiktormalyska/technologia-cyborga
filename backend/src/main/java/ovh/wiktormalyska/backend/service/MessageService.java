package ovh.wiktormalyska.backend.service;

import ovh.wiktormalyska.backend.model.Message;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.repository.MessageRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public MessageService(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }

    public Message createMessage(String content, Long senderId, Long receiverId) {
        User sender = userRepository.findById(senderId).orElseThrow(() -> new IllegalArgumentException("Sender not found"));
        User receiver = userRepository.findById(receiverId).orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

        Message message = Message.builder()
                .content(content)
                .sender(sender)
                .receiver(receiver)
                .timestamp(LocalDateTime.now())
                .build();
        return messageRepository.save(message);
    }

    public void deleteMessage(Long id) {
        if (!messageRepository.existsById(id)) {
            throw new IllegalArgumentException("Message not found");
        }

        messageRepository.deleteById(id);
    }

    public List<Message> getMessagesBySenderId(Long senderId) {
        return messageRepository.findBySenderId(senderId);
    }

    public List<Message> getMessagesByReceiverId(Long receiverId) {
        return messageRepository.findByReceiverId(receiverId);
    }
}