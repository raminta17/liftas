const floorBtns = document.querySelectorAll('.floorBtn');
const floors = document.querySelectorAll('.floor');
const lift = document.querySelector('.lift');
const liftDoors = document.querySelectorAll('.liftDoor');
let person = null;


floorBtns.forEach(floorBtn => {
    floorBtn.onclick = () => {
        const person = document.querySelector('.person');
        const personMessage = document.querySelector('.personMessage');
        let floorIndex = floorBtn.textContent-1;
        if(person.classList.contains('inElevator')){
            console.log('person in elevator');
            person.style.transition= '1s ease-in';
            personMessage.style.transition= '1s ease-in';
            person.style.bottom = 190 * floorIndex + 'px';
            personMessage.style.bottom = 190 * floorIndex + 'px';
            let personGoesOut = setTimeout(personGoesOutOfElevator, 2000);
        }else {
            let personGoesToElevator = setTimeout(personMoveToElevator,2000);
        }
        lift.style.transition= '1s ease-in';
        lift.style.bottom = 190 * floorIndex + 'px';
        let openDoors = setTimeout(openElevatorDoors, 1000);
        let closeDoors = setTimeout(closeElevatorDoors,3000);

    }
})

function openElevatorDoors(){
    liftDoors.forEach(liftDoor => {
        liftDoor.style.transition = '1s ease-in';
        liftDoor.style.width = '0';
    })
}
function closeElevatorDoors(){
    liftDoors.forEach(liftDoor => {
        liftDoor.style.transition = '1s ease-in';
        liftDoor.style.width = '50%';
    })
}
function personMoveToElevator(){
    const person = document.querySelector('.person');
    const personMessage = document.querySelector('.personMessage');
    person.style.transition = '1s ease-in';
    person.style.transform = 'translateX(170px)';
    personMessage.style.transition = '1s ease-in';
    personMessage.style.transform = 'translateX(170px)';
    person.classList.add('inElevator');
}
function personGoesOutOfElevator(){
    const person = document.querySelector('.person');
    const personMessage = document.querySelector('.personMessage');
    person.style.transition = '1s ease-in';
    person.style.transform = 'translateX(0)';
    personMessage.style.transition = '1s ease-in';
    personMessage.style.transform = 'translateX(0)';
}
function generateNewPerson(){
    let randomFloorForPersonToAppear = Math.floor(Math.random() *3);
    let randomFloorRequest = Math.floor(Math.random() *3) +1;
    const person = document.createElement('img');
    person.src = 'images-removebg-preview.png';
    person.className = 'person';

    const personAsksForRandomFloor = document.createElement('div');
    personAsksForRandomFloor.className= 'personMessage';
    personAsksForRandomFloor.textContent = randomFloorRequest;
    person.style.bottom = 190 * randomFloorForPersonToAppear + 'px';
    personAsksForRandomFloor.style.bottom = 110 + 190 * randomFloorForPersonToAppear + 'px';
    console.log('randomFloorForPersonToAppear ', randomFloorForPersonToAppear);
    console.log('randomFloorRequest ', randomFloorRequest);
    lift.append(person, personAsksForRandomFloor);
}

generateNewPerson();
