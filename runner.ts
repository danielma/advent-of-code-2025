console.log("Reading from STDIN")

const day = Bun.argv[2]
const part = Bun.argv[3]

if (!day || !part) {
  throw new Error("You gotta pick a day and part!")
}

const exports = await import(`./${day}/${day}`)

const text = await Bun.stdin.text()

switch (part) {
  case "1":
    console.log(exports.part1(text))
    break
  case "2":
    console.log(exports.part2(text))
    break
  default:
    throw new Error(`Unknown part: ${part}`)
}
