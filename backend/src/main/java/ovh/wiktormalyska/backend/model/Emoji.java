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
@Table(name = "emojis")
public class Emoji {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String shortcode;

    private String unicode;

    @Enumerated(EnumType.STRING)
    private Rarity rarity;

    public enum Rarity {
        COMMON,
        RARE,
        EPIC,
        CYBERPSYCHOSIS
    }
}
