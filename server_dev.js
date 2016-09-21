//Declaração de variáveis
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	leads = require('./app_modules/leads.js');

//Configurações dos pacotes do Node.js para a aplicação
app.engine('html', cons.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));

// Caminho estatico para a pasta publica [necessario para o Popup]
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//Definição da porta de listen do servidor
var port = Number(process.env.PORT || 3000);
app.listen(port);

//Handle para erros internos do servidor
function errorHandler(err, req, res, next){
	res.status(500);
	res.render('error_template', {error : err});
}

app.use(errorHandler);

//Rotas
app.post('/', function(req, res, next){
	
	leads.convertion(req);
	res.render('index');
});

app.get('/', function(req, res, next){
	res.render('index');
});

//============
//Matéria 1
//============
app.post('/como-usar-as-metas-para-vender-mais', function(req, res, next){

	leads.convertion(req);
	res.render('contents/como-usar-as-metas-para-vender-mais');
});

app.get('/como-usar-as-metas-para-vender-mais', function(req, res, next){
	res.render('contents/como-usar-as-metas-para-vender-mais');
});

//============
//Matéria 2
//============
app.post('/sera-que-eu-devo-aceitar-cartao', function(req, res, next){

	leads.convertion(req);
	res.render('contents/sera-que-eu-devo-aceitar-cartao');
});

app.get('/sera-que-eu-devo-aceitar-cartao', function(req, res, next){
	res.render('contents/sera-que-eu-devo-aceitar-cartao');
});

//============
//Matéria 3
//============
app.post('/como-usar-o-excel-ao-seu-favor', function(req, res, next){
	gleads.convertion(req);
	res.render('contents/como-usar-o-excel-ao-seu-favor');
});

app.get('/como-usar-o-excel-ao-seu-favor', function(req, res, next){
	res.render('contents/como-usar-o-excel-ao-seu-favor');
});

//============
//Matéria 4
//============
app.post('/5-aplicativos-para-o-empreendedor-autonomo', function(req, res, next){
	
	leads.convertion(req);
	res.render('contents/5-aplicativos-para-o-empreendedor-autonomo');
});

app.get('/5-aplicativos-para-o-empreendedor-autonomo', function(req, res, next){
	res.render('contents/5-aplicativos-para-o-empreendedor-autonomo');
});

//============
//Matéria 5
//============
app.post('/passo-a-passo-de-como-abrir-um-cnpj', function(req, res, next){
	
	leads.convertion(req);
	res.render('contents/passo-a-passo-de-como-abrir-um-cnpj');
});

app.get('/passo-a-passo-de-como-abrir-um-cnpj', function(req, res, next){
	res.render('contents/passo-a-passo-de-como-abrir-um-cnpj');
});

//============
//Matéria 6
//============
app.post('/voce-tem-uma-estrategia-de-vendas', function(req, res, next){
	
	leads.convertion(req);
	res.render('contents/voce-tem-uma-estrategia-de-vendas');
});

app.get('/voce-tem-uma-estrategia-de-vendas', function(req, res, next){
	res.render('contents/voce-tem-uma-estrategia-de-vendas');
});	





