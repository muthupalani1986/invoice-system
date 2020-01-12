export interface CategoryResponse{
    statusCode?: string;
    categories: CategoryDetails[];
}
export interface GetCategoryResponse{
    statusCode?: string;
    category: CategoryDetails;
}
export interface CategoryDetails{
    id: number;
    category_name: string;
    created_at: string;
    updated_at: string;
    handle?: string;
}
export interface CategoryRequestPayload{
    id?: number;
    category_name?: string;    
}
export interface NewCategoryResponse{
    statusCode?: string;
    message: string;
    id?: number;
}
