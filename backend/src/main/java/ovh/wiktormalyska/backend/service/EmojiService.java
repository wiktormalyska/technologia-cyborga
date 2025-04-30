package ovh.wiktormalyska.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.model.Emoji;
import ovh.wiktormalyska.backend.repository.EmojiRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmojiService {
    private final EmojiRepository emojiRepository;

    @Autowired
    public EmojiService(EmojiRepository emojiRepository) {
        this.emojiRepository = emojiRepository;
    }
    public List<Emoji> getAll() {
        return emojiRepository.findAll();
    }

    public Optional<Emoji> getById(Long id) {
        return emojiRepository.findById(id);
    }

    public List<Emoji> getByRarity(Emoji.Rarity rarity) {
        return emojiRepository.findByRarity(rarity);
    }

    public Emoji save(Emoji emoji) {
        return emojiRepository.save(emoji);
    }
}
