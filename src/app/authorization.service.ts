import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';


@Injectable()
export class AuthorizationsService {

    constructor(private http: HttpClient) { }

    public authorization(login:string, password:string) {
        return this.http.get('http://localhost:8080/authorization/${login}${password}');
    }

    public registration(login:string, password:string) {
        return this.http.get('http://localhost:8080/registration/${login}${password}');
    }

    public getUser(id:string){
        return this.http.get<User>('http://localhost:8080/getUser/${id}');
    }

    public changeLevel(user:string[]){
        return this.http.post('http://localhost:8080/registration',user);
    }

    public changeData(id:string, login:string, password:string) {
        const body = {id: id, login: login, passwor: password}
        return this.http.post('http://localhost:8080/registration/',body);
    }
}
