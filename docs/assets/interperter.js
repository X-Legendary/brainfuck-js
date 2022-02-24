const runButton = document.getElementById("run")
const resetButton = document.getElementById("reset")
const inputArea = document.getElementById("input")
const outputArea = document.getElementById("output")
const cellNumber = document.getElementById("numcells")

// Code works if you run it in Node.js but doesn't in the browser?
const interpret = code => {
    let pointer = 0
    let cells = new Array(cellNumber || 64).fill(0)
    let output = ""
    let loopNum = 0
    let loop  = false
    let loopArray  = []

    for (let i = 0; i < code.length; i++) {
        const cmd = code[i]

        if(loop) {
            if(char === "[") loopNum++
            if(char === "]") {
              if(loopNum === 0) looping = false
              else loopNum--
            }
            continue
        }

        switch (cmd) {
            case ">":
                if(pointer == cells.length - 1) {
                    pointer = 0
                } else {
                    pointer++
                }
                break;
            case "<":
                if(pointer == 0) {
                    pointer = cells.length - 1
                } else {
                    pointer--
                }
                break
            case "+":
                cells[pointer]++
                break
            case "-":
                cells[pointer]--
                break
            case ".":
                output += String.fromCharCode(cells[pointer])
                break
            case ",":
                let input = prompt("Enter input:", "h") // Default value is h
                if(input == null || input == "") { // No input was given :/
                    cells[pointer] = "h".charCodeAt(0)
                } else {
                    cells[pointer] = input.charCodeAt(0)
                }
            case "[":
                if(cells[pointer] == 0) looping = true
                else loopArray.push(i)
            break;
            case "]":
                if(cells[pointer] != 0) i = loopArray[loopArray.length - 1]
                else loopArray.pop()
            break;
            default:
                break;
        }
    }

    return output
}

const run = () => {
    const output = interpret(inputArea.value)
    outputArea.value = output
}

runButton.addEventListener("click", run)