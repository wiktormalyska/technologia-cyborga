package ovh.wiktormalyska.backend;

import ovh.wiktormalyska.backend.model.Message;
import ovh.wiktormalyska.backend.service.MessageService;
import ovh.wiktormalyska.backend.controller.MessageController;
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

class MessageControllerTest {

    private MockMvc mockMvc;

    @Mock
    private MessageService messageService;

    @InjectMocks
    private MessageController messageController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(messageController).build();
    }

    @Test
    void getAllMessages_ShouldReturnListOfMessages() throws Exception {
        List<Message> messages = Arrays.asList(
                Message.builder().id(1L).content("Hello").senderId(101L).receiverId(102L).build(),
                Message.builder().id(2L).content("How are you?").senderId(102L).receiverId(101L).build()
        );

        when(messageService.getAllMessages()).thenReturn(messages);

        mockMvc.perform(get("/api/messages"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(messages.size()))
                .andExpect(jsonPath("$[0].content").value("Hello"))
                .andExpect(jsonPath("$[1].content").value("How are you?"));
    }

    @Test
    void getMessageById_ExistingId_ShouldReturnMessage() throws Exception {
        Message message = Message.builder().id(1L).content("Hello").senderId(101L).receiverId(102L).build();

        when(messageService.getMessageById(1L)).thenReturn(Optional.of(message));

        mockMvc.perform(get("/api/messages/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Hello"));
    }

    @Test
    void getMessageById_NonExistingId_ShouldReturnNotFound() throws Exception {
        when(messageService.getMessageById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/messages/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void createMessage_ShouldReturnCreatedMessage() throws Exception {
        Message message = Message.builder().id(1L).content("Hello").senderId(101L).receiverId(102L).build();

        when(messageService.createMessage("Hello", 101L, 102L)).thenReturn(message);

        mockMvc.perform(post("/api/messages")
                        .param("content", "Hello")
                        .param("senderId", "101")
                        .param("receiverId", "102")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Hello"));
    }

    @Test
    void deleteMessage_ExistingId_ShouldReturnNoContent() throws Exception {
        doNothing().when(messageService).deleteMessage(1L);

        mockMvc.perform(delete("/api/messages/1"))
                .andExpect(status().isNoContent());

        verify(messageService, times(1)).deleteMessage(1L);
    }

    @Test
    void deleteMessage_NonExistingId_ShouldReturnNotFound() throws Exception {
        doThrow(new IllegalArgumentException()).when(messageService).deleteMessage(99L);

        mockMvc.perform(delete("/api/messages/99"))
                .andExpect(status().isNotFound());
    }
}
