---
title: "Encurtador de URL de Alta Performance"
description: "Um clone do bit.ly construído com Go e Redis para suportar 10k pedidos por segundo."
date: 2024-01-20
techStack: ["Go", "Redis", "Docker", "Nginx"]
githubUrl: "https://github.com/teu-user/url-shortener"
tags: ["hash", "url", "encode", "encription"]
---

Para o meu projeto final de Computação na Cloud, decidi criar um encurtador de links focado em **performance**. O objetivo era aprender a lidar com cache distribuída.

## A Arquitetura

O sistema é composto por 3 contentores Docker:
* **API (Go):** Recebe o pedido e gera um hash curto (Base62).
* **Cache (Redis):** Guarda o par `hash -> url_original` para acesso O(1).
* **Persistência (Postgres):** Guarda os dados permanentemente caso o Redis caia.

## Desafio: Colisões de Hash

Um dos problemas foi garantir que não gerava o mesmo código para URLs diferentes. Usei o algoritmo de codificação Base62.

```go
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

func Encode(id uint64) string {
    if id == 0 {
        return string(alphabet[0])
    }
    s := ""
    for id > 0 {
        s = string(alphabet[id%62]) + s
        id = id / 62
    }
    return s
}