package ovh.wiktormalyska.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ovh.wiktormalyska.backend.model.User;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class ImageService {

    @Value("${image.upload.directory}")
    private String uploadDirectory;

    @Value("${spring.mvc.static-path-pattern}")
    private String staticPathPattern;

    public String storeImage(MultipartFile file, User user) throws IOException {
        Path uploadPath = Paths.get(uploadDirectory);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        if (user.getProfileImagePath() != null && !user.getProfileImagePath().isEmpty()) {
            try {
                Files.deleteIfExists(Paths.get(user.getProfileImagePath()));
            } catch (IOException e) {
                System.err.println("Błąd usuwania starego obrazu: " + e.getMessage());
            }
        }

        String filename = user.getId() + "_" + user.getUsername() + "_" + "profile" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDirectory, filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return Paths.get(staticPathPattern.replace("/**", "/"), filename).toString();
    }
}