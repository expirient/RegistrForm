var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname)); // Встановлення каталогу для статичного контенту! (CSS/script)

app.get("/",function(req,res){ //опрацьовуємо корінь сайту "/" + callback (req,res)
	res.sendFile(__dirname + "/index.html");
});

/*app.post('/pathPost',function(req,res){
	console.log(req.query);
	console.log(req.body);
	res.send('Sucsses!');
	var word = req.body.word;
	var simbol = req.body.simbol;
		var count = 0;
		for(var i = 0; i < word.length; i++){
			if(word[i] == simbol){
				count++
			}
		}
		res.send('' + count);
});*/

app.get('/sendRegFile',function(req,res){
	res.sendFile(__dirname + '/form.html');
});
app.get('/sendLogFile',function(req,res){
	res.sendFile(__dirname + '/login.html');
});

app.post('/isRegistered',function(req,res){

	var firstN = req.body.firstname;
	var lastN = req.body.lastname;
	var pass = req.body.password;

	var file = require("./data.json");// . означає що з текучого обьєкту
		for(var key in file){
			for(var value in file[key]){
				if(file[key][value] == firstN || file[key][value] == lastN || file[key][value] == pass){
					res.send('This user already exists...');
					return;
				}
			}
		}
		file.push(req.body);// обєкт файлу
	/*console.log(file);*/
	
	var str = JSON.stringify(file);
	fs.writeFileSync('data.json',str);
	res.send('Registration completed successfully!');
});

app.post('/trueLogin',function(req,res){
	/*var admin = {
		firstname: 'wds',
		password: 'honda72'
	}*/
	var firstN = req.body.firstname;
	var pass = req.body.password;

	var file = require("./data.json");// . означає що з текучого обьєкту
	
	for(var key in file){
			for(var value in file[key]){
				//console.log(file[key].firstname);
				if(file[key].firstname == firstN && file[key].password == pass){
					res.send(firstN);
					return;
				}
			}
	}
	/*if(admin.firstname == firstN && admin.password == pass){
		res.send(firstN);
	}*/
		res.sendFile(__dirname + '/error.html');
});

app.listen(process.env.PORT||8080); // задаємо порт
console.log("Start server!");