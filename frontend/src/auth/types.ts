export interface LoginDto {
    username: string;
    password: string;
}

export interface RegisterDto {
    username: string;
    password: string;
    email: string;
}

export interface AuthResponseDto {
    accessToken: string;
}

export interface DecodedTokenType {
    sub: string;
    iat: number;
    exp: number;
    authorities: string[];
    userRoles: string[];
    userID: number;
}