console.log('Welcome! Feel free to use the site or tools like Postman or Thunder Client to interact with the API.')
console.log('If you need help, please contact me at: hectorslqm@gmail.com')
const loadInitialTemplate = () => {
    const template = `
        <div class="bg-slate-100 shadow-lg rounded-lg p-4 max-w-sm mx-auto">
            <h1 class='text-3xl font-bold text-blue-600 text-center'>REGISTER A NEW USER</h1>
            <form id="user-form" class="space-y-6 p-6">
                <div>
                    <label class="block text-lg font-semibold text-gray-700">Name</label>
                    <input name="name" class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <label class="block text-lg font-semibold text-gray-700">Last name</label>
                    <input name="lastname" class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div class="flex justify-center">
                    <button type="submit" class="text-bold bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"> Submit</button>
                </div>
            </form>
            <ul id="user-list" class="mt-6 list-disc pl-5 text-gray-700"></ul>
        </div>
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
        <li class="flex justify-between items-center p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg">
            <span class="text-lg font-semibold text-gray-800">
                ${user.name} ${user.lastname}
            </span>
            <button data-id="${user._id}" class="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                Delete
            </button>
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