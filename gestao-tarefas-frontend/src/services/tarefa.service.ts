import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Tarefa } from '../models/tarefa.model';

import { ServiceInterface } from './service.interface';

@Injectable()
export class TarefaService implements ServiceInterface<Tarefa> {

    constructor(
        private http: Http
    ) {}

    validate() {
        
    }

    findAll(): Promise<Tarefa[]> {
        return this.http.get("")
            .toPromise()
            .then((response: Response) => response.json() as Tarefa[])
            .catch(this.handleError);
    }

    find(id: string): Promise<Tarefa> {
        const url = `/${id}`;
        return this.http.get(url)
            .toPromise()
            .then((response: Response) => response.json() as Tarefa)
            .catch(this.handleError);
    }

    create(tarefa: Tarefa): Promise<Tarefa> {
        return this.http
            .post("", JSON.stringify(tarefa, this.replacerNull))
            .toPromise()
            .then((response: Response) => response.json() as Tarefa)
            .catch(this.handleError);
    }

    update(tarefa: Tarefa): Promise<Tarefa> {
        return this.http
            .put("", JSON.stringify(tarefa, this.replacerNull))
            .toPromise()
            .then(() => tarefa as Tarefa)
            .catch(this.handleError);
    }

    delete(id: string): Promise<Tarefa> {
        const url = `/${id}`;

        return this.http
            .delete(url)
            .toPromise()
            .then()
            .catch(this.handleError);
    }

    search(term: string): Observable<Tarefa[]>{
        return this.http
            .get("")
            .map((res: Response) => {
                let listaFuncoes = res.json() as Tarefa[];
                return listaFuncoes.filter(tarefa => tarefa.titulo.toLowerCase().indexOf(term.toLowerCase()) >= 0);
            });
    }
    
    private handleError(err: any): Promise<any> {
        return Promise.reject(err.message || err);
    }

    private replacerNull(key, value) {
        if (value === null || value === '') {
            return undefined;
        }
        return value;
    }
}