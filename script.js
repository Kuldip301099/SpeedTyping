const RANDOM_QUOTE = "https://api.quotable.io/random"
const quonteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput') 
const timerElement = document.getElementById('timer')
const result = document.getElementById('result')

let count = 0
quoteInputElement.addEventListener('input',()=>{
    
    const arrayQuote = quonteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')

    if(arrayValue.length === 1 && count===0)
    {
        startTimer()
        count =1
    }
    let correct = true
    let countforacc = 0;
    arrayQuote.forEach((characterSpan,index) =>{
        const character = arrayValue[index]
        if (character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect') 
            correct = false
        } else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect') 
            countforacc++
            let timertime = getTimerTime()
            if(timertime){
            let cal = countforacc/timertime
            if(cal<1)
            {
                var motivation = "You can do it batter";
            }
            if(1<=cal && cal<2)
            {
                var motivation = "You are doing very well, Good";
            }
            if(cal>=2)
            {
                var motivation = "You are on fire, Best"
            }
            result.innerHTML = `Result: ${cal} Latter/sec`
            result.innerHTML += "<br>";
            result.innerHTML += motivation
            }
        } else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect') 
            document.getElementById('wrong_sound').play();
            correct = false
        }
    })
    if (correct)
    { renderNewQuote()
        timerElement.innerText = 0
        startTimer()
        count = 0
    }
    
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote(){
    const quote = await getRandomQuote()
    quonteDisplayElement.innerHTML = ''
    quote.split('').forEach(character =>{
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quonteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null

}

let startTime

function startTimer(){
    timerElement.innerText = 0

    startTime = new Date()

    setInterval(() => {
        timer.innerText = getTimerTime()
    },1000)
}


function getTimerTime(){
    return Math.floor((new Date() - startTime)/1000)
}

renderNewQuote()
