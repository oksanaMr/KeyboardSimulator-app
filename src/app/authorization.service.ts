import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

const BASE_PATH = 'http://localhost:8080/userKS';

@Injectable()
export class AuthorizationsService {


    constructor(private http: HttpClient) { }

    public authorization(login: string, password: string) {
        return this.http.get(`${BASE_PATH}/authorization/${login}${password}`);
    }

    public registration(login: string, password: string) {
        return this.http.get(`${BASE_PATH}/registration/${login}${password}`);
    }

    public getUser(id: string) {
        return this.http.get<User>(`${BASE_PATH}/getUser/${id}`);
    }

    public changeLevel(user: string[]) {
        return this.http.post('http://localhost:8080/registration', user);
    }

    public changeData(id: string, login: string, password: string) {
        const body = { id: id, login: login, passwor: password }
        return this.http.post('http://localhost:8080/registration/', body);
    }
}    