console.log('Welcome! Feel free to use the site or tools like Postman or Thunder Client to interact with the API.')
console.log('If you need help, please contact me at: hectorslqm@gmail.com')

const loadInitialTemplate = () => {
    const template = `
        <h1 class="text-3xl tracking-widest font-bold text-slate-900 text-center">Users API</h1>
        <div class="flex flex-row min-w-full">
            <div class=" bg-slate-200 shadow-lg rounded-bl-lg rounded-tl-lg max-w-sm p-2">
                <div class="w-full">
                    <h1 class='text-2xl font-bold text-slate-800 text-center'>REGISTER A NEW USER</h1>
                    <form id="user-form" class="space-y-4 pt-4 p-6">
                        <div>
                            <label class="block text-xl font-semibold text-gray-700">Name</label>
                            <input name="name" class="text-lg w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-300 focus:border-sky-300"/>
                        </div>
                        <div>
                            <label class="block text-xl font-semibold text-gray-700">Last name</label>
                            <input name="lastname" class="text-lg w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-300 focus:border-sky-300"/>
                        </div>
                        <div class="flex justify-center">
                            <button type="submit" class="text-xl text-bold bg-sky-900 text-white py-2 px-6 rounded-lg hover:bg-sky-300 focus:ring-2 focus:ring-sky-300 border-0"> Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="ml-2 flex-grow bg-slate-200 shadow-lg rounded-tr-lg rounded-br-lg p-2">
                <ul id="user-list" class="mt-6 list-disc pl-2 pr-2 text-slate-900"></ul>
            </div>
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
            <span class="text-xl font-semibold text-gray-800">
                ${user.name} ${user.lastname}
            </span>
            <button data-id="${user._id}" class="border-0 text-lg bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
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