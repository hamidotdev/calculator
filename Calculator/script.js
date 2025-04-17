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
let plusOrMinus = document.getElementById('plusOrMinus')
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
let openBracket = true

// Helper Function: To check if the value clicked is an operator
function isOperator(char) {
    return ["+", "-", "*", "/", "%", "()"].includes(char)
}


buttons.forEach(button =>{
    button.addEventListener('click', function(){
        let value = button.textContent

        let validInput = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "+", "*", "/"]
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
                let result = eval(textValue.join(""))
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
                textValue.push(value)
                textEl.value += value
            }

            if (!isOperator(value)) {
                try {
                    result = textValue.join("")
                    let expression = eval(result)
                    answer.textContent = expression
                } catch (error) {
                    answer.textContent = ""
                }
                errorEffect = false
            }
        } 

        // else if (value === "()") {
        //     if (openBracket === true) {
        //         if (/\d|\)/.test(textValue[textValue.length - 1])) {
        //             textValue.push("*")
        //         }

        //         textValue.push("(")
        //         textEl.value += "("
        //     } 
        //     else {
        //         textValue.push(")")
        //         textEl.value += (")")
        //     }

        //     openBracket = !openBracket

        //     try {
        //         let result = textValue.join("")
        //         answer.textContent = result
        //     } catch (error) {
        //         answer.textContent = ""
        //     }
        // }

        else if (value === "%") {
            activePercentage = true
            textValue.push("/ 100")
            result = textValue.join("")
            let evaluate = eval(result)
            textEl.value += value
            answer.textContent = evaluate
            textValue = [evaluate.toString()]
            textValue.push("*")
            console.log(textValue);
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

    if (activePercentage === true) {

        activePercentage = false

        let currentValue = parseFloat(textValue[0])
        let originalValue = currentValue * 100
        
        textValue = [originalValue.toString()]
        textEl.value = textValue[0]

        try {
            answer.textContent = eval(textValue.join(""))
        } catch (error) {
            answer.textContent = ""
        }
        // textValue.pop()
        // // Accessing the second to the last value of the array
        // let lastIndex = textValue.length - 1;
        // let decimal = textValue[lastIndex]
        // let result = (Number(decimal) * 100.00001)
        // let results = Math.floor(result)
        // let expression = results.toString()
        // textValue = [expression]
        // textEl.value = results
        // let calculation = eval(textValue.join(""))
        // answer.textContent = calculation
        // activePercentage = false
        // console.log(expression);
        // console.log(textValue);
        
    } else { 
        let lastIndex = textValue[textValue.length - 1]
        if (textValue.length === 1) {
            textValue[textValue.length - 1] = lastIndex.slice(0, -1)
            console.log(textValue);
        } else {
            textValue.pop()
            console.log(textValue);
        }
        
        let deleteValue = textValue.join("")
        textEl.value = deleteValue
        try {
            let result = eval(deleteValue)
            answer.textContent = result
        } catch (error) {
            answer.textContent = ""
        }
    }































    // let last = textValue.pop()

    // if (last === "(") {
    //     openBracket = true
    // } else if (last === ")") {
    //     openBracket = false
    // }
})
