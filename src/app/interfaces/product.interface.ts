export interface ProductRequestPayload extends ProductDetails{
    
}
export interface AddProductResponse{
    statusCode: string;
    message: string;
    id?: number;
}
export interface GetAllProductsResponse{
    statusCode: string;
    products: ProductDetails[];
}
export interface GetProductResponse{
    statusCode: string;
    product: ProductDetails;
}
export interface ProductDetails{
    id?: number;
    name?: string;
    handle?: string;
    description?: string;
    category?: number;
    image?: string;
    sellingPrice?: number;
    buyingPrice?: number;
    taxRate?: number;
    quantity?: number;
    salesUnit?: number;
    code: string;
    category_name?: string;
    unit_name?: string;
}
