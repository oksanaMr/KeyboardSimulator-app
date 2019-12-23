import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
selector: 'app-info',
templateUrl: './instruction.html',
styleUrls: ['./instruction.css']
})

export class InstructionComponent{
    selectedPage = 0;
    constructor(
        private router: Router){}   
 
}