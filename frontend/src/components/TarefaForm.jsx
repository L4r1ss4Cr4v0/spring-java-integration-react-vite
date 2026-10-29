import { useState } from 'react'

function TarefaForm({ onCriar }) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(evento) {
    evento.preventDefault()
    if (!titulo.trim()) return

    setEnviando(true)
    await onCriar({ titulo: titulo.trim(), descricao: descricao.trim() })
    setEnviando(false)
    setTitulo('')
    setDescricao('')
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="O que precisa ser feito?"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <button type="submit" disabled={enviando || !titulo.trim()}>
        {enviando ? 'Salvando...' : 'Adicionar'}
      </button>
    </form>
  )
}

export default TarefaForm
