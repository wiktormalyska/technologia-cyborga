package ovh.wiktormalyska.backend.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ovh.wiktormalyska.backend.dto.AuthResponseDto;
import ovh.wiktormalyska.backend.dto.LoginDto;
import ovh.wiktormalyska.backend.security.JwtTokenProvider;
import ovh.wiktormalyska.backend.service.AuthService;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        String token = authService.login(loginDto);

        Cookie jwtCookie = jwtTokenProvider.createJwtCookie(token);
        response.addCookie(jwtCookie);

        AuthResponseDto authResponseDto = new AuthResponseDto();
        authResponseDto.setAccessToken(token);

        System.out.println("User logged in:" + loginDto.getUsername());
        return new ResponseEntity<>(authResponseDto, HttpStatus.OK);
    }
}
