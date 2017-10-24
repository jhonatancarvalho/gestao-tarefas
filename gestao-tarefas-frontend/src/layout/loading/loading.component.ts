import { Component } from '@angular/core';

@Component({
    selector: 'loading',
    templateUrl: 'loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

    loading: any;

    constructor() { }

    abreLoading(): void {
        this.loading = true;
    }

    fechaLoading(): void {
        this.loading = false;
    }

}