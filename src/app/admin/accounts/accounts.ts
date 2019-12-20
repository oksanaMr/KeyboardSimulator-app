import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationsService } from 'src/app/authorization.service';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.html',
    styleUrls: ['./accounts.css']
})

export class AccountsComponent{

    displayedColumns: string[] = ['login', 'password', 'level','delete'];
    dataSource;

    constructor(
        private router: Router,
        private authorizationsService: AuthorizationsService,
        private activateRoute: ActivatedRoute){}

    ngOnInit(){
        this.authorizationsService.getUsers().subscribe(users => { users.splice(0,1);
            this.dataSource = new MatTableDataSource(users);
        });
    }

    deteleUser(id: number){
        this.authorizationsService.deleteUser(id).subscribe(users => { users.splice(0,1);
            this.dataSource = new MatTableDataSource(users);
        });
    }
}