const { model, Schema } = require('mongoose')

const Item = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  purchase:{
    type:String,
    required:true
  },
  review:{
    type:String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

module.exports = model('Item', Item)
