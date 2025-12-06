export function* range(startIndex: number, endIndex: number) {
  for (let index = startIndex; index < endIndex; index++) {
    yield index
  }
}

export function sum(numbers: number[]) {
  return numbers.reduce((acc, num) => acc + num, 0)
}

interface Reducable<T> {
  reduce: IteratorObject<T>["reduce"]
}

export function filterMap<T, F>(
  iterable: Reducable<T>,
  iterate: (item: T, index: number) => F | null | undefined
) {
  return iterable.reduce((acc, elem, index) => {
    const result = iterate(elem, index)

    if (result) acc.push(result)

    return acc
  }, [] as F[])
}
