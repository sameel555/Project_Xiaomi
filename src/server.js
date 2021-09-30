const express = require("express")
const path = require("path")
const connect = require("./configs/db");
const app = new express();
const bodyParser = require("body-parser");
const session = require('express-session');
const flash = require('connect-flash');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'))
app.use('/static', express.static(path.join(__dirname, "public"))
)
app.set("view engine", "ejs");

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}))
app.use(flash());

const homeController = require('./controllers/home.controller')
const userController = require("./controllers/user.controller");
const cartController = require("./controllers/cart.controller");
const loginController = require("./controllers/login.controller");
const signupController = require("./controllers/signup.controller");

app.use('/', homeController);
app.use("/users", userController);
app.use("/cart", cartController);
app.use('/login', loginController);
app.use('/signup', signupController);

app.listen(2222, async () => {
    await connect();
    
    console.log("Listening on Port 2222");
})


