const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }).then(() => {console.log("Database connected")});

  } catch (error) {
    console.log(error);
    throw new Error('Error en la base de datos')
  }
}

module.exports = {
  dbConnection
}