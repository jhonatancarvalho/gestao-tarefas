package br.com.jhonatan.tarefa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.jhonatan.tarefa.model.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

}
