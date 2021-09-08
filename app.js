const express = require ('express');
const app = express();
const path = require ('path');
const indexRoutes = require('./src/routes/indexRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
const methodOverride= require('method-override');
const session = require('express-session');

const expressFileUpload= require('express-fileupload');

//const session = require('cookie-session');

//const cookies= require('cookie-parser');

//const cookieLogin = require('./src/middlewares/cookieLogin');

// app.listen(3000, () => {
//     console.log('Servidor 3000 corriendo');
// })
app.use(session({
	secret: "It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.listen(process.env.PORT || 3001, function(){
    console.log('Servidor corriendo en puerto 3001');
});

/*
app.use(session({
	secret: "It's a secret",
	resave: false,
	saveUninitialized: false,
}));
*/
//app.use(cookies());

//app.use(cookieLogin);


app.use(expressFileUpload(/*{
    limits: { fileSize: 1024 }, // limite del tamaño del archivo expresado en bytes (en este caso, 500kb)
    abortOnLimit: true, // seteando esta key en true, si el archivo supera el limite establecido en la linea anterior, no se sube 
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido" // mensaje si el archivo supera el limite de tamaño establecido
}*/));


app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.resolve(__dirname , './public')));

app.use(methodOverride('_method'));

app.set('view engine' , 'ejs');

app.use('/' , indexRoutes);


app.use('/product' , productRoutes);

app.use('/users' , userRoutes);

/*
app.get('/prueba', (req,res)=>{
	res.send(`
		<form method="POST" action="/prueba" enctype="multipart/form-data">
			<input type="file" name="foto">
			<button>Upload</button>
		</form>
	`)
});

app.post("/prueba", (req,res)=>{
	console.log(req.files);
	const objImages= req.files.foto;
	const name= objImages.name;
	objImages.mv(__dirname+'/archivos/'+name,(err)=>{
		if (err) {
			res.send("Hubo un error");
		}
		res.send("Archivo cargado con éxito");
	});
});
*/
	/*
	//const objImages= req.files.foto;
	if (objImages.size> 512000){
		// otra forma de validar el tamaño de una imagen
	};
	*/
	/*
	// una forma segura de validar que el archivo sea una imagen (el mimetype no se puede alterar)
	if (objImages.mimetype!='image/jpeg'){
		console.log("Solo puedes subir imagenes");
	}
	else {
		console.log("Acabas de subir un "+ objImages.mimetype);
	};
	// una forma segura de validar que el archivo sea una imagen (el mimetype no se puede alterar)
	*/
//});



