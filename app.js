// -----------------------------------variables----------------------------------------------------

const floorBtns = document.querySelectorAll('.floorBtn');
const lift = document.querySelector('.lift');
const liftCont = document.querySelector('.liftBox');
const liftDoors = document.querySelectorAll('.liftDoor');


generateNewPerson();
const person = document.querySelector('#person');
const personMessage = document.querySelector('#personMessage');

// ---------------------------------- events ----------------------------------------------------
floorBtns.forEach((floorBtn, floorBtnIndex) => {
    floorBtn.onclick = () => {
        const person = document.querySelector('#person');
        const personMessage = document.querySelector('#personMessage');
        console.log(person.classList);
        let floorIndex = floorBtn.textContent - 1;
        if (person.classList.contains('inElevator')) {
            person.style.transition = '1s ease-in';
            personMessage.style.transition = '1s ease-in';
            person.style.bottom = 190 * floorIndex + 'px';
            personMessage.style.bottom = 110 + 190 * floorIndex + 'px';
            if (Number(personMessage.textContent) === floorIndex + 1) {
                let personGoesOut = setTimeout(personGoesOutOfElevator, 2000);
                person.classList.remove('inElevator');
                let removePersonAddNew = setTimeout(removePersonAndAddNew, 4000);
            }
        } else {
            let personGoesToElevator = setTimeout(personMoveToElevator, 2000);
        }
        lift.style.transition = '1s ease-in';
        lift.style.bottom = 190 * floorIndex + 'px';
        let openDoors = setTimeout(openElevatorDoors, 1000);
        let closeDoors = setTimeout(closeElevatorDoors, 3000);
    }
})
 // ------------------------------------- functions ------------------------------------------------------
function openElevatorDoors() { // animation for opening elevator door
    liftDoors.forEach(liftDoor => {
        liftDoor.style.transition = '1s ease-in';
        liftDoor.style.width = '0';
    })
}

function closeElevatorDoors() { // animation for closing elevator door
    liftDoors.forEach(liftDoor => {
        liftDoor.style.transition = '1s ease-in';
        liftDoor.style.width = '50%';
    })
}

function personMoveToElevator() { // animation for person moving to of the elevator
    const person = document.querySelector('#person');
    const personMessage = document.querySelector('#personMessage');
    if (person.style.bottom === lift.style.bottom) { // security to check if elevator arrived to the same floor as the person waiting
        person.style.transition = '1s ease-in';
        person.style.transform = 'translateX(160px)';
        personMessage.style.transition = '1s ease-in';
        personMessage.style.transform = 'translateX(160px)';
        person.classList.add('inElevator');
    }
}

function personGoesOutOfElevator() { // animation for person moving out of the elevator
    const person = document.querySelector('#person');
    const personMessage = document.querySelector('#personMessage');
    person.style.transition = '1s ease-in';
    person.style.transform = 'translateX(0)';
    personMessage.style.transition = '1s ease-in';
    personMessage.style.transform = 'translateX(0)';
}
function removePersonAndAddNew() { // remove person after arriving to correct floor and generating new person in random floor
    const person = document.querySelector('#person');
    const personMessage = document.querySelector('#personMessage');
    person.remove();
    personMessage.remove();
    generateNewPerson();
}
function generateNewPerson() { // generating new person to apear in random floor with random floor request
    let randomFloorForPersonToAppear = Math.floor(Math.random() * 3);
    let randomFloorRequest = Math.floor(Math.random() * 3) + 1;

    const personNew = document.createElement('img');
    personNew.src = 'images-removebg-preview.png';
    personNew.id = 'person';
    const personAsksForRandomFloor = document.createElement('div');
    personAsksForRandomFloor.id = 'personMessage';
    personAsksForRandomFloor.textContent = randomFloorRequest;
    personNew.style.bottom = 190 * randomFloorForPersonToAppear + 'px';
    personAsksForRandomFloor.style.bottom = 110 + 190 * randomFloorForPersonToAppear + 'px';
    console.log('randomFloorForPersonToAppear ', randomFloorForPersonToAppear);
    console.log('randomFloorRequest ', randomFloorRequest);
    if (randomFloorForPersonToAppear + 1 === randomFloorRequest) { // security so person would appear in the floor with the same floor request
        generateNewPerson();
    } else {
        liftCont.append(personNew, personAsksForRandomFloor);
    }
}