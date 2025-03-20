package ovh.wiktormalyska.backend.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import ovh.wiktormalyska.backend.model.Chat;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.repository.ChatRepository;
import ovh.wiktormalyska.backend.repository.MessageRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;


    @Autowired
    public ChatService(ChatRepository chatRepository, UserRepository userRepository, MessageRepository messageRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }

    public List<Chat> getAllChats(Pageable pageable) {
        return chatRepository.findAll(pageable).getContent();
    }

    public Optional<Chat> getChatById(Long id) {
        return chatRepository.findById(id);
    }

    public Optional<List<Chat>> getChatsByUserId(long userId) {
            return chatRepository.findByUserId(userId);
    }

    public Optional<Chat> getChatBetweenUsers(Long user1Id, Long user2Id) {
        return chatRepository.findChatBetweenUsers(user1Id, user2Id);
    }

    public Chat createChat(Long user1Id, Long user2Id) {

        Optional<Chat> existingChat = chatRepository.findChatBetweenUsers(user1Id, user2Id);

        if (existingChat.isPresent()) {
            return existingChat.get();
        }

        User user1 = userRepository.findById(user1Id).orElseThrow(() -> new IllegalArgumentException("User with ID " + user1Id + " not found"));
        User user2 = userRepository.findById(user2Id).orElseThrow(() -> new IllegalArgumentException("User with ID " + user2Id + " not found"));

        Chat chat = Chat.builder()
                .user1(user1)
                .user2(user2)
                .createdAt(LocalDateTime.now())
                .build();

        return chatRepository.save(chat);
    }

    @Transactional
    public void deleteChat(Long chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new IllegalArgumentException("Chat with ID " + chatId + " not found"));
        messageRepository.deleteByChatId(chatId);
        chatRepository.delete(chat);
    }

    public List<Chat> getChatsAfterDate(LocalDateTime date) {
        return chatRepository.findByCreatedAtAfter(date);
    }


}
