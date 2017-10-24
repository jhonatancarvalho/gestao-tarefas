export class Tarefa {

    constructor(
        public id: string,
        public titulo: string,
        public descricao: string,
        public dataCriacao: Date,
        public status: string
    ) {}

}