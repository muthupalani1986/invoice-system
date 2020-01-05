export interface CustomerResponse{
    statusCode?:string;
    customers:CustomerDetails[]
}
export interface GetCustomerResponse{
    statusCode?:string;
    customer:CustomerDetails
}
export interface CustomerDetails{
    id?: string;
    name: string;
    handle: string;
    company_name:string;
    email:string;
    phone_number:string;
    address:string;
    city:string;
    state:string;
    postal_code:string;
    country:string;
}
export interface CustomerRequestPayload extends CustomerDetails{
    
}
export interface NewCustomerResponse{
    statusCode?:string;
    message:string;
    id?:number;
}