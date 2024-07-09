export interface User {
    id: string;
    username: string,
    password: string,
    email: string,
    phone: string,
}

export interface SignInData {
    email: string,
    password: string,
}

export interface SignUpData {
    username: string,
    password: string,
    email: string,
    phone: string,
}