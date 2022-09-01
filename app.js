var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const dadosDoUsuarioLogadoMiddleware = require('./middlewares/dadosDoUsuarioLogadoMiddlewares');
const methodOverride = require('method-override'); 

var indexRouter = require('./routes/indexRouter');
var usuariosRouter = require('./routes/usuariosRouter');
var checkoutRouter = require('./routes/checkoutRouter');
var carrinhoRouter = require('./routes/carrinhoRouter');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Confifurando o uso de sessões
app.use(session({
  secret: "codeProgfer",
  resave: "true",
  saveUninitialized: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Seta o uauário como logado ou não 
app.use(dadosDoUsuarioLogadoMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/usuario', usuariosRouter);
app.use('/checkout', checkoutRouter);
app.use('/carrinho', carrinhoRouter);

//Adicionando rota para meu arquivo de erro 404
app.use((req, res)=>{
  res.status(404).render('not-found');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
