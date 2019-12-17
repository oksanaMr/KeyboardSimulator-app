import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
selector: 'app-info',
templateUrl: './info.html',
styleUrls: ['./info.css']
})

export class InfoComponent{

    constructor(
        private router: Router){}   
 
}