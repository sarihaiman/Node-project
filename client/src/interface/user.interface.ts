export interface User {
    id: number;
    username: string,
    password: string,
    email: string,
    phone: string,
    isAdmin: boolean
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