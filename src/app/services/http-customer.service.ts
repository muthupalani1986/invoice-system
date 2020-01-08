import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { SESSION_STORAGE } from '../constants/session.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';
import { CustomerRequestPayload, NewCustomerResponse, CustomerResponse, GetCustomerResponse } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpCustomerService {

  private apiBaseUrl = environment.apiBaseUrl;
  private userDetails: any;
  constructor(private _http: HttpClient, private _sessionService: SessionService) { 
    this.userDetails=this._sessionService.getItem(SESSION_STORAGE.currentUser);
  }
  public addCustomer(payLodData: CustomerRequestPayload): Observable<NewCustomerResponse> {
    const url = this.apiBaseUrl + '/customer/new';
    return this._http.post<NewCustomerResponse>(url, { ...payLodData }, this.requestheader());
  }
  public saveCustomer(payLodData: CustomerRequestPayload): Observable<NewCustomerResponse> {
    const url = this.apiBaseUrl + '/customer/update';
    return this._http.post<NewCustomerResponse>(url, { ...payLodData }, this.requestheader());
  }
  public deleteCustomer(payLodData: CustomerRequestPayload): Observable<NewCustomerResponse> {
    const url = this.apiBaseUrl + '/customer/delete';
    return this._http.post<NewCustomerResponse>(url, { ...payLodData }, this.requestheader());
  }
  public getAllCustomers(): Observable<CustomerResponse> {
    const url = this.apiBaseUrl + '/customer';
    return this._http.post<CustomerResponse>(url, {}, this.requestheader());
  }
  public getCustomer(id: number): Observable<GetCustomerResponse> {
    const url = this.apiBaseUrl + '/customer/' + id;
    return this._http.post<GetCustomerResponse>(url, {}, this.requestheader());
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
