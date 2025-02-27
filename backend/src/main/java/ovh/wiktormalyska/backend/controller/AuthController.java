package ovh.wiktormalyska.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ovh.wiktormalyska.backend.dto.AuthResponseDto;
import ovh.wiktormalyska.backend.dto.LoginDto;
import ovh.wiktormalyska.backend.dto.RegisterDto;
import ovh.wiktormalyska.backend.service.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
        String token = authService.login(loginDto);

        AuthResponseDto authResponseDto = new AuthResponseDto();
        authResponseDto.setAccessToken(token);

        System.out.println("User logged in:" + loginDto.getUsername());
        return new ResponseEntity<>(authResponseDto, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody RegisterDto registerDto) {
        String token = authService.register(registerDto);

        AuthResponseDto authResponseDto = new AuthResponseDto();
        authResponseDto.setAccessToken(token);

        System.out.println("User registered:" + registerDto.getUsername());
        return new ResponseEntity<>(authResponseDto, HttpStatus.OK);
    }
}
