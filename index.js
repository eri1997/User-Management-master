const userEl=document.getElementById("user")
const formEl = document.getElementById("form")
const nameEl= document.getElementById("name")
const emailEl= document.getElementById("email")
const phoneEl= document.getElementById("phone")
const modalBtnEl = document.getElementById("model-btn")
const modalContainerEl = document.getElementById("modal-container")
const modalEl = document.getElementById("modal")
const closeModalBtn = document.getElementById("close-modal")
const tableName= document.getElementById("data-name")
const tableEmail= document.getElementById("data-email")
const tablePhone= document.getElementById("data-phone")



const displayUsers = async ()=>{
      const res = await fetch("http://localhost:8000/users")
      const data = await res.json()
      for( let i=0; i<data.length; i++){
        userEl.innerHTML+=`
        <tr>
            <td>${data[i].id}</td> 
            <td id="data-name">${data[i].name}</td>
            <td id="data-email">${data[i].email}</td>
            <td id="data-phone">${data[i].phone}</td>
            <td>
                  <div id="icons">
                        <img src="images/edit_icon.png" onClick="editUser(${data[i].id})" alt="">
                        <img src="images/delete_icon.png" onclick="deleteUser(${data[i].id})" alt="">
                  </div>
            </td>
        </tr>
        `
      }  
}

displayUsers()

// Add new user to API
const addUser = async() =>{
      const res = await fetch("http://localhost:8000/users",{
            method: "POST",
            body:JSON.stringify({
                  name: nameEl.value,
                  email: emailEl.value,
                  phone: phoneEl.value
            }),
            headers:{
                  'Content-type': 'application/json; charset=UTF-8',
            }
      })
      const data = await res.json()
      console.log(data)
      userEl.innerHTML +=`
      <tr>
      <td>${data.id}</td>
      <td>${data.name}</td>
      <td>${data.email}</td>
      <td>${data.phone}</td>
      <td>
      <div id="icons">
      <img src="images/edit_icon.png" alt="">
      <img src="images/delete_icon.png" onclick="deleteUser()" alt="">
      </div>
      </td>
      </tr>
      `        
}

// EDIT/ UPDATE user data
const editUser = async(id) =>{
      //Open modal when clicking edit icon
      modalContainerEl.style.display="flex"
      modalEl.style.display="flex"
      

      const res = await fetch(`http://localhost:8000/users/${id}`,{
            method: "PATCH",
            body:JSON.stringify({
                  name: "TEST",
                  email: "EM@EM.COM",
                  phone: "123"
            }),
            headers:{
                  'Content-type': 'application/json; charset=UTF-8',
            }
      })
      const data = await res.json()
      console.log(data)
      userEl.innerHTML +=`
      <tr>
      <td>${data.id}</td>
      <td>${data.name}</td>
      <td>${data.email}</td>
      <td>${data.phone}</td>
      <td>
      <div id="icons">
      <img src="images/edit_icon.png" alt="">
      <img src="images/delete_icon.png" onclick="deleteUser()" alt="">
      </div>
      </td>
      </tr>
      `        
}

formEl.addEventListener('submit', (e)=>{
      e.preventDefault()
      addUser()
})


// DELETE USER FROM API
const deleteUser = async (id) =>{
      const res= await fetch(`http://localhost:8000/users/${id}`,{
            method: "DELETE",
      })
      const data = await res.json()
      console.log("ID SELECTED: ", id)
      console.log("DATA RETURNED ON DELETE: ", data)
}




// Open modal window

modalBtnEl.addEventListener("click", ()=>{
      modalContainerEl.style.display="flex"
      modalEl.style.display="flex"
})

// Close modal btn
closeModalBtn.addEventListener("click", ()=>{
      modalContainerEl.style.display="none"
      modalEl.style.display="none"
})
