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
