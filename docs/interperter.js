const runButton = document.getElementById("run")
const resetButton = document.getElementById("reset")
const inputArea = document.getElementById("input")
const outputArea = document.getElementById("output")
const cellNumber = document.getElementById("numcells")


const interpret = code => {
    let pointer = 0
    let cells = new Array(cellNumber || 64).fill(0)
    let output = ""
    for (let i = 0; i < code.length; i++) {
        const cmd = code[i]
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