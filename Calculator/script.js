let one = document.getElementById('one')
let two = document.getElementById('two')
let three = document.getElementById('three')
let four = document.getElementById('four')
let five = document.getElementById('five')
let six = document.getElementById('six')
let seven = document.getElementById('seven')
let eight = document.getElementById('eight')
let nine = document.getElementById('nine')
let reset = document.getElementById('reset')
let bracket = document.getElementById('bracket')
let percentage = document.getElementById('percentage')
let divide = document.getElementById('divide')
let plus = document.getElementById('plus')
let multiply = document.getElementById('multiply')
let minus = document.getElementById('minus')
let zero = document.getElementById('zero')
let dot = document.getElementById('dot')
let equals = document.getElementById('equals')
let textEl = document.getElementById('text-el')
let textValue = []
let answer = document.getElementById('answer')
let deletes = document.getElementById('delete')
let buttons = document.querySelectorAll('button')
let justEvaluated = false
let errorEffect = false
let evaluatedColor = false
let activeParenthesis = false
let activePercentage = false
let bracketCount = 0
let minusOrPlus = false

// Helper Function: To check if the value clicked is an operator
function isOperator(char) {
    return ["+", "-", "*", "/", "%"].includes(char)
}


buttons.forEach(button =>{
    button.addEventListener('click', function(){
        let value = button.textContent

        let validInput = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-", "+", "*", "/"]
        let result = textValue.join("")

        if (value === "C") {
            textValue = []
            textEl.value = ""
            answer.textContent = ""
            justEvaluated = false
            errorEffect = false
            evaluatedColor = false
            activePercentage = false
            activeParenthesis = false
        }
        else if (value === "="){
            activePercentage = false
            activeParenthesis = false
            try {
                let replacePercent = textValue.join("").replace(/%/g, "/100")
                let result = eval(replacePercent)
                textEl.value = result
                answer.textContent = ""
                textValue = [result.toString()]
                console.log(textValue);
                justEvaluated = true
                errorEffect = false
                evaluatedColor = true
            } catch (error) {
                textEl.value = ""
                textValue = []
                answer.textContent = "Error"
                console.log(textValue);
                justEvaluated = false
                errorEffect = true
                evaluatedColor = false
            }
        }
        else if (validInput.includes(value)) {
            evaluatedColor = false
            activePercentage = false
            let lastChar = textValue[textValue.length - 1]

            
            if (lastChar === ")") {
                if (!isOperator(value)) {
                    textValue.push("*")
                    textEl.value += "*"
                }
                console.log(textValue);
            }


            if (value.match(/\d/) && lastChar === "%" && lastChar !== "*") { 
                if (isOperator(value)) {
                    
                } else {
                    textValue.push("*")
                    textEl.value += "*"
                    console.log(textValue);
                }
            }

            if (justEvaluated === true) {
                if (!isOperator(value)) {
                    textValue = [value]
                    textEl.value = value
                } else {
                    textValue.push(value)
                    textEl.value += value
                }
                justEvaluated = false
            }
            else {
                if (textValue.length === 1 && textValue[0] === "0" && value.match(/\d/)) {
                    textValue = [value]
                    textEl.value = value
                } else if (
                    textValue.length >= 2 && 
                    isOperator(textValue[textValue.length - 2]) && 
                    textValue[textValue.length - 1] === "0" && 
                    value.match(/\d/) && 
                    value !== ".") {
                    textValue.pop()
                    textValue.push(value)
                    textEl.value = textValue.join("")
                } else {
                    textValue.push(value)
                    textEl.value += value
                }
            }

            if (!isOperator(value)) {
                try {
                    result = textValue.join("").replace(/%/g, "/100")
                    let expression = eval(result)
                    answer.textContent = expression
                } catch (error) {
                    answer.textContent = ""
                }
                errorEffect = false
                console.log(textValue);
            }
        }

        else if (value === "%" && textValue[textValue.length - 1] !== "%") {

            textValue.push("%")
            textEl.value += value

            try {
                let allValues = textValue.join("")
                let evaluate = allValues.replace(/%/g, "/100")
                let result = eval(evaluate)
                answer.textContent = result
                console.log(textValue);
                console.log(allValues);
                console.log(evaluate);
            } catch (error) {
                answer.textContent = ""
            }
        }

        else if (value === "()") {
            let lastChar = textValue[textValue.length - 1]

            if (bracketCount > 0 && (lastChar !== "(" && lastChar !== undefined)) {
                textEl.value += ")"
                textValue.push(")")
                bracketCount -= 1
            } else {
                if(/\d|\)|%/.test(lastChar)){
                    textValue.push("*")
                    textEl.value += "*"
                }

                textEl.value += "("
                textValue.push("(")
                bracketCount += 1
            }

            try {
                let result = textValue.join("").replace(/%/g, "/100")
                let expression = eval(result)
                answer.textContent = expression
            } catch (error) {
                answer.textContent = ""
            }
        }

        else if (value === "+/-") {
            let inputValue = textEl.value
            textEl.value = inputValue * -1
            textValue = [textEl.value]
            try {
                let result = eval(textValue.join(""))
                answer.textContent = result
                if (isNaN(result)) {
                    textEl.value = ""
                    answer.textContent = "Error"
                    errorEffect = true
                }
            } catch (error) {
                answer.textContent = ""
            }
        }

        if (errorEffect === true) {
            answer.setAttribute('id', 'error')
        } else {
            answer.removeAttribute('id', 'error')
        }

        // An active color of the evaluated answer
        if (evaluatedColor === true) {
            textEl.style.color = "rgb(73, 126, 172)"
        } else {
            textEl.style.color = "brown"
        }
    })
})


// Delete handlings
deletes.addEventListener('click', function(){

    // Check if the array is empty, then exits the function
    if (textValue.length === 0) return;

    let lastChar = textValue[textValue.length - 1]
    let secondLastChar = textValue[textValue.length - 2]

    // If the percent and multiply operator are close together
    if (lastChar === "*" && secondLastChar === "%") {
        textValue.pop()
        textValue.pop()
    } else {
        let remove = textValue.pop()

        if(remove === ")") {
            bracketCount += 1
        } else if (remove === "(") {
            bracketCount -= 1
        }
    }

    let deletedValues = textValue.join("")
    textEl.value = deletedValues
    try {
        let expression = deletedValues.replace(/%/g, "/100")
        let result = eval(expression)
        answer.textContent = result
    } catch (error) {
        answer.textContent = ""
    }

    if (textValue.length === 0) {
        textEl.value = ""
        answer.textContent = ""
    }
    console.log(textValue);
})
