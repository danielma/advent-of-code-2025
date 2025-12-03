console.log("Reading from STDIN")

const day = Bun.argv[2]

if (!day) {
  throw new Error("You gotta pick a day!")
}

const { run } = await import(`./${day}/${day}`)

const text = await Bun.stdin.text()

console.log(run(text))
