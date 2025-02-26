package ovh.wiktormalyska.backend;

import ovh.wiktormalyska.backend.dto.ChatDto;
import ovh.wiktormalyska.backend.model.Chat;
import ovh.wiktormalyska.backend.service.ChatService;
import ovh.wiktormalyska.backend.controller.ChatController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

class ChatControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ChatService chatService;

    @InjectMocks
    private ChatController chatController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(chatController).build();
    }

    @Test
    void getAllChats_ShouldReturnListOfChats() throws Exception {
        List<Chat> chats = Arrays.asList(
                new Chat(1L, 101L, 102L),
                new Chat(2L, 103L, 104L)
        );

        when(chatService.getAllChats()).thenReturn(chats);

        mockMvc.perform(get("/api/chats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(chats.size()))
                .andExpect(jsonPath("$[0].user1Id").value(101L))
                .andExpect(jsonPath("$[1].user1Id").value(103L));
    }

    @Test
    void getChatsByUserId_ExistingUser_ShouldReturnChat() throws Exception {
        Chat chat = new Chat(1L, 101L, 102L);

        when(chatService.getChatsByUserId(101L)).thenReturn(Optional.of(chat));

        mockMvc.perform(get("/api/chats/101"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user1Id").value(101L));
    }

    @Test
    void getChatsByUserId_NonExistingUser_ShouldReturnNotFound() throws Exception {
        when(chatService.getChatsByUserId(999L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/chats/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getChatBetweenUsers_ShouldReturnChat() throws Exception {
        Chat chat = new Chat(1L, 101L, 102L);
        ChatDto chatDto = new ChatDto(101L, 102L);

        when(chatService.getChatBetweenUsers(101L, 102L)).thenReturn(Optional.of(chat));

        mockMvc.perform(post("/api/chats/getChat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(chatDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user1Id").value(101L))
                .andExpect(jsonPath("$.user2Id").value(102L));
    }

    @Test
    void getChatBetweenUsers_NonExisting_ShouldReturnNotFound() throws Exception {
        ChatDto chatDto = new ChatDto(101L, 102L);

        when(chatService.getChatBetweenUsers(101L, 102L)).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/chats/getChat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(chatDto)))
                .andExpect(status().isNotFound());
    }

    @Test
    void createChat_ShouldReturnCreatedChat() throws Exception {
        Chat chat = new Chat(1L, 101L, 102L);
        ChatDto chatDto = new ChatDto(101L, 102L);

        when(chatService.createChat(101L, 102L)).thenReturn(chat);

        mockMvc.perform(post("/api/chats/createChat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(chatDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user1Id").value(101L))
                .andExpect(jsonPath("$.user2Id").value(102L));
    }

    @Test
    void deleteChat_ExistingId_ShouldReturnNoContent() throws Exception {
        doNothing().when(chatService).deleteChat(1L);

        mockMvc.perform(delete("/api/chats/1"))
                .andExpect(status().isNoContent());

        verify(chatService, times(1)).deleteChat(1L);
    }

    @Test
    void deleteChat_NonExistingId_ShouldReturnNotFound() throws Exception {
        doThrow(new IllegalArgumentException()).when(chatService).deleteChat(99L);

        mockMvc.perform(delete("/api/chats/99"))
                .andExpect(status().isNotFound());
    }
}
