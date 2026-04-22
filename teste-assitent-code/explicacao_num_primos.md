# Explicação Técnica do Código de Verificação de Primos

Este arquivo descreve o funcionamento do código em `num-primos.py` e as escolhas de estilo usadas para manter o código limpo.

## Objetivo

O programa define a função `is_prime(number)` para verificar se um inteiro é primo. Um número primo é um inteiro maior que 1 que possui exatamente dois divisores positivos: 1 e ele mesmo.

## Estrutura do código limpo

- `TEST_VALUES` é uma constante global usada apenas para os valores de demonstração.
- `is_prime(number: int) -> bool` faz a verificação principal.
- `format_prime_result(number: int) -> str` separa a formatação da saída.
- `main() -> None` agrupa o fluxo de execução do script.
- O bloco `if __name__ == "__main__":` garante que o código de teste seja executado somente quando o arquivo for executado diretamente.

## Passo a passo do algoritmo

1. `if number <= 1:
       return False`
   - Números menores ou iguais a 1 não são primos.

2. `if number <= 3:
       return True`
   - 2 e 3 são primos e são tratados como casos base.

3. `if number % 2 == 0 or number % 3 == 0:
       return False`
   - Verifica rapidamente os múltiplos de 2 e de 3.
   - Isso elimina metade dos números pares e os múltiplos de 3.

4. `divisor = 5`
   - Inicializa o teste de divisores a partir de 5, depois de já ter verificado 2 e 3.

5. `while divisor * divisor <= number:`
   - A condição usa a raiz quadrada de `number` para reduzir a quantidade de verificações.
   - Se não houver divisor menor ou igual à raiz quadrada, não haverá divisor maior que não seja complementar.

6. `if number % divisor == 0 or number % (divisor + 2) == 0:
       return False`
   - Verifica pares de candidatos à forma `6k - 1` e `6k + 1`.
   - Isso é suficiente para encontrar divisores não triviais sem testar todos os números ímpares.

7. `divisor += 6`
   - Avança para o próximo par de candidatos primos.
   - Exemplo: 5 e 7, então 11 e 13, depois 17 e 19.

8. `return True`
   - Se nenhum divisor é encontrado, o número é primo.

## Bloco principal de execução

O trecho principal foi organizado em funções para manter responsabilidades separadas:

```python
def format_prime_result(number: int) -> str:
    status = "primo" if is_prime(number) else "não primo"
    return f"{number}: {status}"


def main() -> None:
    for value in TEST_VALUES:
        print(format_prime_result(value))
```

- `format_prime_result` cuida apenas da formatação da saída.
- `main` cuida apenas da execução do fluxo de teste.

## Complexidade

- Tempo: o algoritmo tem complexidade aproximada `O(√n)`.
- Espaço: usa `O(1)` memória adicional.

## Vantagens do código limpo

- nomes de funções e variáveis significativos melhoram a leitura.
- lógica separada em funções pequenas facilita manutenção.
- o `if __name__ == "__main__"` deixa o módulo reutilizável sem executar o teste automaticamente.
- o algoritmo continua eficiente para verificar números primos individuais.
