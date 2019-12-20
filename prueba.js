//probando genarators
function* hola(i){
    yield i;
    yield i + 10;
  }
   
   const gen = hola(10);
  
  console.log('primer valor',gen.next().value);
