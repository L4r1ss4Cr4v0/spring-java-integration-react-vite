package com.exemplo.tarefas.service;

import com.exemplo.tarefas.entity.Tarefa;
import com.exemplo.tarefas.repository.TarefaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {

    private final TarefaRepository repository;

    public TarefaService(TarefaRepository repository) {
        this.repository = repository;
    }

    public List<Tarefa> listarTodas() {
        return repository.findAll();
    }

    public Optional<Tarefa> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Tarefa criar(Tarefa tarefa) {
        if (tarefa.getTitulo() == null || tarefa.getTitulo().isBlank()) {
            throw new IllegalArgumentException("O título é obrigatório");
        }
        tarefa.setId(null);
        return repository.save(tarefa);
    }

    public Optional<Tarefa> atualizar(Long id, Tarefa dados) {
        return repository.findById(id).map(tarefa -> {
            if (dados.getTitulo() != null && !dados.getTitulo().isBlank()) {
                tarefa.setTitulo(dados.getTitulo());
            }
            tarefa.setDescricao(dados.getDescricao());
            tarefa.setConcluida(dados.isConcluida());
            return repository.save(tarefa);
        });
    }

    public boolean excluir(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
