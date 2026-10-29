import { useState } from 'react'

function TarefaItem({ tarefa, onAlternar, onEditar, onExcluir }) {
  const [editando, setEditando] = useState(false)
  const [titulo, setTitulo] = useState(tarefa.titulo)
  const [descricao, setDescricao] = useState(tarefa.descricao || '')

  async function salvar() {
    if (!titulo.trim()) return
    await onEditar(tarefa.id, {
      ...tarefa,
      titulo: titulo.trim(),
      descricao: descricao.trim(),
    })
    setEditando(false)
  }

  function cancelar() {
    setTitulo(tarefa.titulo)
    setDescricao(tarefa.descricao || '')
    setEditando(false)
  }

  if (editando) {
    return (
      <li className="item editando">
        <div className="campos-edicao">
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <input
            value={descricao}
            placeholder="Descrição"
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="acoes">
          <button className="btn-salvar" onClick={salvar}>Salvar</button>
          <button className="btn-secundario" onClick={cancelar}>Cancelar</button>
        </div>
      </li>
    )
  }

  return (
    <li className={tarefa.concluida ? 'item concluida' : 'item'}>
      <label className="conteudo">
        <input
          type="checkbox"
          checked={tarefa.concluida}
          onChange={() => onAlternar(tarefa)}
        />
        <div>
          <strong>{tarefa.titulo}</strong>
          {tarefa.descricao && <p>{tarefa.descricao}</p>}
        </div>
      </label>
      <div className="acoes">
        <button className="btn-secundario" onClick={() => setEditando(true)}>Editar</button>
        <button className="btn-excluir" onClick={() => onExcluir(tarefa.id)}>Excluir</button>
      </div>
    </li>
  )
}

export default TarefaItem
