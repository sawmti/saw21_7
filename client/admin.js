function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/exoplanets");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['id']+'</td>';
          trHTML += '<td><img width="50px" src="'+object['image']+'" class="avatar"></td>';
          trHTML += '<td>'+object['name']+'</td>';
          trHTML += '<td>'+object['discoverer']+'</td>';
          trHTML += '<td>'+object['wiki']+'</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showExoEditBox(\''+object['id']+'\')">Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="exoplanetaDelete(\''+object['id']+'\')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();
  
    
 function agregarExoplanetas()
 {

    window.location.href="/wikidata.html";
 }

 function volverHome()
 {

    window.location.href="/index.html";
 }

  function exoplanetaDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/api/exoplanets/delete");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      } 
    };
  }
  
  function showExoEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/exoplanets/"+id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const exo = objects['exoplaneta'];
        Swal.fire({
          title: 'Editar Exoplaneta',
          html:
            '<input id="id" class="swal2-input" placeholder="Id Wikidata" value="'+exo['id']+'">' +
            '<input id="image" class="swal2-input" placeholder="Link Imagen" value="'+exo[ 'image' ]+'">' +
            '<input id="name" class="swal2-input" placeholder="Nombre" value="'+exo[ 'name' ]+'">' +
            '<input id="discoverer" class="swal2-input" placeholder="Descubridor" value="'+exo[ 'discoverer' ]+'">' +
            '<input id="wiki" class="swal2-input" placeholder="Link Wikipedia" value="'+exo[ 'wiki' ]+'">',
          focusConfirm: false,
          preConfirm: () => {
            exoEdit();
          }
        })
      }
    };
  }

  function exoEdit() {
    const id = document.getElementById("id").value;
    const image = document.getElementById("image").value;
    const name = document.getElementById("name").value;
    const discoverer = document.getElementById("discoverer").value;
    const wiki = document.getElementById("wiki").value;
    
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/api/exoplanets/update");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id, "image": image, "name": name, "discoverer": discoverer, 
      "wiki": wiki
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
  }

  /*function showExoCreateBox() {
    Swal.fire({
      title: 'Crear Exoplaneta',
      html:
        '<input id="id" class="swal2-input" placeholder="Id Wikidata">' +
        '<input id="image" class="swal2-input" placeholder="Link Imagen">' +
        '<input id="name" class="swal2-input" placeholder="Nombre">' +
        '<input id="discoverer" class="swal2-input" placeholder="Descubridor">' +
        '<input id="wiki" class="swal2-input" placeholder="Link Wikipedia">',
      focusConfirm: false,
      preConfirm: () => {
        exoplanetaCreate();
      }
    })
  }
  
  function exoplanetaCreate() {
    const id = document.getElementById("id").value;
    const image = document.getElementById("image").value;
    const name = document.getElementById("name").value;
    const discoverer = document.getElementById("discoverer").value;
    const wiki = document.getElementById("wiki").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:4000/api/exoplanets/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id, "image": image, "name": name, "discoverer": discoverer, 
      "wiki": wiki
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
  }*/