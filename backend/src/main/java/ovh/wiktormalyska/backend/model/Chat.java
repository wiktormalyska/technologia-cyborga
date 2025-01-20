package ovh.wiktormalyska.backend.model;

import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name="chats")
public class Chat {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user1_id", nullable = false)
    private User user1;

    @ManyToOne
    @JoinColumn(name = "user2_id", nullable = false)
    private User user2;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    protected void onCreate(){
        createdAt = LocalDateTime.now();
    }

}
