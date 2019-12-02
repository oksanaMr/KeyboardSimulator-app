import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationsService } from '../authorization.service';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.html',
    styleUrls: ['./authorization.css']
})

export class AuthorizationComponent{
    private loginu:"";
    private passwordu:"";


    constructor(private productsService: AuthorizationsService){}

}