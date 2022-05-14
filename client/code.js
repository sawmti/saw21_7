async function getEntities() {
    const response = await fetch('/api/wikidata/exoplanets');
    const data = await response.json();
    return data
}

function fillEntities() {
    getEntities().then(data => {
        const ulEntities = document.getElementById("entities");
        data.results.bindings.forEach(item => {
          const liEntity = document.createElement("li");

          const Qid = new URL(item.exoplaneta.value);      
          const text = document.createTextNode(Qid.pathname.split("/")[2]);
          
          liEntity.appendChild(text);
          ulEntities.appendChild(liEntity);
        })
    })
}