export enum HttpRequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    TRACE = 'TRACE',
    CONNECT = 'CONNECT',
}

export interface Endpoint {
    url: string
    method: HttpRequestMethods
}

export const APIEndpoints: {
    auth: {
        login: Endpoint
        register: Endpoint
    },
    users: {
        getAll: Endpoint
        getByUsername: Endpoint
        findByUsername: Endpoint
        create: Endpoint
        getById: Endpoint
        updateById: Endpoint
        deleteById: Endpoint
        getProfileImage: Endpoint
        updateProfilePicture: Endpoint
        getPoints: Endpoint
    }
    chats: {
        getAll: Endpoint
        getByUserId: Endpoint
        getChatBetweenUsers: Endpoint
        createChat: Endpoint
        deleteChat: Endpoint
    }
    friends: {
        acceptRequest: Endpoint
        addFriend: Endpoint
        getAll: Endpoint
        rejectRequest: Endpoint
        deleteFriend: Endpoint
    }
    messages: {
        getAll: Endpoint
        getById: Endpoint
        getSentBySenderId: Endpoint
        getReceivedByReceiverId: Endpoint
        sendMessage: Endpoint
        deleteById: Endpoint
    }
    emojis: {
        getUserEmojis: Endpoint
        getAllEmojis: Endpoint
    }
} = {
    auth: {
        login: {
            url: "api/auth/login",
            method: HttpRequestMethods.POST
        },
        register: {
            url: "api/auth/register",
            method: HttpRequestMethods.POST
        }
    },
    users: {
        getAll: {
            url: "api/users",
            method: HttpRequestMethods.GET
        },
        getByUsername: {
            url: "api/users/username",
            method: HttpRequestMethods.GET
        },
        findByUsername: {
          url:   "api/users/find",
            method: HttpRequestMethods.GET
        },
        create: {
            url: "api/users",
            method: HttpRequestMethods.POST
        },
        getById: {
            url: "api/users",
            method: HttpRequestMethods.GET
        },
        updateById: {
            url: "api/users",
            method: HttpRequestMethods.PUT
        },
        deleteById: {
            url: "api/users",
            method: HttpRequestMethods.DELETE
        },
        getProfileImage: {
            url: "api/users",
            method: HttpRequestMethods.GET
        },
        updateProfilePicture: {
            url: "api/users",
            method: HttpRequestMethods.PUT
        },
        getPoints: {
            url: "api/users",
            method: HttpRequestMethods.GET,
        }
    },
    chats: {
        getAll: {
            url: "api/chats",
            method: HttpRequestMethods.GET,
        },
        getByUserId: {
            url: "api/chats",
            method: HttpRequestMethods.GET,
        },
        getChatBetweenUsers: {
            url: "api/chats/getChat",
            method: HttpRequestMethods.GET,
        },
        createChat: {
            url: "api/chats/createChat",
            method: HttpRequestMethods.POST,
        },
        deleteChat: {
            url: "api/chats",
            method: HttpRequestMethods.DELETE,
        },
    },
    friends: {
        acceptRequest: {
            url: "api/friends/accept",
            method: HttpRequestMethods.PUT,
        },
        addFriend: {
            url: "api/friends/add",
            method: HttpRequestMethods.POST,
        },
        deleteFriend: {
            url: "api/friends/delete",
            method: HttpRequestMethods.DELETE,
        },
        getAll: {
            url: "api/friends",
            method: HttpRequestMethods.GET,
        },
        rejectRequest: {
            url: "api/friends/reject",
            method: HttpRequestMethods.PUT,
        }
    },
    messages: {
        getAll: {
            url: "api/messages",
            method: HttpRequestMethods.GET,
        },
        getById: {
            url: "api/messages",
            method: HttpRequestMethods.GET,
        },
        getSentBySenderId: {
            url: "api/messages/sent",
            method: HttpRequestMethods.GET,
        },
        getReceivedByReceiverId: {
            url: "api/messages/received",
            method: HttpRequestMethods.GET,
        },
        sendMessage: {
            url: "api/messages",
            method: HttpRequestMethods.POST,
        },
        deleteById: {
            url: "api/messages",
            method: HttpRequestMethods.DELETE,
        },
    },
    emojis: {
        getUserEmojis: {
            url: "api/emojis/user_emojis",
            method: HttpRequestMethods.GET
        },
        getAllEmojis: {
            url: "api/emojis",
            method: HttpRequestMethods.GET
        }
    }
}
