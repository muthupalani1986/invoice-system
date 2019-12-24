import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { SESSION_STORAGE } from '../constants/session.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { CategoryRequestPayload, CategoryResponse, NewCategoryResponse, GetCategoryResponse } from '../interfaces/category.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCategoryService {

  private apiBaseUrl = environment.apiBaseUrl;
  private userDetails: any = this._sessionService.getItem(SESSION_STORAGE.currentUser);
  constructor(private _http: HttpClient, private _sessionService: SessionService) { }
  public addCategory(payLodData: CategoryRequestPayload): Observable<NewCategoryResponse> {
    const url = this.apiBaseUrl + '/category/new';
    return this._http.post<NewCategoryResponse>(url, { ...payLodData }, this.requestheader());
  }
  public saveCategory(payLodData: CategoryRequestPayload): Observable<NewCategoryResponse> {
    const url = this.apiBaseUrl + '/category/update';
    return this._http.post<NewCategoryResponse>(url, { ...payLodData }, this.requestheader());
  }
  public getAllCategories(): Observable<CategoryResponse> {
    const url = this.apiBaseUrl + '/category';
    return this._http.post<CategoryResponse>(url, {}, this.requestheader());
  }
  public getCategory(category_id:number): Observable<GetCategoryResponse> {
    const url = this.apiBaseUrl + '/category/'+category_id;
    return this._http.post<GetCategoryResponse>(url, {}, this.requestheader());
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
