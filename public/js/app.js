console.log('Javascript file loaded') 
 

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-id-1')
const message2 = document.querySelector('#message-id-2')
 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    message1.textContent = 'Loading...'
    message2.textContent = ''

    const location = search.value
     
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            
            if(data.error){
                message1.textContent = data.error 
                return
            }
 
            message1.textContent = data.location
            message2.textContent = data.forecast
            
        })
    })
})