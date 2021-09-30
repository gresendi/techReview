const { axios } = window




document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token')
  window.location = '/logIn.html'
})


axios.get('/api/items',{
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
.then(({data:items})=>{
  
  items.forEach(item => {
    
    let itemsUser = item.user.username
    
    axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(({data})=>{
      
      if(itemsUser===data.username){
        console.log("same")
        let cardContainer = document.createElement('div')
        cardContainer.className = "card mb-3"
        cardContainer.innerHTML = `
    <div class="row g-0">
            <div class="col-md-4">
              <img src="${item.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title">${item.name}</h3>
                <a href = "${item.purchase}" class="card-title">Link to purchasing site</a>
                <div>
                <a href = "${item.review}" class="card-title">link to review</a>
                </div>
                <!-- <p class="card-text"></p> -->
                <button data-id= "${item._id}" type="button" class="btn btn-danger delete">delete</button>
              </div>
            </div>
          </div>

    
    `
        document.getElementById('techItems').prepend(cardContainer)
      }else{
        console.log("different")
        let cardContainer = document.createElement('div')
        cardContainer.className = "card mb-3"
        cardContainer.innerHTML = `
    <div class="row g-0">
            <div class="col-md-4">
              <img src="${item.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title">${item.name}</h3>
                <a href = "${item.purchase}" class="card-title">Link to purchasing site</a>
                <div>
                <a href = "${item.review}" class="card-title">link to review</a>
                </div>
                <!-- <p class="card-text"></p> -->
                
              </div>
            </div>
          </div>

    
    `
        document.getElementById('techItems').prepend(cardContainer)



      }


      console.log(data)
    })

    
  });
}).catch(err=>{
  console.log(err)
  window.location='/login.html'
})


document.getElementById('addItem').addEventListener('click', event =>{
  event.preventDefault()
  let name = document.getElementById('itemName').value 
  let image = document.getElementById('itemUrl').value
  let purchase = document.getElementById('itemPurchase').value
  let review = document.getElementById('itemReview').value
  document.getElementById('itemName').value=''
  document.getElementById('itemUrl').value = ''
  document.getElementById('itemPurchase').value = ''
  document.getElementById('itemReview').value = ''
  console.log(name)
  console.log(image)
  console.log(purchase)
  console.log(review)

  axios.post('/api/items',{
    name:name,
    image: image,
    purchase: purchase,
    review:review,
    
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }

  }).then(({data:item})=>{

    let cardContainer = document.createElement('div')
    cardContainer.className = "card mb-3"
    cardContainer.innerHTML= `
    <div class="row g-0">
            <div class="col-md-4">
              <img src="${item.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title">${item.name}</h3>
                <a href = "${item.purchase}" class="card-title">Link to purchasing site</a>
                <a href = "${item.review}" class="card-title">link to review</a>

                <!-- <p class="card-text"></p> -->
               
              </div>
            </div>
          </div>

    
    `
    document.getElementById('techItems').prepend(cardContainer)



    console.log(item.name)
  })




})

document.addEventListener('click',event =>{
  event.preventDefault()


  if(event.target.classList.contains('delete')){
    console.log("deleting")
    let id = event.target.dataset.id 
    console.log(id)

    axios.delete(`/api/items/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(() => {
      console.log("item deleted")
    })

  }
  
})