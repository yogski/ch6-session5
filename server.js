const express = require('express')
const app = express()
const PORT = 8000

// connect to DB
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres', // your db user
  host: 'localhost',
  database: 'chapter6', // your db name
  password: 'qwertyuiop', // your db password
  port: 5432,
})

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
            res.render('articles/success',{id: article.id})
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

app.get('/players', async (req, res) => {
    pool.query('SELECT * FROM players ORDER BY id ASC', (error, results) => {
        if (error) {
          res.status(500).json(error)
        }
        res.render('players/all', {data: results})
    })
})

// TUGAS
// get players under level X
// '/players/under/:6' --> player with level 6 or lower
app.get('/players/under/:lvl', (req, res) => {
    // YOUR CODE
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
