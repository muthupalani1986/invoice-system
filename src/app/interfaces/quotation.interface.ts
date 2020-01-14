import { Quotation } from '../main/quotation/quotation.model';

export interface NewQuotationResponse{
    statusCode?: string;
    message: string;
    id?: number;
    quotation_number?:string;
    invoice_number?:string;
}
export interface GetQuotationResponse{
    statusCode?: string;
    quotation:Quotation
}
export interface GetAllQuotationRes{
    statusCode?: string;
    quotation:Quotation[]
}