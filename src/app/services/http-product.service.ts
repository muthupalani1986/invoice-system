import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { SESSION_STORAGE } from '../constants/session.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';
import { ProductRequestPayload, AddProductResponse, GetAllProductsResponse, GetProductResponse } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpProductService {

  private apiBaseUrl = environment.apiBaseUrl;
  private userDetails:any;
  constructor(private _http: HttpClient, private _sessionService: SessionService) { 
    this.userDetails = this._sessionService.getItem(SESSION_STORAGE.currentUser);
  }
  public addProduct(payLodData: ProductRequestPayload): Observable<AddProductResponse> {
    const url = this.apiBaseUrl + '/product/new';
    return this._http.post<AddProductResponse>(url, { ...payLodData }, this.requestheader());
  }
  public saveProduct(payLodData: ProductRequestPayload): Observable<AddProductResponse> {
    const url = this.apiBaseUrl + '/product/update';
    return this._http.post<AddProductResponse>(url, { ...payLodData }, this.requestheader());
  }
  public deleteProduct(payLodData: ProductRequestPayload): Observable<AddProductResponse> {
    const url = this.apiBaseUrl + '/product/delete';
    return this._http.post<AddProductResponse>(url, { ...payLodData }, this.requestheader());
  }
  public getAllProducts(): Observable<GetAllProductsResponse> {
    const url = this.apiBaseUrl + '/product';
    return this._http.post<GetAllProductsResponse>(url, {}, this.requestheader());
  }
  public getProduct(id: number): Observable<GetProductResponse> {
    const url = this.apiBaseUrl + '/product/' + id;
    return this._http.post<GetProductResponse>(url, {}, this.requestheader());
  }
  private requestheader() {
    const tokenId = this.userDetails.token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenId
      })
    };
    return httpOptions;
  }
}
