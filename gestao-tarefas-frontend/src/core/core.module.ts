import { NgModule } from '@angular/core';

import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';
import { HttpFactory } from './http/http.factory';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [{
        provide: Http,
        useFactory: HttpFactory,
        deps: [XHRBackend, RequestOptions, Router]
    }]
})
export class CoreModule { }
