import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { TarefaComponent } from '../domains/tarefa/tarefa.component';
import { ListarTarefasComponent } from '../domains/listar-tarefas/listar-tarefas.component';

import { ROUTE_NAMES } from '../constants/route.constants';

const appRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: ROUTE_NAMES.LISTAR_TAREFAS, pathMatch: 'full' },
            { path: ROUTE_NAMES.LISTAR_TAREFAS, component: ListarTarefasComponent },
            { path: ROUTE_NAMES.TAREFA, component: TarefaComponent },
            { path: ROUTE_NAMES.TAREFA + '/:id', component: TarefaComponent }
        ]
    },
    { path: '**', redirectTo: ''}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }