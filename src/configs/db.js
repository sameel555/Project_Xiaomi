const mongoose = require("mongoose")

module.exports = () => {
    return mongoose.connect("mongodb+srv://sameel:Qazwsx@1995@cluster0.oqeem.mongodb.net/mi_db?retryWrites=true&w=majority", {
         
        useFindAndModify: false, 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
});
}
 