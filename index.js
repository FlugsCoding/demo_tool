// Global Variables

const tickrate = 20
const tick = 1 / 20

const hours = 3600 * tickrate
const minutes = 60 * tickrate
const seconds = 1 * tickrate

// Tick Calculator

const tcHoursInput = document.getElementById('tcHours')
const tcMinsInput = document.getElementById('tcMinutes')
const tcSecsInput = document.getElementById('tcSeconds')
const tcTicksInput = document.getElementById('tcTick');


const setTicks = (value) => {
    document.getElementById('tcTickField').classList.remove('error')
    tcTicksInput.value = value
}

const manualEditTick = () => {
    let tickValue = tcTicksInput.value

    let tickToSeconds = tickValue * tick

    let autoFillHours = Math.floor(tickToSeconds / 3600);
    tickToSeconds %= 3600;
    let autoFillMinutes = Math.floor(tickToSeconds / 60);
    let autoFillSeconds = tickToSeconds % 60;    

    tcHoursInput.value = autoFillHours
    tcMinsInput.value = autoFillMinutes
    tcSecsInput.value = autoFillSeconds
}

const calcTicks = () =>{
    let hoursValue = tcHoursInput.value
    let minsValue = tcMinsInput.value
    let secsValue = tcSecsInput.value

    let total = hoursValue * hours + minsValue * minutes + secsValue * seconds

    setTicks(total)
}

// Place Finder

const pfStartHoursInput = document.getElementById('pfStartHours')
const pfStartMinsInput = document.getElementById('pfStartMinutes')
const pfStartSecsInput = document.getElementById('pfStartSeconds')

const pfTargetHoursInput = document.getElementById('pfTargetHours')
const pfTargetMinsInput = document.getElementById('pfTargetMinutes')
const pfTargetSecsInput = document.getElementById('pfTargetSeconds')

const pfTickInput = document.getElementById('pfTick');

function hmsToSeconds(t) {
    const [h, m, s] = t.split(':')
    return Number(h) * 60 * 60 + Number(m) * 60 + Number(s)
}

function secondsToHMS(secs) {
    return new Date(secs * 1000).toISOString().substr(11, 8)
}

const timeDifference = (startTime, targetTime) => {
    const time = secondsToHMS(hmsToSeconds(targetTime) - hmsToSeconds(startTime))

    const a = time.split(':');

    const result = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 

    secondsToTick = result / tick
    pfTickInput.value = secondsToTick
}

const formatTimes = () => {
    const pfStartHoursValue = document.getElementById('pfStartHours').value
    const pfStartMinsValue = document.getElementById('pfStartMinutes').value
    const pfStartSecsValue = document.getElementById('pfStartSeconds').value

    const pfTargetHoursValue = document.getElementById('pfTargetHours').value
    const pfTargetMinsValue = document.getElementById('pfTargetMinutes').value
    const pfTargetSecsValue = document.getElementById('pfTargetSeconds').value

    const startTime = `${pfStartHoursValue}:${pfStartMinsValue}:${pfStartSecsValue}`
    const targetTime = `${pfTargetHoursValue}:${pfTargetMinsValue}:${pfTargetSecsValue}`

    timeDifference(startTime, targetTime)
}

// Global Functions

const clearErrors = (fields) => {
    for (let i = 0; i < fields.length; i++) {
        fields[i].classList.remove('error')
    }
}

const clearInputs = (form) => {
    const forms = [document.getElementById('tc'), document.getElementById('pf')]
    forms[form-1].reset()
    clearErrors(document.getElementsByClassName('field tc'))
    clearErrors(document.getElementsByClassName('field pf'))
}

const checkErrors = (input, field, func, except) => {
    if (input.value == '' || isNaN(input.value) || input.value < 0 || input.value.indexOf(' ') >= 0){
        field.classList.add('error')
    } else if (except == 'tick'){
        field.classList.remove('error')
        clearErrors(document.getElementsByClassName('field tc'))
        clearErrors(document.getElementsByClassName('field pf'))
        manualEditTick()
    } else {
        field.classList.remove('error')
        func()
    }
}