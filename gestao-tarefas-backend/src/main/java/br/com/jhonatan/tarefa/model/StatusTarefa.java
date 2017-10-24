package br.com.jhonatan.tarefa.model;

public enum StatusTarefa {

	PENDENTE("Pendente"),
	CONCLUIDA("Concluida");
	
	private String descricao;
	
	StatusTarefa(String descricao) {
		this.descricao = descricao;
	}
	
	public String getDescricao() {
		return descricao;
	}
	
}
