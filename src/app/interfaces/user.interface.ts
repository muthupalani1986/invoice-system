export interface LoginResponse{
    msg?:string;
    token?:string;
    email_id?:string;
    first_name?:string;
    last_name?:string;
    role_name?:string;
    role_id?:number;
}
export interface LoginRequestPayload{
    email_id:string;
    password:string;
}