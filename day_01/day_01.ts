const RULES = { initial: 50, min: 0, max: 99 }

type DialState = { location: number; zeroes: number }
type Command = ["left", number] | ["right", number] | ["set", number]

function parseCommand(line: string): Command {
  switch (line[0]) {
    case "L":
      return ["left", parseInt(line.slice(1), 10)]
    case "R":
      return ["right", parseInt(line.slice(1), 10)]
    case "S":
      return ["set", parseInt(line.slice(1), 10)]
    default:
      throw new Error(`Unusable input: ${line}`)
  }
}

function loopAddition(n: number, additive: number, loops = 0): DialState {
  const added = n + additive
  const remainder = added - RULES.max

  if (remainder > 0) {
    return loopAddition(RULES.min, remainder - 1, loops + 1)
  } else {
    return { location: added, zeroes: loops }
  }
}

function loopSubtraction(n: number, subtractive: number, loops = 0): DialState {
  const subtracted = n - subtractive
  const remainder = RULES.min - subtracted
  const nextLoops = RULES.min < n && subtracted <= RULES.min ? loops + 1 : loops

  if (remainder > 0) {
    return loopSubtraction(RULES.max, remainder - 1, nextLoops)
  } else {
    return { location: subtracted, zeroes: nextLoops }
  }
}

function executeCommand(
  dial: DialState["location"],
  command: Command
): DialState {
  switch (command[0]) {
    case "left":
      return loopSubtraction(dial, command[1])
    case "right":
      return loopAddition(dial, command[1])
    case "set":
      return { location: command[1], zeroes: 0 }
    default:
      throw new Error(`Unusable rotation ${command}`)
  }
}

function executePartOne(dial: DialState, command: Command) {
  const nextState = executeCommand(dial.location, command)

  if (nextState.location === 0) {
    return { location: nextState.location, zeroes: dial.zeroes + 1 }
  } else {
    return { location: nextState.location, zeroes: dial.zeroes }
  }
}

function executePartTwo(dial: DialState, command: Command) {
  // console.log("state", dial)
  // console.log(command)
  const nextState = executeCommand(dial.location, command)

  return {
    location: nextState.location,
    zeroes: dial.zeroes + nextState.zeroes,
  }
}

export function part1(input: string) {
  return input
    .trim()
    .split("\n")
    .reduce((state, line) => executePartOne(state, parseCommand(line)), {
      location: RULES.initial,
      zeroes: 0,
    })
}

export function part2(input: string) {
  return input
    .trim()
    .split("\n")
    .reduce((state, line) => executePartTwo(state, parseCommand(line)), {
      location: RULES.initial,
      zeroes: 0,
    })
}
