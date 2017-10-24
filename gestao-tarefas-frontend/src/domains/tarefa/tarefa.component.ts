import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GenericComponent } from '../generic-component';
import { ActivatedRoute } from '@angular/router';

import { ROUTE_NAMES } from '../../constants/route.constants';
import { MENSAGEM } from '../../constants/mensagem.constants';

import { Error } from '../../models/error.model';
import { Tarefa } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';

@Component({
    selector: 'tarefa',
    templateUrl: 'tarefa.component.html'
})
export class TarefaComponent extends GenericComponent implements OnInit {

    tarefa: Tarefa;
    private sub: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private tarefaService: TarefaService
    ) { super(); }

    ngOnInit() {
        this.limpar();
        this.sub = this.route.params.subscribe(params => {
            this.tarefa.id = params['id'];
            this.carregaTarefa();
        });
    }

    carregaTarefa() {
        if (this.tarefa.id == null) {
            return;
        }

        this.tarefaService.find(this.tarefa.id)
        .then((tarefa: Tarefa) => {
            this.tarefa = tarefa;
            this.fechaLoading();
        })
        .catch(erro => {
            console.log('Erro ao buscar: ', erro);
            console.log(erro);
            this.mostrarMensagem(MENSAGEM.ERROR, null, erro.json());
            this.fechaLoading();
        });
    }
    
    cadastrarTarefa(): void {
        this.abreLoading();
        if (this.tarefa.id === null || this.tarefa.id === undefined){
            this.tarefaService.create(this.tarefa)
            .then((tarefa: Tarefa) => {
                this.tarefa = tarefa;
                this.mostrarMensagem(MENSAGEM.SUCCESS, 'Salvo com sucesso');
                this.limpar();
                this.fechaLoading();
            })
            .catch((erro) => {
                this.mostrarMensagem(MENSAGEM.ERROR, null, erro.json());
                this.fechaLoading();
            });
            return;
        }

        this.tarefaService.update(this.tarefa)
        .then((tarefa: Tarefa) => {
            this.tarefa = tarefa;
            this.mostrarMensagem(MENSAGEM.SUCCESS, 'Alterado com sucesso');
            this.limpar();
            this.fechaLoading();
        })
        .catch(erro => {
            console.log('Erro ao alterar: ', erro);
            this.mostrarMensagem(MENSAGEM.ERROR, null, erro.json());
            this.fechaLoading();
        });
    }

    limpar(): void {
        this.tarefa = new Tarefa(null, '', '', null, 'PENDENTE');
    }

    listarTarefas(): void {
        this.router.navigate([ROUTE_NAMES.LISTAR_TAREFAS]);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}