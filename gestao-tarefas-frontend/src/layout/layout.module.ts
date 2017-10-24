import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent }   from './layout.component';

import { TopNavbarComponent } from './topnavbar/topnavbar.component';
import { FooterComponent } from './footer/footer.component';
import { MessageComponent } from './message/message.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        FormsModule,
        MessageComponent,
        CommonModule,
        LoadingComponent
    ],
    declarations: [
        LayoutComponent,  
        TopNavbarComponent,
        FooterComponent,
        MessageComponent,
        LoadingComponent
    ]
})
export class LayoutModule { }