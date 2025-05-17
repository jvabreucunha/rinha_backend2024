# Rinha de Backend 2024/Q1 – Projeto de API

## Visão Geral

Este repositório contém a minha submissão para a **Rinha de Backend 2024/Q1**, um desafio de controle de concorrência em um cenário de créditos e débitos. O objetivo principal é demonstrar:

- **Consistência de saldo** sob concorrência  
- Uso de **containers** (Docker & docker-compose) com limites de CPU/memória  
- Automação do ambiente de testes  

---

## Endpoints

### 1. Criar Transação

`POST /clientes/:id/transacoes`

**Request Body**

```json
{
  "valor": 1000,        // em centavos (inteiro > 0)
  "tipo": "c",          // c = crédito, d = débito
  "descricao": "texto"  // 1 a 10 caracteres
}
```
### Responses

**200 OK**

```json
{
  "limite": 100000,   // limite cadastrado (em centavos)
  "saldo": -9098      // novo saldo (em centavos)
}
```

**422 Unprocessable Entity**

- Débito que excede o limite
- Payload inválido (tipo, valor ou descrição fora das regras)

**404 Not Found**

- Cliente não cadastrado

### 2. Consultar Extrato

`GET /clientes/:id/extratp`

### Responses

**200 OK**

```json
{
  "saldo": {
    "total": -9098,                     // saldo atual
    "data_extrato": "2024-03-07T19:00Z",
    "limite": 100000
  },
  "ultimas_transacoes": [
    {
      "valor": 10,
      "tipo": "c",
      "descricao": "pagamento",
      "realizada_em": "2024-03-07T18:59Z"
    }
    // até 10 últimas, em ordem decrescente de data
  ]
}

```

**404 Not Found**

- Cliente não cadastrado

# Clientes Pré-Cadastrados

Ao subir a API, já existem 5 clientes pré-cadastrados com os seguintes limites e saldo inicial:

| ID  | Limite (centavos) | Saldo Inicial |
|-----|--------------------|----------------|
| 1   | 100 000            | 0              |
| 2   | 80 000             | 0              |
| 3   | 1 000 000          | 0              |
| 4   | 10 000 000         | 0              |
| 5   | 500 000            | 0              |
|-----|--------------------|----------------|

