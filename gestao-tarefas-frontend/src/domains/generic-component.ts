import { MENSAGEM } from '../constants/mensagem.constants';

declare var $ :any;

export class GenericComponent {

    mensagem: {tipo: string, titulo: string, texto: string, timeout: number, timeoutAfterMouse: number, listaMensagens: Array<any>};

    mostrarMensagem(tipo: string, texto: string, erro?, timeout?: number): void {
        let mensagem = {
            tipo: tipo,
            titulo: erro && erro.mensagensDeErro && erro.mensagensDeErro.length > 0 ? erro.tituloDoErro : undefined,
            texto: erro && erro.tituloDoErro ? erro.tituloDoErro : texto,
            timeout: timeout ? timeout : undefined,
            timeoutAfterMouse: undefined,
            listaMensagens: erro
        };
        this.mensagem = mensagem;
    }

    abreLoading(): void {
        $("#loading").show();
    }

    fechaLoading(): void {
        $("#loading").hide();
    }

}