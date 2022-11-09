function contrasenaValida (pass){
  let arr = ['hjk23', 'mnPUp47'];
  return arr.some(item => item === pass);

};

console.log(contrasenaValida('hjk23'));
console.log(contrasenaValida('hola'));
console.log(contrasenaValida('mnPUp47'));

