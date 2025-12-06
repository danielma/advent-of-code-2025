export function* range(startIndex: number, endIndex: number) {
  for (let index = startIndex; index < endIndex; index++) {
    yield index
  }
}

export function sum(numbers: number[]) {
  return numbers.reduce((acc, num) => acc + num, 0)
}
