package ovh.wiktormalyska.backend;

import ovh.wiktormalyska.backend.dto.FriendDto;
import ovh.wiktormalyska.backend.model.Friend;
import ovh.wiktormalyska.backend.service.FriendService;
import ovh.wiktormalyska.backend.controller.FriendController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FriendController.class)
class FriendControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private FriendService friendService;

    @InjectMocks
    private FriendController friendController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllFriends_shouldReturnList() throws Exception {
        Long userId = 1L;
        List<Friend> friends = Arrays.asList(
                Friend.builder().userId(1L).friendId(2L).build(),
                Friend.builder().userId(1L).friendId(3L).build()
        );

        when(friendService.getAllFriends(userId)).thenReturn(friends);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/friends/{userId}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void addFriend_shouldReturnFriend() throws Exception {
        FriendDto friendDto = FriendDto.builder().userId(1L).friendId(2L).build();
        Friend friend = Friend.builder().userId(1L).friendId(2L).build();

        when(friendService.addFriend(friendDto.getUserId(), friendDto.getFriendId())).thenReturn(friend);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/friends/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userId\":1,\"friendId\":2}"))
                .andExpect(status().isOk());
    }

    @Test
    void acceptFriendRequest_shouldReturnAcceptedFriend() throws Exception {
        FriendDto friendDto = FriendDto.builder().userId(1L).friendId(2L).build();
        Friend friend = Friend.builder().userId(1L).friendId(2L).build();

        when(friendService.acceptFriendRequest(friendDto.getUserId(), friendDto.getFriendId())).thenReturn(friend);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/friends/accept")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userId\":1,\"friendId\":2}"))
                .andExpect(status().isOk());
    }

    @Test
    void deleteFriend_shouldReturnNoContent() throws Exception {
        FriendDto friendDto = FriendDto.builder().userId(1L).friendId(2L).build();
        doNothing().when(friendService).deleteFriend(friendDto.getUserId(), friendDto.getFriendId());

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/friends/delete")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userId\":1,\"friendId\":2}"))
                .andExpect(status().isNoContent());
    }
}
