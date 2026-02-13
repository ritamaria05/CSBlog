---
title: "O Teorema CAP Explicado"
description: "Porque é que não podes ter Consistência, Disponibilidade e Tolerância a Falhas ao mesmo tempo em Sistemas Distribuídos."
date: 2024-02-13
tags: ["sistemas-distribuidos", "arquitetura", "bases-de-dados"]
---

Em Sistemas Distribuídos, o **Teorema CAP** afirma que é impossível garantir mais do que duas das seguintes três propriedades simultaneamente:

1.  **C (Consistency):** Todos os clientes veem os mesmos dados ao mesmo tempo.
2.  **A (Availability):** Qualquer cliente que faça um pedido recebe uma resposta (mesmo que alguns nós estejam em baixo).
3.  **P (Partition Tolerance):** O sistema continua a funcionar mesmo que a rede falhe e corte a comunicação entre nós.

## A Regra de Ouro

> Num sistema distribuído sobre uma rede não fiável, **tens de escolher P**. A rede vai falhar.

Portanto, a escolha real é entre **CP** (Consistência) ou **AP** (Disponibilidade).

### Exemplo em Código (Pseudo-código)

Imagina que tens dois nós de base de dados. Se a rede entre eles cair, tens de decidir:

```python
def handle_write_request(data):
    if network_is_down():
        # Opção AP: Aceita a escrita, mas o outro nó fica desatualizado
        return save_locally(data) 
        
        # Opção CP: Recusa a escrita para garantir que os dados são iguais
        # return error("Sistema Indisponível para manter consistência")
    else:
        return replicate_to_all_nodes(data)