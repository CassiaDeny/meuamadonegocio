//Declaração de variáveis
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');
	cons = require('consolidate');
	MongoClient = require('mongodb').MongoClient,

//Configurações dos pacotes do Node.js para a aplicação
app.engine('html', cons.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));

//Definição da porta de listen do servidor
var port = Number(process.env.PORT || 3000);
app.listen(port);

//Handle para erros internos do servidor
function errorHandler(err, req, res, next){
	res.status(500);
	res.render('error_template', {error : err});
}

app.use(errorHandler);

//Conexão com banco de dados local (Cássia)
const CONNECTIONSTRING = "mongodb://localhost:27017/test";

//Rotas
app.post('/', function(req, res, next){
	getLeads(req, res, 'index');
});

app.get('/', function(req, res, next){
	res.render('index');
});

//============
//Matéria 1
//============
app.post('/como-usar-as-metas-para-vender-mais', function(req, res, next){
	getLeads(req, res, 'contents/como-usar-as-metas-para-vender-mais');
});

app.get('/como-usar-as-metas-para-vender-mais', function(req, res, next){
	res.render('contents/como-usar-as-metas-para-vender-mais');
});

//============
//Matéria 2
//============
app.post('/sera-que-eu-devo-aceitar-cartao', function(req, res, next){
	getLeads(req, res, 'contents/sera-que-eu-devo-aceitar-cartao');
});

app.get('/sera-que-eu-devo-aceitar-cartao', function(req, res, next){
	res.render('contents/sera-que-eu-devo-aceitar-cartao');
});

//============
//Matéria 3
//============
app.post('/como-usar-o-excel-ao-seu-favor', function(req, res, next){
	getLeads(req, res, 'contents/como-usar-o-excel-ao-seu-favor');
});

app.get('/como-usar-o-excel-ao-seu-favor', function(req, res, next){
	res.render('contents/como-usar-o-excel-ao-seu-favor');
});

//============
//Matéria 4
//============
app.post('/5-aplicativos-para-o-empreendedor-autonomo', function(req, res, next){
	getLeads(req, res, 'contents/5-aplicativos-para-o-empreendedor-autonomo');
})

app.get('/5-aplicativos-para-o-empreendedor-autonomo', function(req, res, next){
	res.render('contents/5-aplicativos-para-o-empreendedor-autonomo');
	
//============
//Matéria 5
//============
app.post('/passo-a-passo-de-como-abrir-um-cnpj', function(req, res, next){
	getLeads(req, res, 'contents/passo-a-passo-de-como-abrir-um-cnpj');
})

app.get('/passo-a-passo-de-como-abrir-um-cnpj', function(req, res, next){
	res.render('contents/passo-a-passo-de-como-abrir-um-cnpj');
	
//============
//Matéria 6
//============
app.post('/voce-tem-uma-estrategia-de-vendas', function(req, res, next){
	getLeads(req, res, 'contents/voce-tem-uma-estrategia-de-vendas');
})

app.get('/voce-tem-uma-estrategia-de-vendas', function(req, res, next){
	res.render('contents/voce-tem-uma-estrategia-de-vendas');


// Caminho estatico para a pasta publica [necessario para o Popup]
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


//Cadastro do visitante
function getLeads(req, res, page){

	res.render(page);

	var name = req.body.name;
	var menu = req.body.menu;
	var ip = req.body.ip;
	var date = new Date().toISOString();
	const email = req.body.email;
	const leadInfos = {'name': name, 'email': email, 'classe': menu, 'ip': ip, 'data': date};

	MongoClient.connect(CONNECTIONSTRING, function(err, db) {
		validateEmail(err, db, email, leadInfos);	
	});
}

//Funções
function validateEmail(err, db, email, leadInfos){
	console.log(leadInfos);
	console.log(email);

	var validator = require('validator');
	var isEmail = validator.isEmail(email);
	console.log(isEmail);

	if (isEmail) {
		var query = {"email": email};
		var cursor = db.collection('leads').find(query);
		var inBase = false;

		cursor.forEach(
			function(doc){
				//trocar por uma popup
				console.log("já cadastrado!")
				inBase = true;			
			},
			
			function(err){ 
				db.close();

				if (! inBase) {
					addLead(leadInfos);	
				} 
			}
		);
	}
}

function addLead(leadInfos){

	MongoClient.connect(CONNECTIONSTRING, function(err, db) {

		db.collection('leads').insertOne(leadInfos, function(err, res){
			if (err != null){
				console.log('Erro ao tentar inserir lead ' + err)
			}

			console.log("insert sucesso!");
			db.close();
		});
	});
}



