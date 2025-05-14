package ovh.wiktormalyska.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.dto.ItemShopDto;
import ovh.wiktormalyska.backend.dto.PurchaseResponseDto;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.repository.UserRepository;
import ovh.wiktormalyska.backend.model.Emoji;
import ovh.wiktormalyska.backend.model.UserEmoji;
import ovh.wiktormalyska.backend.repository.EmojiRepository;
import ovh.wiktormalyska.backend.repository.UserEmojiRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MarketplaceService {
    private final EmojiRepository emojiRepository;
    private final UserRepository userRepository;
    private final UserEmojiRepository userEmojiRepository;

    @Autowired
    public MarketplaceService(EmojiRepository emojiRepository, UserRepository userRepository, UserEmojiRepository userEmojiRepository) {
        this.emojiRepository = emojiRepository;
        this.userRepository = userRepository;
        this.userEmojiRepository = userEmojiRepository;
    }

    public List<ItemShopDto> getAvailableItems() {
        return emojiRepository.findAll().stream()
                .map(e -> new ItemShopDto(e.getId(), e.getEmoji(), e.getRarity(), getPriceForRarity(e.getRarity())))
                .collect(Collectors.toList());
    }

    private int getPriceForRarity(Emoji.Rarity rarity) {
        return switch (rarity) {
            case COMMON -> 100;
            case RARE -> 250;
            case EPIC -> 500;
            case CYBERPSYCHOSIS -> 1000;
        };
    }

    public PurchaseResponseDto purchaseEmoji(Long userId, Long emojiId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Emoji> emojiOpt = emojiRepository.findById(emojiId);

        if (userOpt.isEmpty() || emojiOpt.isEmpty()) {
            return new PurchaseResponseDto(false, "User or emoji not found");
        }

        User user = userOpt.get();
        Emoji emoji = emojiOpt.get();

        int price = getPriceForRarity(emoji.getRarity());
        if (user.getBalance() < price) {
            return new PurchaseResponseDto(false, "Insufficient balance");
        }

        user.setBalance(user.getBalance() - price);
        userRepository.save(user);

        UserEmoji userEmoji = UserEmoji.builder()
                .user(user)
                .emoji(emoji)
                .unlockedAt(LocalDateTime.now())
                .build();

        userEmojiRepository.save(userEmoji);

        return new PurchaseResponseDto(true, "Purchase successful");
    }
}