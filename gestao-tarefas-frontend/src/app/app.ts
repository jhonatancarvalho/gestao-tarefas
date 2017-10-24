import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { ROUTE_NAMES } from '../constants/route.constants';

@Component({
    selector: 'app',
    template: '<router-outlet></router-outlet>'
})

export class AppComponent implements OnInit {

    constructor(
        private router: Router, 
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit() {
        this.router.navigate([ROUTE_NAMES.LISTAR_TAREFAS]);
    }
}
