const weatherForm = document.querySelector('form')
const inputSearch = document.querySelector('input')
const messageSuccess = document.querySelector('#message-success')
const messageError = document.querySelector('#message-fail')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = inputSearch.value

    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageError.textContent = data.error
                messageSuccess.textContent = ''
            }
            else {
                messageSuccess.textContent = data.location
                messageSuccess.textContent = data.forecast
                messageError.textContent = ''
            }
        })
    })    
})