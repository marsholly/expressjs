const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const dataFilePath = path.join(__dirname, '../data/cats.json');

exports.getAll = function(callback){
  //1. read the json file, to get the data
  //2. parse the data, to get the array
  //3. callback with the array (if there's an error, callback with error)
  
  fs.readFile(dataFilePath, (err, buffer)=>{ 
    if(err){
      callback(err);
      return; 
    } 

    let cats;
    try{
      cats = JSON.parse(buffer);
    } catch(e){
      callback(err);
      return;
    }

    // cats
    callback(null, cats);
  });
}

exports.create = function(catObj, callback){
  exports.getAll(function(err, cats){
    if(err)  return  callback(err);

    catObj.id = uuid.v4();
    
    cats.push(catObj);

    fs.writeFile(dataFilePath, JSON.stringify(cats),function(err){
      callback(err);
    });
  });
}

exports.getOne = function(callback){

  fs.readFile(dataFilePath, (err, data)=>{
    if(err) return callback(err);
    
    let cats, cat;
    try{
      cats = JSON.parse(data);
    }catch(e){
      callback(err);
      return; 
    } 
    callback(null, cats);
  });
}

exports.putOne = function(id, catObj, callback){
  exports.getOne(function(err, cats){
    if(err) return callback(err);
    for(let i = 0; i < cats.length; i++){
      if(cats[i].id === id){
        catObj.id = id;
        cats.splice(i,1,catObj);
      }
    }
    fs.writeFile(dataFilePath, JSON.stringify(cats),function(err){
      callback(err);
    });
  });
}

exports.deleteOne = function(id, callback){
  exports.getOne(function(err, cats){
    if(err) return callback(err);
    for(let i = 0; i < cats.length; i++){
      if(cats[i].id === id){
        cats.splice(i,1);
      }
    }
    fs.writeFile(dataFilePath, JSON.stringify(cats), function(err){
      callback(err);
    });
  });
}


