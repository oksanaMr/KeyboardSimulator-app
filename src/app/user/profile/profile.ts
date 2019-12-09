import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user';
import { AuthorizationsService } from 'src/app/authorization.service';

@Component({
selector: 'app-profile',
templateUrl: './profile.html',
styleUrls: ['./profile.css']
})

export class ProfileComponent{
    user : User;
    levels: string[] = ['Слабый','Средний','Продвинутый']
    selectLevel = 'Слабый';

    constructor(
        private router: Router,
        private authorizationsService: AuthorizationsService,
        private activateRoute: ActivatedRoute){}

    ngOnInit(){
        //const id = this.activateRoute.snapshot.params['id'];
        //this.authorizationsService.getUser(id).subscribe(user => this.user = user);
        //this.selectLevel = this.user.id_level;
    }    

    changeLevel(level:string){
        this.user.id_level = level;
        this.authorizationsService.changeLevel([this.user.id,this.user.id_level]);
    }    

}