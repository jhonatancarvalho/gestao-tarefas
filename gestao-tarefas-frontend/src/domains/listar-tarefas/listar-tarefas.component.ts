import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { GenericComponent } from '../generic-component';

import { ROUTE_NAMES } from '../../constants/route.constants';
import { MENSAGEM } from '../../constants/mensagem.constants';

import { Tarefa } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';

@Component({
    selector: 'listar-tarefas',
    templateUrl: 'listar-tarefas.component.html'
})
export class ListarTarefasComponent extends GenericComponent implements OnInit {

    public rows:Array<any> = [];
    public columns:Array<any> = [
       {title: 'Título', name: 'titulo', filtering: {filterString: '', placeholder: 'Filtrar pelo título'}},
       {title: 'Descrição', name: 'descricao', filtering: {filterString: '', placeholder: 'Filtrar pela descrição'}},
       {title: 'Data Criação', name: 'dataCriacao', filtering: {filterString: '', placeholder: 'Filtrar pela data criação'}},
       {title: 'Status', name: 'status', filtering: {filterString: '', placeholder: 'Filtrar pelo status'}},
       {title: 'Editar', name: 'editar'},
       {title: 'Excluir', name: 'excluir'}
    ];
    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 5;
    public numPages:number = 1;
    public length:number = 0;
  
    public config:any = {
       paging: true,
       sorting: {columns: this.columns},
       filtering: {filterString: ''},
       className: ['table-striped', 'table-bordered', 'text-center']
    };
  
    private data:Array<any> = [];
    
    constructor(
        private tarefaService: TarefaService,
        private router: Router
    ) { super(); }

    ngOnInit() {
        this.abreLoading();
        this.length = this.data.length;
        this.onChangeTable(this.config);
        this.buscarTarefas();
    }

    buscarTarefas() {
        this.tarefaService.findAll()
        .then((listaTarefas: Tarefa[]) => {
            this.adicionaTarefasTabela(listaTarefas);
            this.fechaLoading();
        })
        .catch(erro => {
            console.log('Erro ao buscar todos: ', erro);
            this.fechaLoading();
        });
    }

    adicionaTarefasTabela(listaTarefas) {
        let listaTarefasJson: Array<any> = JSON.parse(JSON.stringify(listaTarefas));
        for (let objeto of listaTarefasJson) {
            if (objeto["dataCriacao"] !== null) {
                objeto["dataCriacao"] = new Date(objeto["dataCriacao"]).toLocaleString().substring(0, 10);
            } else {
                objeto["dataCriacao"] = "";
            }

            if (objeto["status"] !== null) {
                let status = objeto["status"] == "PENDENTE" ? "Pendente" : "Concluida";
                let tipoLabel = objeto["status"] == "PENDENTE" ? "warning" : "success";
                objeto["status"] = "<span class='label label-" + tipoLabel + "'>" + status + "</span>";
            }
            objeto["editar"] = "<span class='glyphicon glyphicon-pencil'></span>";
            objeto["excluir"] = "<span class='glyphicon glyphicon-trash'></span>";
        }
        this.data = listaTarefasJson;
        this.onChangeTable(this.config);
    }
    
    changePage(page:any, data:Array<any> = this.data):Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }
    
    changeSort(data:any, config:any):any {
        if (!config.sorting) {
            return data;
        }
    
        let columns = this.config.sorting.columns || [];
        let columnName:string = void 0;
        let sort:string = void 0;
    
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
    
        if (!columnName) {
            return data;
        }
    
        return data.sort((previous:any, current:any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }
    
    changeFilter(data:any, config:any):any {
        let filteredData:Array<any> = data;
        this.columns.forEach((column:any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item:any) => {
                    return item[column.name].match(column.filtering.filterString);
                });
            }
        });
    
        if (!config.filtering) {
            return filteredData;
        }
    
        if (config.filtering.columnName) {
            return filteredData.filter((item:any) =>
                item[config.filtering.columnName].match(this.config.filtering.filterString));
        }
    
        let tempArray:Array<any> = [];
        filteredData.forEach((item:any) => {
            let flag = false;
            this.columns.forEach((column:any) => {
                if (item[column.name] === undefined) {
                    return;
                }
                if (item[column.name].toString().match(this.config.filtering.filterString)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;
    
        return filteredData;
    }
    
    onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
    
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
    
        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }
    
    onCellClick(data: any): any {
        if (data.column == "editar") {
            this.editarTarefa(data.row);
            return;
        }

        if (data.column == "excluir") {
            this.excluirTarefa(data.row);
            return;
        }
    }

    editarTarefa(row: any) {
        this.abreLoading();
        this.router.navigate([ROUTE_NAMES.TAREFA, row.id]);
    }

    excluirTarefa(row: any) {
        this.abreLoading();
        this.tarefaService.delete(row.id)
        .then(() => {
            this.mostrarMensagem(MENSAGEM.SUCCESS, 'Excluido com sucesso');
            this.buscarTarefas();
            this.fechaLoading();
        })
        .catch(erro => {
            console.log('Erro ao excluir: ', erro);
            this.mostrarMensagem(MENSAGEM.ERROR, null, erro.json());
            this.fechaLoading();
        });
    }

    cadastrarTarefa(): void {
        this.router.navigate([ROUTE_NAMES.TAREFA]);
    }
}