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
    let list = document.getElementById('lista')
    list.innerHTML = ''
    for(let i =0; i< values.length; i++){
        list.innerHTML += `<li>${values[i]['name']}<button id='deletar' onClick='removerItem("${values[i]['name']}")'> ok </button></li>`
    }
}

function removerItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageName,JSON.stringify(values))
    mostrarLista()
}

mostrarLista()