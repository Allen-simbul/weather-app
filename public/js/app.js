const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    const location = search.value

    event.preventDefault()

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch(`http://localhost:8080/weather?address=${location}`)
    .then(res => {
        res.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.temperature
            }
        })
    })
})
