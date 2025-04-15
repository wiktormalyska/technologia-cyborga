package ovh.wiktormalyska.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ovh.wiktormalyska.backend.model.EmojiPlaceholder;

import java.util.List;
import java.util.Optional;

public interface EmojiPlaceholderRepository extends JpaRepository<EmojiPlaceholder, Long> {
    Optional<EmojiPlaceholder> findByName(String emoji);
    Optional<EmojiPlaceholder> findById(Long id);

    List<EmojiPlaceholder> findByRarity(EmojiPlaceholder.Rarity rarity);
}
