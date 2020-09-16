const express = require('express')
const app = express()
const PORT = 8000

// View Engine
app.use(express.static('public'))
app.set('view engine', 'ejs')

// Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/articles', (req, res) => {
    try {
        Article.create({
            title: req.body.title,
            body: req.body.body
        }).then(article => {
            res.send('Article berhasil dibuat')
        })
    } catch (error) {
        res.status(500).json({"message": error})
    }
}
)

app.get('/articles/create', (req, res) => {
    res.render('articles/bikin') // lokasi file yang mau di render dari folder views
})

app.get('/home', (req, res) => {
    res.render('home') // lokasi file yang mau di render, dari folder views
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
