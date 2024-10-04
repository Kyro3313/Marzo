const march = new Date(Date.UTC(2023,1,28));

const subText = document.querySelector(".subText")
const mainText = document.querySelector(".mainText")
const dateInput = document.getElementById("dateInput")
const numInput = document.getElementById("numInput")

let currentDateFormat = dateParser(new Date)
let currentDate = new Date(Date.UTC(currentDateFormat[2],currentDateFormat[1],currentDateFormat[0]))

function marchDistance(date){
    /*This function calculates how many
    days have passed since the 1st of march
    2023*/

    if(date == undefined){
        date = currentDate
    }

    return Math.ceil((date - march) / (1000 * 60 * 60 * 24))
}

function dateFromMarch(number){
    return new Date((number * (1000 * 60 * 60 * 24)) + march.getTime())
}

function dateParser(date){
    return [date.getDate(), date.getMonth(), date.getFullYear()]
}

function refreshCount(date){
    /*Change the text displayed according
    to the Date object passed*/
    let number = marchDistance(date);
    let dateString = dateParser(date);
    dateString = `${dateString[0]}/${dateString[1] + 1}/${dateString[2]}`
    numInput.value = number

    if(date - currentDate < 0){
        subText.textContent = `Il ${dateString} era il`
        if(number === 0)
            subText.textContent = `Il ${dateString} era lo`
    } else if(date - currentDate === 0){
        subText.textContent = "Oggi è il"
    } else{
        subText.textContent = `Il ${dateString} sarà il`
    }

    
    mainText.textContent = `${number} Marzo`
}

document.addEventListener("DOMContentLoaded", e => {
    refreshCount(currentDate);
})

dateInput.addEventListener("change", e =>{
    try{
        let inputValue = new Date(dateInput.value)
        if(isNaN(inputValue.getTime())){
            throw new Error("Invalid date object")
        }
        refreshCount(inputValue)
    }catch(e){
        console.error(e)
        alert("Invalid date")
        refreshCount(currentDate)
    }
})

numInput.addEventListener("change", e =>{
    try{
        let inputValue = numInput.value
        let date = dateFromMarch(inputValue)
        if(isNaN(date.getTime())){
            throw new Error("Invalid date object")
        }
        refreshCount(date)
    }catch(e){
        console.error(e)
        alert("Invalid number")
        refreshCount(currentDate)
    }
    
})