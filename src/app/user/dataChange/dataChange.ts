import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationsService } from 'src/app/authorization.service';
import {Subscription} from 'rxjs';
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
        });
        this.loading = false;
        //this.router.navigate(['/profile',this.user.id]);
    }
}