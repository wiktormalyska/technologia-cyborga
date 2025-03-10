package ovh.wiktormalyska.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import ovh.wiktormalyska.backend.model.Chat;
import ovh.wiktormalyska.backend.model.Message;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.repository.ChatRepository;
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
    private final ChatRepository chatRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository, UserRepository userRepository, ChatRepository chatRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }

    public Message createMessage(String content, Long senderId, Long chatId) {
        User sender = userRepository.findById(senderId).orElseThrow(() -> new IllegalArgumentException("Sender not found"));
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new IllegalArgumentException("Chat not found"));

        Message message = Message.builder()
                .content(content)
                .sender(sender)
                .chat(chat)
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


    public List<Message> getMessagesByChatId(Long chatId) {
        return messageRepository.findByChatId(chatId);
    }
}