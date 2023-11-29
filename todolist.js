const localStorageName = 'comecoLista'

function criarComponenteTodolist(){
    let input = document.getElementById('nova-tdl')
    input.style.border = ''
    if(!input.value){
        alert('Digite algo para a To do list')
    }
    else{
        let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageName,JSON.stringify(values))
        mostrarLista()
    }
    input.value = ''
}

function mostrarLista(){
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    const list = document.getElementById('lista')
    list.innerHTML = ''
    for(const element of values){
        const item = document.createElement("li");
        item.innerHTML = element["name"]
        item.appendChild(createBotaoDone(element))
        list.appendChild(item)
    }
}

function createBotaoDone(element) {
    const button = document.createElement("button");
    button.id = "deletar"
    button.innerHTML = "ok"
    button.addEventListener("click", () => {
        removerItem(element["name"]);
    });
    return button;
}

function removerItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageName,JSON.stringify(values))
    mostrarLista()
}

mostrarLista()