const express = require('express');
const router = express.Router();
let users = require('./data/users.json');

// menampilkan landing page saat pertama mengakses halaman web
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Landing Page'
    })
})

// menampilkan data user static ke bentuk JSON (hanya untuk tes)
router.get('/user', (req, res) => {
    res.status(200).json(users);
})

// menampilkan halaman untuk login menggunakan data statis
// data untuk login terdapat di folder data
router.get('/login', (req, res) => {
    res.render('login-form', {
        title: 'Login Form'
    })
})

// memproses login dengan data statis
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const name = users[0].name;
    const matchUser = users.find(data => data.username === username);
    const matchPass = users.find(data => data.password === password);

    if (!matchUser && !matchPass) {
        res.send('Hmm ... username dan password kamu salah nih')
        console.log(req.body)
    } else if (matchUser) {
        if (matchPass) {
            console.log(`Hai, ${name}! Kamu telah berhasil login.`)
            res.redirect('/suit-game')
        } else {
            res.send(`Ups! Salah password, silakan coba lagi ya.`);
        }
    } else {
        res.send('Ups! Username yang kamu masukkan salah.');
    }  
})

// menampilkan halaman suit setelah login
router.get('/suit-game', (req, res) => {
    res.render('suit-game', {
        title: 'Suit'
    })
})

module.exports = router;