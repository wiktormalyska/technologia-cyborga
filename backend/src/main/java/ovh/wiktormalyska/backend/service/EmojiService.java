package ovh.wiktormalyska.backend.service;

import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.model.Emoji;
import ovh.wiktormalyska.backend.repository.EmojiRepository;

import java.util.List;

@Service
public class EmojiService {
    private final EmojiRepository emojiRepository;

    public EmojiService(EmojiRepository emojiRepository) {
        this.emojiRepository = emojiRepository;
    }
    public List<Emoji> getAll() {
        return emojiRepository.findAll();
    }

    public List<Emoji> getByRarity(Emoji.Rarity rarity) {
        return emojiRepository.findByRarity(rarity);
    }

    public Emoji save(Emoji emoji) {
        return emojiRepository.save(emoji);
    }
}
