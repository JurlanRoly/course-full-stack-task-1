var regiones = new Array();

fetch('https://restcountries.com/v3.1/all', { method: 'GET' })
  .then((items) => items.json())
  .then((items) => {
    items.forEach((item) => {
      regiones.push(item.region);
    });
    mostrarRegiones(regiones);
  });

var select = document.getElementById('region');
var list = document.getElementById('countrie');

function mostrarRegiones(data) {
  var uniqueData = [...new Set(data)];

  console.log(data);
  console.log(uniqueData);
  for (let i = 0; i < uniqueData.length; i++) {
    var option = document.createElement('option');
    option.text = uniqueData[i];
    option.value = uniqueData[i];
    select.appendChild(option);
  }
}

function searchCoutrie() {
  if (!select.value) {
    alert('Debe seleccionar una región');
  }
  fetch(`https://restcountries.com/v3.1/region/${select.value}`, {
    method: 'GET',
  })
    .then((items) => items.json())
    .then((items) => {
      list.innerHTML = '';
      items.forEach((item) => {
        var li = document.createElement('li');
        var q = document.createElement('q');
        var text = document.createTextNode(item.translations.spa.official);
        var textSmall = document.createTextNode(item.subregion);
        li.appendChild(text);
        q.appendChild(textSmall);
        li.appendChild(q);
        li.setAttribute('onclick', `countrieDetail(event)`);
        li.accessKey = item.ccn3;
        li.id = item.cca2;
        list.appendChild(li);
      });
    });
}

function countrieDetail(event) {
  removeDetail();
  fetch(`https://restcountries.com/v3.1/alpha/${event.target.accessKey}`, {
    method: 'GET',
  })
    .then((items) => items.json())
    .then((items) => {
      var div = document.createElement('div');
      div.setAttribute('class', `detail`);

      var info = [];
      items.forEach((item) => {
        info.push({
          title: 'Bandera: ',
          text: item.flags.png,
        });
        info.push({
          title: 'Capital: ',
          text: item.capital,
        });
        info.push({
          title: 'Población: ',
          text: new Intl.NumberFormat().format(item.population),
        });
        info.push({
          title: 'Idiomas: ',
          text: objectToString(item.languages),
        });
      });

      info.forEach((item, index) => {
        var p = document.createElement('p');
        var b = document.createElement('b');
        b.appendChild(document.createTextNode(item.title));
        p.appendChild(b);
        if (index === 0) {
          var img = document.createElement('img');
          img.src = item.text;
          p.appendChild(img);
        } else {
          p.appendChild(document.createTextNode(item.text));
        }
        div.appendChild(p);
      });

      event.target.appendChild(div);
    });
}

function removeDetail() {
  const items = document.getElementsByClassName('detail');
  while (items.length > 0) {
    items[0].parentNode.removeChild(items[0]);
  }
}

function objectToString(data) {
  var cadena = '';
  for (const [key, value] of Object.entries(data)) {
    cadena += cadena === '' ? value : ', ' + value;
  }
  return cadena;
}
