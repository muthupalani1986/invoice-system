import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse, LoginRequestPayload } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
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
  private apiBaseUrl='http://localhost:6001';
  constructor(private http:HttpClient) { }
  public login(payLodData:LoginRequestPayload):Observable<LoginResponse>{
    const url=this.apiBaseUrl+'/user/login';
    return this.http.post<LoginResponse>(url,{...payLodData},httpOptions);
  }
}
