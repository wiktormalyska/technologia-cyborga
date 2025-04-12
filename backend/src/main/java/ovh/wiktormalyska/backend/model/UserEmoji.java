package ovh.wiktormalyska.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "user_emojis")
public class UserEmoji {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "emoji_id", referencedColumnName = "id")
    private Emoji emoji;

    @Column(nullable = false)
    private LocalDateTime unlockedAt;

}
