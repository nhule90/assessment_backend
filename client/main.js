const fortuneBtn = document.getElementById("fortuneButton")
const randomFortuneContainer = document.querySelector('#random-fortune')
const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
    .then(res => {
        randomCard(res.data)
        })
    .catch(err => {
        console.log(err)
        alert('Uh oh. Your request did not work.')
        })
    ;
};
function randomCard(data) {
    randomFortuneContainer.innerHTML = data
}
fortuneBtn.addEventListener('click', getFortune)
// Feature 2
const showBtn = document.getElementById("showButton")
const fortuneListContainer = document.querySelector('#fortune-list')
const showFortune = () => {
    axios.get("http://localhost:4000/api/show/")
        .then(res => {
            createListCard(res.data)
            })
        .catch(err => {
            console.log(err)
            alert('Uh oh. Your request did not work.')
            })
        ;
};
function createListCard(data) {
    fortuneListContainer.innerHTML = ''
    var fortuneListCard = document.createElement('div')
    fortuneListCard.style.cssText = 'font-style: normal;'
    for (i=0;i<data.length;i++){
        fortuneListCard.innerHTML += `<p>${data[i].fortuneId}. ${data[i].fortuneText}</p>`
    } 
    fortuneListContainer.appendChild(fortuneListCard)
}

showBtn.addEventListener('click', showFortune)

// Feature 3
//creates the card for adding a fortune
const addBtn = document.getElementById("addButton")
const addFortune = () => {
    var newText = document.getElementById('newFortune').value
    axios.post("http://localhost:4000/api/fortune/",{
        fortuneText: newText
    })
    .then(res => {
        createListCard(res.data)
        alert('Submitted')
        })
    .catch(err => {
        console.log(err)
        alert('Uh oh. Your request did not work.')
        })
    ;
};
addBtn.addEventListener('click', addFortune)

// Feature 4
//creates the card for deleting a fortune
const deleteBtn = document.getElementById("deleteButton")
const deleteFortune = () => {
    var id = document.getElementById('deleteFortuneId').value
    axios.delete(`http://localhost:4000/api/fortune/${id}`)
    .then(res => {
        createListCard(res.data)
        alert('Deleting Completed!')
        })
    .catch(err => {
        console.log(err)
        alert(err.response.data)
        })
    ;
};
deleteBtn.addEventListener('click', deleteFortune)
  
// Feature 5
//creates the card for updating a fortune
const updateBtn = document.getElementById("updateButton")
const updateFortune = () => {
    var id = document.getElementById('updateFortuneId').value
    var newText = document.getElementById('updateFortuneText').value
    console.log(id,newText)
    axios.put(`http://localhost:4000/api/fortune/${id}?newFortuneText=${newText}`)
    .then(res => {
        createListCard(res.data)
        alert('Updating completed!')
        })
    .catch(err => {
        console.log(err)
        alert(err.response.data)
        })
    ;
};
updateBtn.addEventListener('click', updateFortune)