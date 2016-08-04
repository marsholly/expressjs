const PORT = 8000;

const express = require('express');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const Cat = require('./models/cat');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


app.use(express.static('public'));


let path = require('path');

app.get('/', (req, res)=>{   //middleware
    let filepath = path.join(__dirname, './index.html');
    res.sendFile(filepath);
});


app.route('/cats')
   .get((req, res)=>{
      //GET/cats  - get all cats

    Cat.getAll(function(err, cats){
      if(err){
        res.status(400).send(err);
      }else{
        res.send(cats);
      }
     
    });

   })
   .post((req,res)=>{
      //POST/cats  - create a new cat
      Cat.create(req.body, function(err){
        if(err){
          res.status(400).send(err);
        } else {
          res.send();
        }
      });
   });

/*
app.get('/cats/:id/:color', (req, res)=>{
   console.log('req.params:', req.params);

   res.send('one cat!');
})
*/

app.route('/cats/:id')
   .get((req, res)=>{   //GET/cats/5 - get one cat
    Cat.getOne(function(err, cats){
      let cat;
      if(err){
        res.status(400).send(err);
      }else{
        for(let i = 0; i < cats.length; i++){
          if(cats[i].id === req.params.id)
            cat = cats[i];
        } 
        res.send(cat);
      }
    });
      // res.send(`Here is cat #${req.params.id}!`);
   })
   .put((req, res)=>{  // PUT/cats/5 - update one cat
    Cat.putOne(req.params.id, req.body, function(err){
      if(err){
        res.status(400).send(err);
      }else{
        res.send(req.body);
      }     
    });   
   })
   .delete((req, res)=>{  //DELETE/cats/5 - delete one cat
    Cat.deleteOne(req.params.id, function(err){
      if(err){
        res.status(400).send(err);
      }else{

        Cat.getAll(function(err, cats){
          if(err){
            res.status(400).send(err);
          }else{
            res.send(cats);
          }
        });
      }
    });
   });
    

app.listen(PORT, err=>{
  console.log(err || `Server listening on port ${PORT}`);
});





