export interface CustomerResponse{
    statusCode?:string;
    customers:CustomerDetails[]
}
export interface GetCustomerResponse{
    statusCode?:string;
    customer:CustomerDetails
}
export interface CustomerDetails{
    id:number;
    name:string;
    created_at:string;
    updated_at:string;
    handle?:string;
}
export interface CustomerRequestPayload{
    id?:number;
    name?:string;    
}
export interface NewCustomerResponse{
    statusCode?:string;
    message:string;
    id?:number;
}