# Projeto de Aprendizado em Python - Teste Assistente de Código

Um projeto educacional demonstrando conceitos de Python com foco em algoritmos, debugging, refatoração e boas práticas de codificação.

## 📋 Descrição

Este projeto contém exemplos práticos de código Python para fins de aprendizado, incluindo:
- Implementação de algoritmos (verificação de números primos)
- Identificação e correção de erros
- Refatoração de código
- Boas práticas de documentação com docstrings

## 📁 Estrutura do Projeto

```
teste-assitent-code/
├── num-primos.py              # Verificador de números primos otimizado
├── debug.py                   # Calculadora de compras com erros intencionais
├── refatoracao.py             # Cálculo de estatísticas refatorado
├── explicacao_num_primos.md   # Documentação técnica do algoritmo de primos
├── explicacao-debug.md        # Lista de erros e soluções
├── explicacao-refatoracao.md  # Explicação da refatoração
└── README.md                  # Este arquivo
```

## 🚀 Como Executar

### 1. Verificador de Números Primos

**Arquivo:** `num-primos.py`

```bash
python num-primos.py
```

**O que faz:**
- Verifica quais números da lista `[1, 2, 3, 4, 5, 16, 17, 18, 19, 20]` são primos
- Imprime cada número com seu status (primo ou não primo)

**Saída esperada:**
```
1: não primo
2: primo
3: primo
4: não primo
5: primo
16: não primo
17: primo
18: não primo
19: primo
20: não primo
```

**Características técnicas:**
- Algoritmo otimizado com complexidade O(√n)
- Usa type hints para melhor compreensão
- Docstring em estilo Google (português)
- Separação de responsabilidades (lógica, formatação, execução)

### 2. Calculadora de Compras (Debugging)

**Arquivo:** `debug.py`

```bash
python debug.py
```

**O que faz:**
- Solicita dados de cliente e 3 itens
- Calcula subtotal, imposto (10%) e desconto
- Exibe recibo formatado

**Exemplo de entrada:**
```
Qual é seu nome? João
Quantidade do item 1: 2
Preço do item 1? 10.50
Quantidade do item 2: 1
Preço do item 2? 25.00
Quantidade do item 3: 3
Preço do item 3? 5.99
Você tem um cupom de desconto? (Digite o percentual ou 0): 10
```

**Propósito educacional:**
- Contém comentários inline explicando decisões de lógica
- Demonstra cálculos com valores monetários
- Mostra formatação de strings com f-strings

### 3. Calculadora de Estatísticas (Refatoração)

**Arquivo:** `refatoracao.py`

```bash
python refatoracao.py
```

**O que faz:**
- Calcula estatísticas de uma lista de números: total, média, máximo e mínimo
- Exemplo com 10 valores numéricos

**Saída esperada:**
```
Total: 346
Average: 34.6
Maximum: 89
Minimum: 2
```

**Melhorias na refatoração:**
- Uso de type hints para clareza
- Docstrings descritivas
- Tratamento de erros (ValueError para lista vazia)
- Nomes de variáveis significativos
- Separação clara de responsabilidades

## 📖 Documentação Técnica

### Explicação do Algoritmo de Primos

Para entender como o verificador de primos funciona, consulte [explicacao_num_primos.md](explicacao_num_primos.md).

**Tópicos cobertos:**
- Objetivo e estrutura do código
- Passo a passo do algoritmo
- Otimizações utilizadas (verificação até √n, padrão 6k±1)

### Guia de Debugging

Para aprender sobre erros comuns em Python, consulte [explicacao-debug.md](explicacao-debug.md).

**Erros demonstrados:**
- Falta de aspas em strings
- Conversão de tipos inválida
- Uso incorreto de f-strings
- Comparações entre tipos incompatíveis

### Refatoração de Código

Para entender as melhorias realizadas, consulte [explicacao-refatoracao.md](explicacao-refatoracao.md).

**Conceitos abordados:**
- Transição de variáveis com nomes curtos para nomes descritivos
- Uso de type hints
- Docstrings profissionais
- Tratamento de exceções

## 🔧 Requisitos

- Python 3.7 ou superior
- Nenhuma dependência externa

## 💡 Conceitos de Aprendizado

Este projeto demonstra:

1. **Algoritmos**: Implementação eficiente de verificação de primos
2. **Type Hints**: Anotações de tipo para melhor compreensão de código
3. **Docstrings**: Documentação em estilo Google
4. **Debugging**: Identificação e correção de erros
5. **Refatoração**: Melhorias de código e legibilidade
6. **Boas Práticas**:
   - Separação de responsabilidades
   - Nomenclatura significativa
   - Comentários estratégicos
   - Formatação profissional

## 📝 Notas Importantes

- **debug.py**: Contém comentários detalhados que explicam decisões de lógica sem comentar linhas óbvias
- **num-primos.py**: Inclui exemplos práticos na docstring para facilitar compreensão
- **refatoracao.py**: Demonstra refatoração completa com melhorias de nomenclatura e tipo

## 🎯 Objetivos Educacionais

- Entender como funcionam algoritmos otimizados
- Aprender a identificar e corrigir erros de programação
- Melhorar a qualidade do código através de refatoração
- Escrever documentação clara e profissional
- Utilizar type hints para código mais robusto

## 📧 Autor

Evelyn Camila - Projeto Educacional

## 📄 Licença

Este projeto é fornecido para fins educacionais.

---

**Dica:** Comece pelo `num-primos.py` para entender um algoritmo bem implementado, depois estude o `debug.py` para aprender sobre erros comuns, e finalize com `refatoracao.py` para ver como melhorar código existente.
