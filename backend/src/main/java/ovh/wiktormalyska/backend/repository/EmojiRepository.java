package ovh.wiktormalyska.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ovh.wiktormalyska.backend.model.Emoji;

import java.util.List;
import java.util.Optional;

public interface EmojiRepository extends JpaRepository<Emoji, Long> {
    List<Emoji> findByRarity(Emoji.Rarity rarity);
    Optional<Emoji> findById(Long id);

}
