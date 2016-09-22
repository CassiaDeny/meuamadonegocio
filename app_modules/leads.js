exports.convertion = function (req){
	
	var name = req.body.name;
	var menu = req.body.menu;
	var ip = req.body.ip;
	var date = new Date().toISOString();
	const email = req.body.email;

	const leadInfos = {'name': name, 'email': email, 'classe': menu, 'ip': ip, 'data': date};

	var validator = require('validator');
	var isEmail = validator.isEmail(leadInfos.email);

	if (isEmail) {
		
		var query = {"email": leadInfos.email};
		var inBase = false;
		
		mongodb.connect(CONNECTIONSTRING, function(err, db) {
			
			var cursor = db.collection('leads').find(query);

			cursor.forEach(
				function(doc){
					console.log("já cadastrado!")
					inBase = true;			
				},
				
				function(err){ 
					db.close();

					if (! inBase) {
						add(leadInfos);	
					} 
				}
			);
		});
	}
};

function add(leadInfos){

	mongodb.connect(CONNECTIONSTRING, function(err, db) {

		db.collection('leads').insertOne(leadInfos, function(err, res){
			if (err != null){
				console.log('Erro ao tentar inserir lead ' + err)
			}

			console.log("insert sucesso!");
			db.close();
		});
	});
}

const CONNECTIONSTRING = "mongodb://localhost:27017/test";
var mongodb = require('mongodb').MongoClient;

