import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationsService } from 'src/app/authorization.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-dataChange',
    templateUrl: './dataChange.html',
    styleUrls: ['./dataChange.css']
})

export class DataChangeComponent{
    private id:string;
    private loginu:string;
    private passwordu:string;
    private loading=false;

    private routeSubscription: Subscription;
    private querySubscription: Subscription;

    constructor(
    private authorizationsService: AuthorizationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute){}

    ngOnInit(){
        /*this.routeSubscription = this.activatedRoute.params.subscribe(params=>this.id=params['id']);
        this.querySubscription = this.activatedRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.loginu = queryParam['loginu'];
                this.passwordu = queryParam['passwordu'];
            }
        );*/
    }
    changeData(){
        this.loading = true;
        this.authorizationsService.changeData(this.id,this.loginu, this.passwordu);
        this.loading = false;
        this.router.navigate(['/profile']);
    }
}