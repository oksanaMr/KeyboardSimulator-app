import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthorizationsService {

    constructor(private http: HttpClient) { }

    public authorization(login:string, password:string) {
        return this.http.get('http://localhost:8080/authorization/${login}${password}');
    }

    public registration(login:string, password:string) {
        return this.http.get('http://localhost:8080/registration/${login}${password}');
    }
}    