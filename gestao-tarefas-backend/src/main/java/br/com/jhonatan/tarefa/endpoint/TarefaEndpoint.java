package br.com.jhonatan.tarefa.endpoint;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.jhonatan.tarefa.model.Tarefa;
import br.com.jhonatan.tarefa.service.TarefaService;

@RestController
@RequestMapping("/tarefas")
public class TarefaEndpoint extends BaseEndpoint {

	@Autowired
	private TarefaService tarefaService;
	
	@PostMapping
	public ResponseEntity<Tarefa> salvaTarefa(@Valid @RequestBody Tarefa tarefa) {
		return ResponseEntity.ok(tarefaService.save(tarefa));
	}
	
	@PutMapping
	public ResponseEntity<Tarefa> atualizaTarefa(@Valid @RequestBody Tarefa tarefa) {
		return ResponseEntity.ok(tarefaService.save(tarefa));
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Tarefa> deletarTarefa(@PathVariable Long id) {
		tarefaService.delete(id);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Tarefa> buscarTarefa(@PathVariable Long id) {
		return ResponseEntity.ok(tarefaService.findById(id));
	}
	
	@GetMapping
	public List<Tarefa> buscaTarefas() {
		return tarefaService.findAll();
	}
}
