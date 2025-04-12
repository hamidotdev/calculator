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


// Helper Function: To check if the value clicked is an operator
function isOperator(char) {
    return ["+", "-", "*", "/", "%"].includes(char)
}


buttons.forEach(button =>{
    button.addEventListener('click', function(){
        let value = button.textContent

        let validInput = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "+", "*", "/", "%", "(", ")"]
        

        if (value === "C") {
            textValue = []
            textEl.value = ""
            answer.textContent = ""
            justEvaluated = false
            errorEffect = false
        }
        else if (value === "="){
            try {
                let result = eval(textValue.join(""))
                textEl.value = result
                answer.textContent = ""
                textValue = [result.toString()]
                console.log(textValue);
                justEvaluated = true
                errorEffect = false
                textEl.setAttribute('class', 'activeAnswer')
            } catch (error) {
                textEl.value = ""
                textValue = []
                answer.textContent = "Error"
                console.log(textValue);
                justEvaluated = false
                errorEffect = true
            }
        }
        else if (validInput.includes(value)) {

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
                    let expression = textValue.join("")
                    let result = eval(expression)
                    answer.textContent = result
                } catch (error) {
                    answer.textContent = ""
                }
                errorEffect = false
            }
        }
        if (errorEffect === true) {
            answer.setAttribute('id', 'error')
        } else {
            answer.removeAttribute('id', 'error')
        }
    })
})


// Delete handlings
deletes.addEventListener('click', function(){
    textValue.pop()
    let deleteValue = textValue.join("")
    textEl.value = deleteValue
    console.log(textValue);

    try {
        let result = eval(deleteValue)
        answer.textContent = result
    } catch (error) {
        answer.textContent = ""
    }
})
