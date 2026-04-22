from typing import List, Tuple


def calculate_statistics(numbers: List[float]) -> Tuple[float, float, float, float]:
    """
    Calculate basic statistics for a list of numbers.

    Args:
        numbers: A list of numeric values.

    Returns:
        A tuple containing (total, average, maximum, minimum).

    Raises:
        ValueError: If the input list is empty.
    """
    if not numbers:
        raise ValueError("The list cannot be empty.")

    total = sum(numbers)
    average = total / len(numbers)
    maximum = max(numbers)
    minimum = min(numbers)

    return total, average, maximum, minimum


def main() -> None:
    """Main function to demonstrate the statistics calculation."""
    sample_numbers = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
    total, average, maximum, minimum = calculate_statistics(sample_numbers)

    print(f"Total: {total}")
    print(f"Average: {average}")
    print(f"Maximum: {maximum}")
    print(f"Minimum: {minimum}")


if __name__ == "__main__":
    main()