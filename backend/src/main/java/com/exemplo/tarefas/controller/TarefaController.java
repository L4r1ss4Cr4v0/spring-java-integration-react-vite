package com.exemplo.tarefas.controller;

import com.exemplo.tarefas.entity.Tarefa;
import com.exemplo.tarefas.service.TarefaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tarefas")
@CrossOrigin(origins = "http://localhost:5173") // libera o front do Vite
public class TarefaController {

    private final TarefaService service;

    public TarefaController(TarefaService service) {
        this.service = service;
    }

    // GET /api/tarefas
    @GetMapping
    public List<Tarefa> listar() {
        return service.listarTodas();
    }

    // GET /api/tarefas/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/tarefas
    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Tarefa tarefa) {
        try {
            Tarefa nova = service.criar(tarefa);
            return ResponseEntity.status(HttpStatus.CREATED).body(nova);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    // PUT /api/tarefas/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizar(@PathVariable Long id, @RequestBody Tarefa tarefa) {
        return service.atualizar(id, tarefa)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/tarefas/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        return service.excluir(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
