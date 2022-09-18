const express = require('express');
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const ENV = require('dotenv').config();
const app = express()

const url = process.env.API_URL

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database')
    })
    .catch((err) => {
        console.log(`Error connecting to the database. ${err}`);
    })

app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))


app.use('/articles', articleRouter)


app.get('/', async (req, res) => {
    
    const articles = await Article.find().sort({createdAt: 'desc'})


    res.render('articles/index', {articles: articles})
})


app.listen(5000)