package ovh.wiktormalyska.backend.service;
import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.model.EmojiPlaceholder;
import ovh.wiktormalyska.backend.repository.EmojiPlaceholderRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmojiPlaceholderService {
    private final EmojiPlaceholderRepository repository;

    public EmojiPlaceholderService(EmojiPlaceholderRepository repository) {
        this.repository = repository;
    }

    public List<EmojiPlaceholder> getAll() {
        return repository.findAll();
    }

    public Optional<EmojiPlaceholder> getByName(String name) {
        return repository.findByName(name);
    }

    public Optional<EmojiPlaceholder> getById(Long id) {
        return repository.findById(id);
    }

    public List<EmojiPlaceholder> getByRarity(EmojiPlaceholder.Rarity rarity) {
        return repository.findByRarity(rarity);
    }
}