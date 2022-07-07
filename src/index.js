const currentExhibitTitle = document.getElementById('exhibit-title')
const currentExhibitImg = document.getElementById('exhibit-image')
const commentSection = document.getElementById('comments-section')
const ticketsBought = document.getElementById('tickets-bought')
const buyTicket = document.getElementById('buy-tickets-button')
const commentForm = document.getElementById('comment-form')

const dataUrl = 'http://localhost:3000/current-exhibits/'
let data = {}

let currentId = 1

const getData = async (url)=>{
    let req = await fetch(url)
    return res = await req.json()
}

const makeNewComment= async (comment)=>{
    let p = document.createElement('p')
    p.textContent = comment
    commentSection.appendChild(p)
}

const renderData = async ()=>{
    data = await getData(dataUrl)
    let currentData = data[0]
    currentExhibitImg.src=currentData.image
    currentExhibitTitle.textContent = currentData.title
    ticketsBought.textContent = `${currentData.tickets_bought} tickets bought`
    let comments = currentData.comments
    
    comments.map((comment)=> makeNewComment(comment))
}

buyTicket.addEventListener('click', async (e)=>{
    e.preventDefault()
    let ticketSold = parseInt(ticketsBought.textContent)+1
    fetch(dataUrl+currentId,{
        method:'PATCH',
        headers:{'Content-type':'application/json'},
        body: JSON.stringify({"tickets_bought":ticketSold})
    })
    ticketsBought.textContent = `${ticketSold} tickets bought`

})

commentForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    let newComment = commentForm['comment-input'].value
    fetch(dataUrl+currentId,{
        method:'PATCH',
        headers:{'Content-type':'application/json'},
        body: JSON.stringify({'comments':[...data[0].comments, newComment]})
    })
    makeNewComment(newComment)
    data = await getData(dataUrl)
})

renderData()