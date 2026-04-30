from __future__ import annotations

TEST_VALUES = [1, 2, 3, 4, 5, 16, 17, 18, 19, 20]


def is_prime(number: int) -> bool:
    """Verifica se um número inteiro é primo.
    
    Utiliza um algoritmo otimizado que verifica divisibilidade até a raiz
    quadrada do número, reduzindo a complexidade computacional.
    
    Args:
        number: Número inteiro a ser verificado.
    
    Returns:
        True se o número é primo, False caso contrário.
    
    Exemplos:
        >>> is_prime(2)
        True
        >>> is_prime(17)
        True
        >>> is_prime(4)
        False
        >>> is_prime(1)
        False
    """
    if number <= 1:
        return False
    if number <= 3:
        return True
    if number % 2 == 0 or number % 3 == 0:
        return False

    divisor = 5
    while divisor * divisor <= number:
        if number % divisor == 0 or number % (divisor + 2) == 0:
            return False
        divisor += 6

    return True


def format_prime_result(number: int) -> str:
    """Format the result for printing."""
    status = "primo" if is_prime(number) else "não primo"
    return f"{number}: {status}"


def main() -> None:
    for value in TEST_VALUES:
        print(format_prime_result(value))


if __name__ == "__main__":
    main()
