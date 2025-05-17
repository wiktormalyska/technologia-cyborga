package ovh.wiktormalyska.backend.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class MiscService {
    public static String getBackendUrl(Environment env) {
        if (Arrays.asList(env.getActiveProfiles()).contains("dev")) {
            return "http://localhost:8080";
        }
        Dotenv dotenv = Dotenv.configure().load();
        return dotenv.get("DOMAIN_NAME");
    }
}
