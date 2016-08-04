const request = require('request');



function getPerson(id, callback){
  request.get(`http://swapi.co/api/people/${id}/`, function(err, response, body){
    // console.log('err:', err);
    // console.log('body:', body);
    if(err){
      callback(err);
    }else{
      callback(null, body);
    }
  });
}



getPerson(5, function(err, body){
  console.log('body in callback: ', body);
});