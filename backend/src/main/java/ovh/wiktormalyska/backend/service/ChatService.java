package ovh.wiktormalyska.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.model.Chat;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.repository.ChatRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;


    @Autowired
    public ChatService(ChatRepository chatRepository, UserRepository userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    public List<Chat> getAllChats() {
        return chatRepository.findAll();
    }

    public Optional<Chat> getChatsByUserId(long userId) {
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
                .user1(user2)
                .createdAt(LocalDateTime.now())
                .build();

        return chatRepository.save(chat);
    }

    public void deleteChat(Long chatId) {
        if(!chatRepository.existsById(chatId)) {
            throw new IllegalArgumentException("Chat with ID " + chatId + " not found");
        }
        chatRepository.deleteById(chatId);
    }

    public List<Chat> getChatsAfterDate(LocalDateTime date) {
        return chatRepository.findByCreatedAtAfter(date);
    }


}
