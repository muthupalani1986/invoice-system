export interface CategoryResponse{
    categories:CategoryDetails[]
}
export interface CategoryDetails{
    id:number;
    category_name:string;
    created_at:string;
    updated_at:string
}
export interface CategoryRequestPayload{
    id?:number;
    category_name:string;
}
export interface NewCategoryResponse{
    statusCode?:string;
    message:string;
    id?:number;
}