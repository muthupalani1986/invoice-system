import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SessionService } from './session.service';
import { SESSION_STORAGE } from '../constants/session.constants';
import { Quotation } from '../main/quotation/quotation.model';
import { NewQuotationResponse, GetQuotationResponse, GetAllQuotationRes } from '../interfaces/quotation.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpQuotationService {

  private apiBaseUrl = environment.apiBaseUrl;
  private userDetails: any;
  constructor(private _http: HttpClient, private _sessionService: SessionService) { 
    this.userDetails = this._sessionService.getItem(SESSION_STORAGE.currentUser);
  }
  public addQuotation(payLodData: Quotation): Observable<NewQuotationResponse> {
    const url = this.apiBaseUrl + '/quotation/new';
    return this._http.post<NewQuotationResponse>(url, { ...payLodData }, this.requestheader());
  }
  public saveQuotation(payLodData: Quotation): Observable<NewQuotationResponse> {
    const url = this.apiBaseUrl + '/quotation/update';
    return this._http.post<NewQuotationResponse>(url, { ...payLodData }, this.requestheader());
  }
  public getQuotation(id: number): Observable<GetQuotationResponse> {
    const url = this.apiBaseUrl + '/quotation/' + id;
    return this._http.post<GetQuotationResponse>(url, {}, this.requestheader());
  }
  public getAllQuotations(): Observable<GetAllQuotationRes> {
    const url = this.apiBaseUrl + '/quotation';
    return this._http.post<GetAllQuotationRes>(url, {}, this.requestheader());
  }
  public deleteQuotation(payLodData: Quotation): Observable<NewQuotationResponse> {
    const url = this.apiBaseUrl + '/quotation/delete';
    return this._http.post<NewQuotationResponse>(url, { ...payLodData }, this.requestheader());
  }
  public downloadInvoice(id: number): Observable<HttpResponse<Blob>> {
    const url = this.apiBaseUrl + '/quotation/generate-invoice/' + id;
    return this._http.post<HttpResponse<Blob>>(url, {}, this.requestheader());
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
