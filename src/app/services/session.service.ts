import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	constructor() { }
	public setItem(keyName, value) {
		let keyValue = value;
		try {
			keyValue = JSON.stringify(value);
		} catch (e) { }
		sessionStorage.setItem(keyName, keyValue);
	}
	public getItem(keyName): any {
		let sessionData = sessionStorage.getItem(keyName);
		try {
			sessionData = JSON.parse(sessionData);
		} catch (e) { }
		return sessionData;
	}
	public removeItem(keyName){
		sessionStorage.removeItem(keyName);
	}
}
