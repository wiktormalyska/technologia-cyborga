package ovh.wiktormalyska.backend.service;

import jakarta.transaction.Transactional;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.dto.LoginDto;
import ovh.wiktormalyska.backend.dto.RegisterDto;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.repository.UserRepository;
import ovh.wiktormalyska.backend.security.JwtTokenProvider;


@Service
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    @Transactional
    public String login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword())
        );

        Long userID = userService.getUserByUsername(loginDto.getUsername()).getId();

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication, userID);
    }

    @Override
    @Transactional
    public String register(RegisterDto registerDto) {

        User user = User.builder()
                .id(0L)
                .username(registerDto.getUsername())
                .email(registerDto.getEmail())
                .password(passwordEncoder.encode(registerDto.getPassword()))
                .build();

        userService.createUser(user);

        User user1 = userRepository.findByUsername(registerDto.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registerDto.getUsername(),
                        registerDto.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication, user1.getId());
    }
}
