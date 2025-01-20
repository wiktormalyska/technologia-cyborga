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
    }
}