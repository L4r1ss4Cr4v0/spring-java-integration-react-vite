import { useState, useEffect } from 'react'
import TarefaForm from './components/TarefaForm.jsx'
import TarefaItem from './components/TarefaItem.jsx'
import {
  listarTarefas,
  criarTarefa,
  atualizarTarefa,
  excluirTarefa,
} from './api.js'

function App() {
  const [tarefas, setTarefas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [filtro, setFiltro] = useState('todas')

  // Busca as tarefas uma vez, quando o componente é montado
  useEffect(() => {
    carregarTarefas()
  }, [])

  // Atualiza o título da aba sempre que a lista muda
  useEffect(() => {
    const pendentes = tarefas.filter((t) => !t.concluida).length
    document.title = pendentes > 0 ? `(${pendentes}) Minhas Tarefas` : 'Minhas Tarefas'
  }, [tarefas])

  async function carregarTarefas() {
    try {
      setCarregando(true)
      setErro('')
      const dados = await listarTarefas()
      setTarefas(dados)
    } catch (e) {
      setErro('Não foi possível conectar ao backend. Ele está rodando na porta 8080?')
    } finally {
      setCarregando(false)
    }
  }

  async function handleCriar(novaTarefa) {
    try {
      const criada = await criarTarefa(novaTarefa)
      setTarefas((atual) => [...atual, criada])
      setErro('')
    } catch (e) {
      setErro(e.message)
    }
  }

  async function handleAlternar(tarefa) {
    try {
      const atualizada = await atualizarTarefa(tarefa.id, {
        ...tarefa,
        concluida: !tarefa.concluida,
      })
      setTarefas((atual) => atual.map((t) => (t.id === atualizada.id ? atualizada : t)))
    } catch (e) {
      setErro(e.message)
    }
  }

  async function handleEditar(id, dados) {
    try {
      const atualizada = await atualizarTarefa(id, dados)
      setTarefas((atual) => atual.map((t) => (t.id === atualizada.id ? atualizada : t)))
    } catch (e) {
      setErro(e.message)
    }
  }

  async function handleExcluir(id) {
    try {
      await excluirTarefa(id)
      setTarefas((atual) => atual.filter((t) => t.id !== id))
    } catch (e) {
      setErro(e.message)
    }
  }

  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === 'pendentes') return !t.concluida
    if (filtro === 'concluidas') return t.concluida
    return true
  })

  const totalConcluidas = tarefas.filter((t) => t.concluida).length

  return (
    <div className="container">
      <header className="cabecalho">
        <h1>Minhas Tarefas</h1>
        <p className="resumo">
          {totalConcluidas} de {tarefas.length} concluídas
        </p>
      </header>

      <TarefaForm onCriar={handleCriar} />

      {erro && (
        <div className="erro">
          <span>{erro}</span>
          <button onClick={carregarTarefas}>Tentar de novo</button>
        </div>
      )}

      <div className="filtros">
        {['todas', 'pendentes', 'concluidas'].map((f) => (
          <button
            key={f}
            className={filtro === f ? 'filtro ativo' : 'filtro'}
            onClick={() => setFiltro(f)}
          >
            {f === 'todas' ? 'Todas' : f === 'pendentes' ? 'Pendentes' : 'Concluídas'}
          </button>
        ))}
      </div>

      {carregando ? (
        <p className="vazio">Carregando...</p>
      ) : tarefasFiltradas.length === 0 ? (
        <p className="vazio">Nenhuma tarefa por aqui.</p>
      ) : (
        <ul className="lista">
          {tarefasFiltradas.map((tarefa) => (
            <TarefaItem
              key={tarefa.id}
              tarefa={tarefa}
              onAlternar={handleAlternar}
              onEditar={handleEditar}
              onExcluir={handleExcluir}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
