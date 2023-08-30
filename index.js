import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://mohem-d0e42-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const missionsInDB = ref(database, "missions")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const listsEl = document.getElementById("lists")

addButtonEl.addEventListener("click", function(){

    let inputValue = inputFieldEl.value
    push(missionsInDB, inputValue)

    clearInputFieldEl()

})

onValue(missionsInDB, function(snapshot){
    let missionArray = Object.values(snapshot.val())

    clearListsEl()

    for(let i=0;i<missionArray.length;i++){
        let currentMission = missionArray[i]
        let currentMissionID = currentMission[0]
        let currentMissionValue = currentMission[1]
        appendItemToList(currentMission)
    }
})
function clearListsEl(){
    listsEl.innerHTML = ""
}
function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function appendItemToList(mission){
    let missionID=mission[0]
    let missionValue=mission[1]

    let newEl = document.createElement("li")
    newEl.textContent = mission

    newEl.addEventListener("click", function(){
        let exactLocationOfMissionInDB = ref(database, `missions/${missionID}`)

        remove(exactLocationOfMissionInDB)
    })

    listsEl.append(newEl)
}
