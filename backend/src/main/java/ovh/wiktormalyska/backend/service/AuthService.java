package ovh.wiktormalyska.backend.service;

import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.dto.LoginDto;
import ovh.wiktormalyska.backend.dto.RegisterDto;

@Service
public interface AuthService {
    String login(LoginDto loginDto);

    String register(RegisterDto registerDto);
}
