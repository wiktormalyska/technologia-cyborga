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
    url: string;
    method: HttpRequestMethods;
}

export const APIEndpoints: {
    auth: {
        login: Endpoint
    },
    users: {
        getAll: Endpoint
        create: Endpoint
        getById: Endpoint
        updateById: Endpoint
        deleteById: Endpoint
    }
    chats: {
        getAll: Endpoint;
        getByUserId: Endpoint;
        getChatBetweenUsers: Endpoint;
        createChat: Endpoint;
        deleteChat: Endpoint;
    }
    friends: {
        acceptRequest: Endpoint;
        addFriend: Endpoint;
        deleteRequest: Endpoint;
        getAll: Endpoint;
        rejectRequest: Endpoint;
    }
    messages: {
        getAll: Endpoint;
        getById: Endpoint;
        getSentBySenderId: Endpoint;
        getReceivedByReceiverId: Endpoint;
        sendMessage: Endpoint;
        deleteById: Endpoint;
    }
}={
    auth: {
        login: {
            url: "api/auth/login",
            method: HttpRequestMethods.POST
        }
    },
    users: {
        getAll: {
            url: "api/users",
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
       }
    },
    chats: {
        getAll: {
            url: "api/chats",
            method: HttpRequestMethods.GET,
        },
        getByUserId: {
            url: "api/chats/{userId}",
            method: HttpRequestMethods.GET,
        },
        getChatBetweenUsers: {
            url: "api/chats/getChat",
            method: HttpRequestMethods.GET,
        },
        createChat: {
            url: "api/chats/createChat/",
            method: HttpRequestMethods.POST,
        },
        deleteChat: {
            url: "api/chats/{chatId}",
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
        deleteRequest: {
            url: "api/friends/{userId}/{friendRequestId}",
            method: HttpRequestMethods.DELETE,
        },
        getAll: {
            url: "api/friends/{userId}",
            method: HttpRequestMethods.GET,
        },
        rejectRequest: {
            url: "api/friends/{userId}/{friendRequestId}",
            method: HttpRequestMethods.PUT,
        }
    },
    messages: {
        getAll: {
            url: "api/messages",
            method: HttpRequestMethods.GET,
        },
        getById: {
            url: "api/messages/{id}",
            method: HttpRequestMethods.GET,
        },
        getSentBySenderId: {
            url: "api/messages/sent/{senderId}",
            method: HttpRequestMethods.GET,
        },
        getReceivedByReceiverId: {
            url: "api/messages/received/{receiverId}",
            method: HttpRequestMethods.GET,
        },
        sendMessage: {
            url: "api/messages",
            method: HttpRequestMethods.POST,
        },
        deleteById: {
            url: "api/messages/{id}",
            method: HttpRequestMethods.DELETE,
        },
    },
}