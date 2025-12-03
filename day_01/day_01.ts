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

function loopAddition(n: number, additive: number) {
  const added = n + additive
  const remainder = added - RULES.max

  if (remainder > 0) {
    return loopAddition(RULES.min, remainder - 1)
  } else {
    return added
  }
}

function loopSubtraction(n: number, subtractive: number) {
  const subtracted = n - subtractive
  const remainder = RULES.min - subtracted

  if (remainder > 0) {
    return loopSubtraction(RULES.max, remainder - 1)
  } else {
    return subtracted
  }
}

function executeCommand(dial: DialState["location"], command: Command) {
  // console.log("execute", dial, command)
  switch (command[0]) {
    case "left":
      return loopSubtraction(dial, command[1])
    case "right":
      return loopAddition(dial, command[1])
    case "set":
      return command[1]
    default:
      throw new Error(`Unusable rotation ${command}`)
  }
}

function execute(dial: DialState, command: Command) {
  const nextLocation = executeCommand(dial.location, command)

  if (nextLocation === 0) {
    return { location: nextLocation, zeroes: dial.zeroes + 1 }
  } else {
    return { location: nextLocation, zeroes: dial.zeroes }
  }
}

export function part1(input: string) {
  return input
    .trim()
    .split("\n")
    .reduce((state, line) => execute(state, parseCommand(line)), {
      location: RULES.initial,
      zeroes: 0,
    })
}
