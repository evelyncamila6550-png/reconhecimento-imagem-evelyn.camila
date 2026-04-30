#                                      CÓDIGO COM ERROS                           
# ENTRADA DE DADOS
cliente = input("Qual é seu nome? ")

qtd1 = int(input("Quantidade do item 1: "))
item1 = float(input("Preço do item 1? "))

qtd2 = int(input("Quantidade do item 2: "))
item2 = float(input("Preço do item 2? "))

qtd3 = int(input("Quantidade do item 3: "))
item3 = float(input("Preço do item 3? "))

# CÁLCULOS DOS ITENS
# Multiplica quantidade pela unidade para obter o total de cada item
total_item1 = qtd1 * item1
total_item2 = qtd2 * item2
total_item3 = qtd3 * item3

# Soma todos os itens antes de aplicar impostos e descontos
subtotal = total_item1 + total_item2 + total_item3
# Taxa de imposto fixada em 10% sobre o subtotal
imposto = subtotal * 0.10

# DESCONTO
desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
# Converte o percentual do cupom para desconto em valor real
desconto = subtotal * (desconto_cupom / 100)

# TOTAL FINAL
# Ordem importante: adiciona imposto e depois subtrai desconto
total = subtotal + imposto - desconto

# EXIBIÇÃO
# Define o tamanho da linha de separação para formatação visual
linha = "=" * 31
separador = "-" * 31

print(linha)
print(f" Cliente: {cliente}")
print(linha)
print(f" Item 1:        R$ {total_item1:.2f}")
print(f" Item 2:        R$ {total_item2:.2f}")
print(f" Item 3:        R$ {total_item3:.2f}")
print(separador)
print(f" Subtotal:      R$ {subtotal:.2f}")
print(f" Imposto (10%): R$ {imposto:.2f}")

# Apenas exibe a linha de desconto se o cliente realmente inseriu um cupom
if desconto_cupom > 0:
    print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")

print(linha)
print(f" TOTAL:         R$ {total:.2f}")
print(linha)