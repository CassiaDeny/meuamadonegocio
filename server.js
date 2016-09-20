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

//Conexão com banco de dados de produção
//const CONNECTIONSTRING = "mongodb://bdadmin:bdadmin@ds021346.mlab.com:21346/geproject";

//Conexão com banco de dados local (Cássia)
const CONNECTIONSTRING = "mongodb://localhost:27017/test";

//Rotas
app.get('/', function(req, res, next){
	res.render('index');
});

app.get('/como-usar-maquininha', function(req, res, next){
	res.render('contents/como-usar-maquininha');
});

app.post('/como-usar-as-metas-para-vender-mais', function(req, res, next){
	res.render('contents/como-usar-as-metas-para-vender-mais');
});

app.post('/sera-que-eu-devo-aceitar-cartao', function(req, res, next){
	res.render('contents/sera-que-eu-devo-aceitar-cartao');
});

app.post('/como-usar-o-excel-ao-seu-favor', function(req, res, next){
	res.render('contents/como-usar-o-excel-ao-seu-favor');
});

//Cadastro do visitante
app.use('/cadastronews', function(req, res, next){

	var name = req.body.name;
	var menu = req.body.menu;
	var ip = req.body.ip;
	var page = req.body.page
	var date = new Date().toISOString();
	const email = req.body.email;
	const leadInfos = {'name': name, 'email': email, 'classe': menu, 'ip': ip, 'data': date};

	MongoClient.connect(CONNECTIONSTRING, function(err, db) {
		validateEmail(err, db, email, leadInfos);	
		res.render(page);
	});
});


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



