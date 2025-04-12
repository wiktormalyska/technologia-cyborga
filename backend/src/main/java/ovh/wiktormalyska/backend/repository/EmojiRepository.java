package ovh.wiktormalyska.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ovh.wiktormalyska.backend.model.Emoji;

import java.util.List;

public interface EmojiRepository extends JpaRepository<Emoji, Long> {
    List<Emoji> findByRarity(Emoji.Rarity rarity);
}
