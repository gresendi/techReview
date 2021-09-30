const { axios } = window



console.log("Opened index")

axios.get('/api/items',{
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
.then(()=>{
  console.log("request worked")
}).catch(err=>console.log(err))