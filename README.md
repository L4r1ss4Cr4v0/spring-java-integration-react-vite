# Projeto Tarefas — Spring Boot + React (Vite)

CRUD simples de tarefas: backend em Spring Boot (MVC: Entity, Service, Controller)
e frontend em React + Vite usando apenas `useState`, `useEffect`, `fetch` e CSS puro.

## Comandos de criação e configuração do projeto

### 1. Pasta raiz e Git

```bash
mkdir projeto-tarefas
cd projeto-tarefas
git init -b main
```

### 2. Backend (Spring Boot)

Gera o projeto pelo Spring Initializr com as dependências Web, JPA e H2:

```bash
curl https://start.spring.io/starter.zip \
  -d type=maven-project \
  -d language=java \
  -d javaVersion=17 \
  -d groupId=com.exemplo \
  -d artifactId=tarefas \
  -d name=tarefas \
  -d packageName=com.exemplo.tarefas \
  -d dependencies=web,data-jpa,h2 \
  -o backend.zip

unzip backend.zip -d backend
rm backend.zip
```

(Ou pelo site https://start.spring.io com as mesmas opções.)

Cria as pastas da arquitetura MVC:

```bash
cd backend/src/main/java/com/exemplo/tarefas
mkdir entity repository service controller
cd -
```

Roda o backend (porta 8080):

```bash
cd backend
mvn spring-boot:run
```

### 3. Frontend (Vite + React + JS)

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev
```

O front sobe em http://localhost:5173.

### 4. .gitignore

```bash
cat > .gitignore <<'EOF'
backend/target/
frontend/node_modules/
frontend/dist/
.idea/
*.iml
.DS_Store
EOF
```

### 5. Primeiro commit e envio ao GitHub

```bash
git add .
git commit -m "Projeto inicial"
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
git push -u origin main
```

## Como rodar este repositório

```bash
# terminal 1 — backend (Java 17+ e Maven)
cd backend
mvn spring-boot:run

# terminal 2 — frontend (Node 18+)
cd frontend
npm install
npm run dev
```

Abra http://localhost:5173.

## Estrutura

```
backend/src/main/java/com/exemplo/tarefas/
├── TarefasApplication.java
├── entity/Tarefa.java
├── repository/TarefaRepository.java
├── service/TarefaService.java
└── controller/TarefaController.java

frontend/src/
├── main.jsx
├── App.jsx            # useState / useEffect
├── api.js             # chamadas fetch
├── index.css          # CSS puro
└── components/
    ├── TarefaForm.jsx
    └── TarefaItem.jsx
```

## Endpoints

| Método | Rota              | Descrição           |
|--------|-------------------|---------------------|
| GET    | /api/tarefas      | Lista todas         |
| GET    | /api/tarefas/{id} | Busca por id        |
| POST   | /api/tarefas      | Cria uma tarefa     |
| PUT    | /api/tarefas/{id} | Atualiza uma tarefa |
| DELETE | /api/tarefas/{id} | Exclui uma tarefa   |
