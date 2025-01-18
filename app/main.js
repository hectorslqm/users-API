console.log('Welcome! Feel free to use the site or tools like Postman or Thunder Client to interact with the API.')
console.log('If you need help, please contact me at: hectorslqm@gmail.com')
const loadInitialTemplate = () => {
    const template = `
        <h1>Users</h1>
        <form id="user-form">
            <div>
                <label>Name</label>
                <input name="name"/>
            </div>
            <div>
                <label>Last name</label>
                <input name="lastname"/>
            </div>
            <button type="submit">Submit</button>'
        </form>
        <ul id="user-list"></ul>
    `
    // This will replace the body of the html with the template above
    //since getElementsBytTagName returns an array we need to get the first element
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template
}

const handleDelete = async (users) => {
    //Here we are adding an event listener to each Delete button in the list
    users.forEach(user => {
        const userNode = document.querySelector(`[data-id="${user._id}"]`)
        userNode.onclick = async e => {
            //Delete the user from the database
            await fetch(`/users/${user._id}`, {
                method: 'DELETE'
            })
            //Delete the user from the list
            userNode.parentNode.remove()
            alert('User deleted')
        }
    })
}

const getUsers = async () => {
    const response = await fetch('/users')
    const users = await response.json()
    //console.log(users)
    const template = user => `
        <li>
            ${user.name} ${user.lastname} <button data-id="${user._id}">Delete</button>
        </li>
    `
    
    const userList = document.getElementById('user-list')
    userList.innerHTML = users.map(template).join('')
    //Here we are adding an event listener to each Delete button
    handleDelete(users)
}

const addFormListener = () => {
    const userForm = document.getElementById('user-form')
    userForm.onsubmit = async (e) => {
        e.preventDefault()
        //when the form is submitted we will create a new FormData object
        //this object will contain all the data from the form
        const formData = new FormData(userForm)
        const data = Object.fromEntries(formData.entries())
        //console.log(data)

        await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        //clean the form
        userForm.reset()
        getUsers()
    }
}
window.onload = () => {
    loadInitialTemplate()
    addFormListener()
    getUsers()
}