package ovh.wiktormalyska.backend.service;

import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.dto.LoginDto;

@Service
public interface AuthService {
    String login(LoginDto loginDto);
}
