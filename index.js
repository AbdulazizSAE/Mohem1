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
const paraEl = document.getElementById("para-el")

addButtonEl.addEventListener("click", function(){

    let inputValue = inputFieldEl.value
    push(missionsInDB, inputValue)

    clearInputFieldEl()

})

onValue(missionsInDB, function(snapshot){
    let missionKeys = Object.keys(snapshot.val())
    let missionValue = Object.values(snapshot.val())

    if(snapshot.exists()){
        clearListsEl()
        let Mission = []
        for(let i=0;i<missionKeys.length;i++){
            Mission.push(missionKeys[i] + ":" + missionValue[i])
            appendItemToList(Mission[i])
        }
    }
    else{
        paraEl.innerHTML="no missions"
    }
})
function clearListsEl(){
    listsEl.innerHTML = ""
}
function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function appendItemToList(mission){
    let missionID=mission.split(":")[0]
    let missionValue=mission.split(":")[1]
    let newEl = document.createElement("li")
    newEl.textContent = missionValue

    newEl.addEventListener("click", function(){
        let exactLocationOfMissionInDB = ref(database, `missions/${missionID}`)

        remove(exactLocationOfMissionInDB)
    })

    listsEl.append(newEl)
}
