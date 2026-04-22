# Explicação dos Erros no Código debug.py

## Erros Identificados

1. **Linha 5: Falta de aspas na string do input**
   - Código: `item1 = float(input(Preço do item 1? ))`
   - Problema: A string "Preço do item 1? " não está entre aspas duplas ou simples. Isso causa um erro de sintaxe porque o Python não reconhece "Preço" como uma string válida.
   - Correção: Adicionar aspas: `item1 = float(input("Preço do item 1? "))`

2. **Linhas 17-18: Uso incorreto de variável string em operações numéricas**
   - Código: `desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))` e `desconto = subtotal * (desconto_cupom / 100)`
   - Problema: `input()` retorna uma string, mas `desconto_cupom` é usado em divisão e multiplicação, que esperam números. Isso causa um TypeError.
   - Correção: Converter para float: `desconto_cupom = float(input(...))`

3. **Linha 27: Falta de 'f' no f-string**
   - Código: `print(" Item 2:        R$ {total_item2:.2f}")`
   - Problema: Está usando aspas duplas sem o prefixo 'f', então `{total_item2:.2f}` não será interpolado. Será impresso literalmente.
   - Correção: Adicionar 'f': `print(f" Item 2:        R$ {total_item2:.2f}")`

4. **Linha 31: Comparação inválida entre string e número**
   - Código: `if desconto_cupom > 0:`
   - Problema: `desconto_cupom` é uma string (antes da correção), e não pode ser comparado diretamente com um inteiro. Mesmo após correção, se o usuário digitar algo não numérico, pode causar erro.
   - Correção: Após converter para float, a comparação funcionará, mas adicionar tratamento de erro seria ideal.

5. **Linha 32: Formatação inválida em f-string**
   - Código: `print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")`
   - Problema: `desconto_cupom` é string, e `.0f` é formatação para float. Mesmo após correção, se for float, está ok, mas o contexto é que era string.
   - Correção: Após converter `desconto_cupom` para float, funcionará.

6. **Linha 35: Formatação redundante**
   - Código: `print(f" TOTAL:         R$ {round(total, 2):.2f}")`
   - Problema: `round(total, 2)` já arredonda para 2 casas decimais, e `: .2f` formata novamente. É redundante, mas funciona. Melhor usar apenas `{total:.2f}`.

## Observações Gerais
- O código tem problemas de indentação em algumas partes, mas principalmente os erros acima impedem a execução.
- Recomenda-se adicionar tratamento de erros para entradas inválidas (ex: try-except para conversões).
- Após correções, o código deve funcionar corretamente para calcular totais com itens, imposto e desconto.