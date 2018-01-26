import path from 'path';
import { validateEmail, generateHasPass, validatePassword } from './helper';
import User from './db/User';
import session from 'express-session';

import bodyParser from 'body-parser';
// nếu chưa cài đặt babel bạn phải import bằng require
//const path = require('path');

// goi thư viện vào 1 hàm.
const express = require('express');

const app = express();



//set view html dbang thu vien ejs.
app.set('view engine', 'ejs');

//set up foder name is public static files
app.use(express.static('public'));

//set up bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'cmc nodejs traning',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    // cookie: { secure: true }, > chỉ dành cho https. hiện tại là http nên chỉ có session nhưng ko lưu đc cookie
    // nên sử dụng tab trình duyệt khác vẫn chưa lấy đc session => lại phải đăng nhập lại
}));


//set up path off foder views
app.set('views', path.join(__dirname, '/myviews'));
/**
 * when user request to /
 * render index in foder views
 */
app.get('/', (req, res) => {
    res.render('index');
    console.log('See You');
})


app.get('/users', (req, res) => {
    //res.send('List users');
    const userDB = new User();
    res.json({ users: userDB.list() })
});

app.post('/users', (req, res) => {
    //res.send('Create users');
    const userDB = new User();
    res.json({ users: userDB.add() })
});

app.get('/messages', (req, res) => {
    res.send('List meassage');
});

app.post('/messages', (req, res) => {
    res.send('Create meassage');
});

app.put('/user', (rep, res) => {
    res.send('put request /user');
});

app.delete('/user', (rep, res) => {
    res.send('delete request /user');
});

/**
 * return signup page when try to access signup page
 */
app.get('/signup', (req, res) => {
    res.render('signup');
});

/**
 * Get data from req.body
 * Data include email, username and password
 * Check not null three fields. If one field null. thorw BadRequest 400.
 * Check email is valid format. If not, thorw BadRequest 400.
 * Hasing password SHA256.
 * Save user to database.
 * IF save sucessfully, return 200.
 * IF faile, return GeneralError 500.
 */
app.post('/signup', (req, res) => {
    //bản chất là: >const username = req.body.username;
    const { username, password, email } = req.body;
    //  res.render('signup')
    if (!username
        || !password
        || !email
        || !validateEmail(email)
        || !validatePassword(password)
    )
        res.status(400).send('Invalid data');

    try {
        const hashPass = generateHasPass(password);
        // add user
        const userDb = new User();
        const result = userDb
            .add({ email, username, hashPass })
            .list()
        req.session.username = username;

        req.session.save(() => {
            res.render('dashboard', {
                username : req.session.username,email
            });
        });
        //res.json(result);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went worng');
    }

});

app.get('/dashboard', (req, res) => {
    const contacts = [
        {
            username: '',
            email: ''
        }
    ]
    if (!req.session.username) {
        res.redirect('/login');
    } else {
        res.render('dashboard');
    }
})

app.get('/login', (req, res) => {
    res.send('You are on login page');
})

app.listen(3000, () => { console.log('connect port 3000') });