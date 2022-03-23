const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')

const routes = require('./routes');

const app = express();
const logger = morgan("dev"); 
app.use(logger);
app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.get('/', (req, res) => {
  res.json({ message: '/ endpoint' })
})


/*
app.post('/login', (req, res) => {res.json('login success')}) // 각각의 요청에 대해 핸들링 하는 함수를 두번째 인자로 넣습니다.
app.get('/categories', sendCategories);
app.get('/products', sendProducts)
app.get('/products/:id', sendProdutById);
app.route('/users').post(postUsers).get(getUsers);
app.route('/users/signup').post(postSignup)
app.post('/users/login',loginUser);
app.get('user/verification', verifyUser)

const { sendProducts } = require('./sendProducts')
const {sendCategories} = require('./categories');
const {sendProdutById} = require('./productById')
const {postSignup} = require('./handleSignup')

const {loginUser} = require('./loginUser');
const {verifyUser} = require('./verifyUser');
*/

const server = http.createServer(app)

server.listen(8000, () => {
  console.log('server is listening on PORT 8000')
})