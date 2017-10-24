import { NgModule, Directive, ElementRef, Input } from '@angular/core';

import { LayoutModule } from '../layout/layout.module';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import { InputMaskModule } from 'ng2-inputmask';
import { Ng2FileInputModule } from 'ng2-file-input';

import { TarefaComponent } from './tarefa/tarefa.component';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';

import { TarefaService } from '../services/tarefa.service';

@NgModule({
    imports: [
        LayoutModule,
        Ng2TableModule,
        PaginationModule.forRoot(),
        Ng2FileInputModule.forRoot({
            dropText: "Coloque sua foto aqui",
            browseText: "Procurar",
            removeText: "Remover",
            invalidFileText: "Arquivo inválido.",
            invalidFileTimeout: 8000,
            removable: true,
            multiple: false,
            showPreviews: false,
            extensions: ['jpg', 'png', 'bmp', 'jpeg']
        }),
        InputMaskModule
    ],
    declarations: [
        TarefaComponent,
        ListarTarefasComponent
    ],
    providers: [
        TarefaService
    ],
})
export class DomainsModule { }
