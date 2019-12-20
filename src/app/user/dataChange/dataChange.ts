import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationsService } from 'src/app/authorization.service';
import { User } from 'src/app/user';

@Component({
    selector: 'app-dataChange',
    templateUrl: './dataChange.html',
    styleUrls: ['./dataChange.css']
})

export class DataChangeComponent{
    user: User;
    private loading=false;

    constructor(
    private authorizationsService: AuthorizationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute){}

    ngOnInit(){
        const userId = this.activatedRoute.snapshot.params.id;

        this.authorizationsService.getUser(userId).subscribe(user => {
            this.user = user;
        });
    }
    changeData(){
        this.loading = true;
        this.authorizationsService.changeData(this.user).subscribe(user => {
            this.user = user;
            alert("Данные успешно сохранены");
        }, error => {
            if(error.status == 500){alert("Логин уже занят. Придумайте новый");}
            else {alert("Ошибка соединения с сервером");}
        });
        this.loading = false;   
    }
}