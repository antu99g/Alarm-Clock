// Container showing current time
const currentTimeContainer = document.querySelector('#currentTimeContainer');

// Button to set an alarm
const alarmBtn = document.querySelector('#alarmBtn');

// Parent container of all the alarms
const alarmContainer = document.querySelector('#alarmContainer');

// Heading of the alarms
const alarmHeading = document.querySelector('.alarmHeading');

// Given values of hr, min, sec to set new alarm
let input = document.querySelectorAll(".alarmInput");


let time,
    currentTime,
    hr,
    min,
    sec,
    amPm,
    setTime,
    alarm; 

    
    
// Fetching the list of all the Alarms from local storage
let alarmsList = localStorage.getItem("alarmsList");


// Change the alarms-list from string to array
if (alarmsList == null) {
    alarmsList = [];
}
if(alarmsList.length > 0) {
    alarmsList = alarmsList.split(",");
    renderAlarmToDOM();
    checkAlarmHeader();
}else{
    alarmsList = [];
}




// ---Current Time Section--- //

setInterval (function(){
    time = new Date();
    hr = Number(time.getHours());
    min = Number(time.getMinutes());
    sec = Number(time.getSeconds());
    amPm = "PM";

    
    // Changing Clock format from 24hr to 12hr //
    if(hr>12){
        hr = hr-12;
    }


    // Adding 0 to numbers less than 10 //
    
    if(hr<10){
        hr = '0' + hr;
    }
    if(min<10){
        min = '0' + min;
    }
    if(sec<10){
        sec = '0' + sec;
    }



    // Setting AM/PM //

    if(hr=='12' && amPm==='AM'){
        amPm = 'PM';
    }
    else if(hr=='12' && amPm==='PM'){
        amPm = 'AM';
    }


    // Showing the current time in DOM //
    currentTime = `${hr}:${min}:${sec} ${amPm}`;
    currentTimeContainer.innerHTML = currentTime;


    // Matching alarms with current time
    checkAlarm();


}, 1000);



// Function for matching each alarm with current time and alert (if matches)

function checkAlarm(){
    for(let i of alarmsList){
        if(i==currentTime){
            alert(`Alarm :  ${i}`);
            return;
        }
    }
}



// Function for click event on Set-Alarm Button

function setAlarm(){

    // Collecting hr, min, sec, am/pm from input boxes
    let alarmHr = Number(input[0].value);
    let alarmMin = Number(input[1].value);
    let alarmSec = Number(input[2].value);


    // Checking for valid time to set alarm

    if((alarmHr>0 && alarmHr<=12) && (alarmMin>=0 && alarmMin<60) && (alarmSec>=0 && alarmSec<60)){

        setAlarmTime(alarmHr, alarmMin, alarmSec);
        renderAlarmToDOM();
        checkAlarmHeader();
        return;

    }


    // Incase an invalid time is given to set alarm
    else{
        alert('Please Enter Valid Time to Set Alarm');
        input[0].value = input[1].value = input[2].value = '';
        return;
    }
    
}



// Function for collecting time from input and add it to all alarms list

function setAlarmTime(hr, min, sec){

    // Adding 0 to numbers less than 10 //
    if (hr < 10) {
        hr = "0" + hr;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }

    // Setting time to add an alarm
    setTime = `${hr}:${min}:${sec} ${input[3].value}`;

    // Pushing the new alarm to the array of all alarms
    alarmsList.push(setTime);

    // Set the list of alarms to localstorage
    localStorage.setItem("alarmsList", alarmsList);

    // Clearing input fields after collecting time to set alarm
    input[0].value = input[1].value = input[2].value = "";

    return alarmsList;
}



// Function for adding alarms to DOM

function renderAlarmToDOM(){

    // Clearing all the alarms from DOM
    alarmContainer.innerHTML = '';

    // Adding each alarm to DOM from array of alarms
    for(let i in alarmsList){
        let div = document.createElement('div');
        div.innerHTML = `${alarmsList[i]}<button class="deleteBtn" data-index="${i}">Delete</button>`;
        alarmContainer.append(div);
    }
}




// Function for deleting alarm
function deleteAlarm(index){

    // Removing alarm from array of all alarms
    alarmsList.splice(index, 1);

    // Set the list of alarms to localstorage
    localStorage.setItem("alarmsList", alarmsList);

    // Updating alarms in DOM
    renderAlarmToDOM();

    // Check if alarm heading need to remove
    checkAlarmHeader();

    return;
}



// Function for header of all alarms section
function checkAlarmHeader(){

    // Showing heading when atleast 1 alarm present
    if(alarmsList.length >= 1){
        alarmHeading.classList.remove("hidden");
    }

    // Removing heading if no alarm is present
    else if(alarmsList.length < 1){
        alarmHeading.classList.add("hidden");
    }
}



// alarmBtn.addEventListener('click', setAlarm);


document.onclick = function(e){
    let target = e.target;

    // Click event for each Delete Button
    if(target.classList.contains('deleteBtn')){
        deleteAlarm(target.dataset.index);
    }
    // Click event on Set-Alarm Button
    else if(target.id == 'alarmBtn'){
        setAlarm();
    }
}