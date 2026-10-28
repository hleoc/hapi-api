# Hapi API

API REST para gerenciamento de empresas, candidatos, vagas e candidaturas. O projeto usa Hapi 16, MongoDB com Mongoose e autenticação JWT.

## Requisitos

- Node.js e npm
- MongoDB em execução local, por padrão em `mongodb://localhost:27017/hapi_db`

## Instalação e execução

Instale as dependências:

```bash
npm install
```

Inicie a API em modo de desenvolvimento, com reinicialização automática:

```bash
npm run dev
```

Por padrão, a API fica disponível em `http://127.0.0.1:3000`. A interface Swagger fica em `http://127.0.0.1:3000/documentation`.

## Configuração

As configurações atuais estão no código:

- `config/development.js`: host (`127.0.0.1`), porta (`3000`) e segredo JWT (`123`).
- `config/plugins.js`: URI do MongoDB (`mongodb://localhost:27017/hapi_db`).

Altere esses valores nos respectivos arquivos para usar outro ambiente. O segredo JWT fornecido é apenas um valor de desenvolvimento; configure um segredo forte antes de disponibilizar a API em produção.

## Autenticação

Crie uma conta em `POST /users/signup` e faça login em `POST /user/login`. O login retorna um token JWT válido por um dia:

```json
{
  "token": "<jwt>"
}
```

Envie o token nas rotas protegidas usando o cabeçalho:

```http
Authorization: Bearer <jwt>
```

## Rotas

| Método | Caminho | Acesso | Descrição |
| --- | --- | --- | --- |
| `POST` | `/users/signup` | Público | Cria uma conta |
| `POST` | `/user/login` | Público | Autentica e retorna um JWT |
| `GET` | `/companies` | JWT | Lista empresas |
| `POST` | `/companies` | JWT | Cria uma empresa |
| `GET` | `/company/{id}` | JWT | Consulta uma empresa |
| `PUT` | `/company/{id}` | JWT | Atualiza uma empresa |
| `DELETE` | `/company/{id}` | JWT | Exclui uma empresa |
| `GET` | `/candidates` | JWT | Lista candidatos |
| `POST` | `/candidates` | JWT | Cria um candidato |
| `GET` | `/jobs` | JWT | Lista vagas |
| `POST` | `/jobs` | JWT | Cria uma vaga |
| `GET` | `/applications` | JWT | Lista candidaturas |
| `POST` | `/applications` | JWT | Cria uma candidatura |

## Exemplos

Cadastro e login:

```bash
curl -X POST http://127.0.0.1:3000/users/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"pessoa@example.com","password":"senha-segura"}'

curl -X POST http://127.0.0.1:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"pessoa@example.com","password":"senha-segura"}'
```

Criação de empresa com o token retornado pelo login:

```bash
curl -X POST http://127.0.0.1:3000/companies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt>" \
  -d '{"name":"Acme","city":"São Paulo","address":"Rua Exemplo, 100"}'
```

Para criar um candidato, envie `first_name`, `last_name`, `email` e `company` (ID da empresa). Para criar uma vaga, envie `title` e `company`. Para criar uma candidatura, envie `job` e `candidate` (IDs correspondentes); `hired` é opcional.

## Testes

Não há suíte de testes configurada no momento. O script `npm test` retorna uma mensagem de teste não especificado.