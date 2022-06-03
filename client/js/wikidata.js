function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/wikidata/exoplanets");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var strId = document.getElementById("strIds").value;
        var arrayId=strId.split(",");
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects.results.bindings) {

          const Qid = new URL(object.exoplaneta.value);      
          const textId = Qid.pathname.split("/")[2];

          trHTML += '<tr>'; 
          trHTML += '<td>'+textId+'</td>';
          trHTML += '<td><img width="50px" src="'+object.image.value+'" class="avatar"></td>';
          trHTML += '<td>'+object.exoplanetaLabel.value+'</td>';
          trHTML += '<td>'+object.dicovererLabel.value+'</td>';
          trHTML += '<td>'+object.link.value+'</td>';
          trHTML += '<td>';
          if(arrayId.indexOf(textId) == -1)
          {
            trHTML += '<button type="button" class="btn btn-outline-secondary" onclick="showExoEditBox(\''+textId+'\')">Agregar</button>';
          }
          trHTML += '</td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  function loadIdExistentes() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/exoplanets");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        let IdExistentes = new Array();
        for (let object of objects) {
          IdExistentes.push(object['id']);
        }
       trHTML = '<input type="hidden" id="strIds" value="'+IdExistentes+'"></input>';
       document.getElementById("idActuales").innerHTML=trHTML;      
      }
    };
  }

  
  loadIdExistentes();
  loadTable();
  
  function showExoEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/wikidata/exoplanets/"+id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);

        const object = objects.results.bindings[0];

        const Qid = new URL(object.exoplaneta.value);      
        const textId = Qid.pathname.split("/")[2];

        Swal.fire({
          title: 'Agregar Exoplaneta',
          width: 650,
          html:
            '<label>Wikidata id</label><br><input id="id" class="swal2-input" placeholder="Id Wikidata" value="'+textId+'" readonly>' +
            '<br><br><label>Imagen</label><br><input id="image" class="swal2-input" placeholder="Link Imagen" value="'+object.image.value+'" size="45">' +
            '<br><br><label>Nombre</label><br><input id="name" class="swal2-input" placeholder="Nombre" value="'+object.exoplanetaLabel.value+'" size="45">' +
            '<br><br><label>Descubridor</label><br><input id="discoverer" class="swal2-input" placeholder="Descubridor" value="'+object.dicovererLabel.value+'" size="45">' +
            '<br><br><label>Link Wikipedia</label><br><input id="wiki" class="swal2-input" placeholder="Link Wikipedia" value="'+object.link.value+'" size="45">',
          focusConfirm: false,
          preConfirm: () => {
            exoplanetaCreate();
          }
        })
      }
    };
  }

  function exoplanetaCreate() {
    const id = document.getElementById("id").value;
    const image = document.getElementById("image").value;
    const name = document.getElementById("name").value;
    const discoverer = document.getElementById("discoverer").value;
    const wiki = document.getElementById("wiki").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/api/exoplanets/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id, "image": image, "name": name, "discoverer": discoverer, 
      "wiki": wiki
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']+",Datos guardados!");
        loadIdExistentes();
        loadTable();
      }
    };
  }

  function volverAdministracion()
  {
 
     window.location.href="/admin.html";
  }