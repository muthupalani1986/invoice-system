import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse, LoginRequestPayload } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  public login(payLodData: LoginRequestPayload): Observable<LoginResponse>{
    const url = this.apiBaseUrl + '/user/login';
    return this.http.post<LoginResponse>(url, {...payLodData}, httpOptions);
  }
}
