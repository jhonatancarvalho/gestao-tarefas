package br.com.jhonatan.tarefa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.jhonatan.tarefa.model.Tarefa;
import br.com.jhonatan.tarefa.repository.TarefaRepository;

@Service
public class TarefaService {

	@Autowired
	private TarefaRepository tarefaRepository;
	
	public Tarefa save(Tarefa tarefa) {
		return tarefaRepository.save(tarefa);
	}
	
	public void delete(Long id) {
		tarefaRepository.delete(id);
	}

	public Tarefa findById(Long id) {
		return tarefaRepository.findOne(id);
	}
	
	public List<Tarefa> findAll() {
		return tarefaRepository.findAll();
	}
	
}
