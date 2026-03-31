const numberCard = document.querySelector(".number-card")
const cardUserName = document.querySelector(".username")
const expDate = document.querySelector(".exp-date")
const cvc = document.querySelector(".cvc-span")
const buttonConfirm = document.querySelector(".confirm")
const buttonContinue = document.querySelector(".continue")

const inputs = document.querySelectorAll("input")
const errors = document.querySelectorAll(".error")

const inputBlock = document.querySelector(".input-block")
const resultBlock = document.querySelector(".result-block")

function validate() {
    let flag = true

    if (/^[A-Za-zА-Яа-яёЁ]+\s[A-Za-zА-Яа-яёЁ]+$/.test(inputs[0].value)) {
        inputs[0].style.borderColor = ""
        errors[0].style.display = ""
    } else {
        inputs[0].style.borderColor = "red"
        errors[0].style.display = "block"
        flag = false
    }

    if (inputs[1].value.length === 19) {
        inputs[1].style.borderColor = ""
        errors[1].style.display = ""
    } else {
        inputs[1].style.borderColor = "red"
        errors[1].style.display = "block"
        flag = false
    }

    const isMonthValid = /^(0[1-9]|1[0-2])$/.test(inputs[2].value);
    const isYearValid = /^[0-9]{2}$/.test(inputs[3].value);

    if (isMonthValid && isYearValid) {
        inputs[2].style.borderColor = ""
        inputs[3].style.borderColor = ""
        errors[2].style.display = "" 
    } else {
        inputs[2].style.borderColor = "red"
        inputs[3].style.borderColor = "red"
        errors[2].style.display = "block"
        flag = false
    }

    if (/^[0-9]{3}$/.test(inputs[4].value)) {
        inputs[4].style.borderColor = ""
        errors[3].style.display = "" 
    } else {
        inputs[4].style.borderColor = "red"
        errors[3].style.display = "block"
        flag = false
    }
    return flag
}

buttonConfirm.addEventListener('click', (e) => {
    if (validate()) {
        cardUserName.textContent = inputs[0].value.toUpperCase()
        numberCard.textContent = inputs[1].value
        expDate.textContent = inputs[2].value + "/" + inputs[3].value
        cvc.textContent = inputs[4].value

        inputBlock.style.display = "none"
        resultBlock.style.display = "flex"
    }
})

buttonContinue.addEventListener('click', (e) => {
    inputBlock.style.display = ""
    resultBlock.style.display = ""

    cardUserName.textContent = "JANE APPLESED"
    numberCard.textContent = "0000 0000 0000 0000"
    expDate.textContent = "00/00"
    cvc.textContent = "000"

    inputs.forEach(element => {
        element.value = ""
    });

})

inputs[0].addEventListener('input', () => {
    cardUserName.textContent = inputs[0].value.toUpperCase() || "JANE APPLESED"
})

inputs[1].addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, '').substring(0, 16)
    let cardArray = Array(16).fill('0')
    for (let i = 0; i < digits.length; i++) {
        cardArray[i] = digits[i]
    }
    let formatted = cardArray.join('').match(/.{1,4}/g).join(' ')
    numberCard.textContent = formatted
    e.target.value = digits.match(/.{1,4}/g)?.join(' ') || ''
})

inputs[2].addEventListener('input', () => {
    expDate.textContent = (inputs[2].value || "00") + "/" + (inputs[3].value || "00")
})

inputs[3].addEventListener('input', () => {
    expDate.textContent = (inputs[2].value || "00") + "/" + (inputs[3].value || "00")
})

inputs[4].addEventListener('input', () => {
    cvc.textContent = inputs[4].value || "000"
})