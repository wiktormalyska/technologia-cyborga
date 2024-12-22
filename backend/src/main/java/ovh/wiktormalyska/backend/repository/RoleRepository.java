package ovh.wiktormalyska.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ovh.wiktormalyska.backend.model.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
