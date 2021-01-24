const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const WishlistModel = require('./models/Wishlist');

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://root:QQB643xwgBYBPbRl@crud.nji8a.mongodb.net/wishlist?retryWrites=true&w=majority', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

);

app.post('/insert', async (req, res) => {

    const title = req.body.title;
    const author = req.body.author;
    const type = req.body.type;
    const wishlist = new WishlistModel({title: title, author: author, type: type});

    try
    {
        await wishlist.save();
        res.send("inserted data");
        
    }
    catch(err) {
        console.log(err);
    }
});

app.get('/read', async (req, res) => {
    WishlistModel.find({}, (err, result) => {
        if(err) {
            res.send(err)
        }

        res.send(result);
    })
});

app.put('/update', async (req, res) => {

    const newTitle = req.body.updatedTitle;
    const newAuthor = req.body.updatedAuthor;
    const newType = req.body.updatedType;
    const id = req.body.id;


    try
    {
        await WishlistModel.findById(id, (err, updatedValues) => {
            updatedValues.title = newTitle;
            updatedValues.author = newAuthor;
            updatedValues.type = newType;
            updatedValues.save();
            res.send("update");
        })
    }
    catch(err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await WishlistModel.findByIdAndRemove(id).exec();
    res.send("deleted")
})

app.listen(3001, () => {
    console.log("Server running on port 3001...");
});