const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//config
const router = require('express').Router();
const app = express();
app.use(bodyParser.json());


//conexão do banco
mongoose.connect("mongodb://127.0.0.1:27017/rev",{
    useNewUrlParser: true,
    useUnifiedTopology : true,
    serverSelectionTimeoutMS : 20000
});

//model
const UserSchema = new mongoose.Schema({
    name: {type: String},
    emai: {type: String, required: true},
    password : {type:String, required : true}
})

const User = mongoose.model('User', UserSchema);
//criando a rota de get
    app.get("/", (req, res)=>{
        res.sendFile(__dirname + 'index.html')
    })

//criando rota de teste
router.post("/cadastro", async (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(name == null || email == null || password == null){
        return res.status(400).json({error: "digite os campos porra !!!"})
    };
    const user = 
    try{
        const newUser = await User.save();
        res.json({error: null , msg:"cadastro OK porraa!!!!"})
    }
    catch(error){
        res.status(400).json({error});
    }
} )

app.listen(3000, ()=>{
    console.log("rodando na porta 3000")
})

