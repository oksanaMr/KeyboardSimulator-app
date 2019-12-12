import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { tap, shareReplay, mergeMap } from 'rxjs/operators';

const BASE_PATH = 'http://localhost:8080/userKS';

@Injectable()
export class AuthorizationsService {

    currentUser$: Observable<User>;

    constructor(private http: HttpClient) { }

    public authorization(login: string, password: string) {
        const userRequest = this.http.get(`${BASE_PATH}/authorization/${login}/${password}`).pipe(shareReplay(1));

        this.currentUser$ = userRequest.pipe(
            mergeMap(id => this.getUser(`${id}`)),
            shareReplay(3)
        );

        return userRequest;
    }

    public registration(login: string, password: string) {
        const userRequest = this.http.get(`${BASE_PATH}/registration/${login}/${password}`);

        this.currentUser$ = userRequest.pipe(
            mergeMap(id => this.getUser(`${id}`)),
            shareReplay(3)
        );

        return userRequest;
    }

    public getUser(id: string) {
        return this.http.get<User>(`${BASE_PATH}/${id}`);
    }

    public changeLevel(user: string[]) {
        return this.http.post('http://localhost:8080/registration', user);
    }

    public changeData(id: string, login: string, password: string) {
        const body = { id: id, login: login, passwor: password }
        return this.http.post('http://localhost:8080/registration/', body);
    }
}
