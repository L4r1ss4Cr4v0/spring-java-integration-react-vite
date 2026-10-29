// Comunicação com o backend Spring Boot usando fetch nativo (sem axios)
const API_URL = 'http://localhost:8080/api/tarefas'

async function tratarResposta(resposta) {
  if (!resposta.ok) {
    let mensagem = `Erro ${resposta.status}`
    try {
      const corpo = await resposta.json()
      if (corpo.erro) mensagem = corpo.erro
    } catch {
      // resposta sem corpo JSON
    }
    throw new Error(mensagem)
  }
  if (resposta.status === 204) return null
  return resposta.json()
}

export async function listarTarefas() {
  const resposta = await fetch(API_URL)
  return tratarResposta(resposta)
}

export async function criarTarefa(tarefa) {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarefa),
  })
  return tratarResposta(resposta)
}

export async function atualizarTarefa(id, tarefa) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarefa),
  })
  return tratarResposta(resposta)
}

export async function excluirTarefa(id) {
  const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  return tratarResposta(resposta)
}
