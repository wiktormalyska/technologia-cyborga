package ovh.wiktormalyska.backend.dto;

import lombok.Builder;
import lombok.Getter;
import ovh.wiktormalyska.backend.model.Role;

import java.util.Set;

@Builder
@Getter
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private Set<Role> roles;
    private String profileImagePath;
}
