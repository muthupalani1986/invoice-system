import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  public setItem(keyName,value){
  	let keyValue=value;
  	try{
  		keyValue=JSON.stringify(value);
  	}catch(e){}  	
	sessionStorage.setItem(keyName, keyValue);
  }
}
