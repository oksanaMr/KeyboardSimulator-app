import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user'
import { AuthorizationsService } from 'src/app/authorization.service';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.html',
    styleUrls: ['./accounts.css']
})

export class AccountsComponent{
    users: User[] = [{id: 1, login: "hhg", password: "asd", type_of_access: "", diff_id:1},
    {id: 2, login: "fffffffh", password: "qwe", type_of_access: "", diff_id:1},
    {id: 3, login: "fgh", password: "tyu", type_of_access: "", diff_id:1},
    {id: 4, login: "cfcgh", password: "nm,", type_of_access: "", diff_id:2},
    {id: 5, login: "tyyyyyyy", password: ",./", type_of_access: "", diff_id:2},
    {id: 6, login: "ert", password: "jkl", type_of_access: "", diff_id:2},
    {id: 7, login: "ggg", password: "ghj", type_of_access: "", diff_id:2},
    {id: 8, login: "ets", password: "tyu", type_of_access: "", diff_id:3},
    {id: 9, login: "fgh", password: "kll;", type_of_access: "", diff_id:3},
    {id: 10, login: "iop", password: "dffffff", type_of_access: "", diff_id:3},
    {id: 11, login: "nm,", password: "dfffff", type_of_access: "", diff_id:3}];

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