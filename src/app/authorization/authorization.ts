import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationsService } from '../authorization.service';
import { User } from '../user';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.html',
    styleUrls: ['./authorization.css']
})

export class AuthorizationComponent{
    private loginu:"";
    private passwordu:"";
    private loading= false;

    constructor(
        private authorizationsService: AuthorizationsService,
        private router: Router){}

    autho(){
        this.loading = true;
        this.authorizationsService.authorization(this.loginu, this.passwordu).subscribe(
            (data : User) => {
                if (data.type_of_access == "admin")
                    this.router.navigate(['/exercise']);
                else this.router.navigate(['/profile']);
            },
            error => {
                this.loading = false;
        });
    }
}