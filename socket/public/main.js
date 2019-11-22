
var socket = io.connect('192.168.43.210:9090', { 'forceNew': true });

socket.on('messages', function(data) {
    console.log(data);
    render(data);
})

//ESPRESIONES REGULARES
  expresionvocal = /[aeiou|áéíóú]/ig;
  expresionmayuscula = /(\b[A-Z|ÁÉÍÓÚ])[a-z|áéíóú|A-Z|ÁÉÍÓÚ]/g;
  expresionumeros = /[\d]/g;
  expresionconsonante = /[a-záéíúóA-ZÁÉÍÓÚ]+([^aeiouáéíóú\? ])\b/g;

//MUESTRA LOS DIALOGOS FIJOS DEL CHAT
function render(data) {
    var html = data.map(function(elem, index) {
        return (`<div>
            <em>Palabras enviadas: <strong>${elem.textos}</strong></em><br>
            <em>Vocales enviadas: <strong>${elem.vocal}</strong></em><br>
            <em>Mayusculas enviadas: <strong>${elem.mayus}</strong></em><br>
            <em>Sin vocal enviados: <strong>${elem.final}</strong></em><br>
            <em>Numeros enviados: <strong>${elem.num}</strong></em>
              <li><strong>${elem.author}</strong>:
              <em>${elem.text}</em></li>
              <hr>
              
            </div>`);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

//MUESTRA EL MENSAJE ESCRITO
function addMessage(e) {

    var mensaje = document.getElementById('texto').value;//se toma lo que haya escrito el usuario

    //Sección para comparar números
    var pruebanumeros = mensaje.match(/[\d]/g);//Se almacenan
    try {
        pruebanumeros = pruebanumeros.length;//El tamaño de la lista es la cantidad de números encontrados
    } catch (error) {
        console.log("El mensaje no contiene ningun numero. Colocando nulo");//En caso de que no se encuentre ningún número, el tamaño de la lista será nulo. Para evitar errores, se asignará el valor de cero
        /*pruebanumeros = 0;*/
    }

    //DEAFULT MUESTRA EL MENSAJE DEL SERVER
    var message = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,

    //Contamos todos los pedazos de cadenas que existen
        textos: document.getElementById('texto').value.replace(/\r?\n/g," ").replace (/[ ]+/g," ").replace (/^ /,"").replace (/ $/,"").split (" ").length,
        vocal: document.getElementById('texto').value.match(/[aeiou|áéíóú]/ig).length,
        mayus: document.getElementById('texto').value.match(/(\b[A-Z|ÁÉÍÓÚ])[a-z|áéíóú|A-Z|ÁÉÍÓÚ]*/g).length,
        final: document.getElementById('texto').value.match(/[a-záéíúóA-ZÁÉÍÓÚ]+([^aeiouáéíóú\? ])\b/g).length,
        num: pruebanumeros
    };

    
    socket.emit('new-message', message);
    return false;
}