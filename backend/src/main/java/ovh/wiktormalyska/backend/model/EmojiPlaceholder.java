package ovh.wiktormalyska.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "emoji_placeholders")
public class EmojiPlaceholder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String emoji;

    @Enumerated(EnumType.STRING)
    private Rarity rarity;

    public enum Rarity {
        COMMON,
        RARE,
        EPIC,
        CYBERPSYCHOSIS
    }
}
