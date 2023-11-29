function negrito() {
	document.execCommand("bold");
}
function italico() {
	document.execCommand("italic");
}

const localStgName = "editorTexto"

function showList() {
	let items = JSON.parse(localStorage.getItem(localStgName) || "[]")
	for(const item of items){
        const getItem = createNew(item.name)
		getItem.id = item.id;
    }
}

function createNew(name="") {
	const container = document.getElementById('caixasTextoContainer')
	const item = document.createElement('div');
	const caixa = createNovaCaixa()
	caixa.innerHTML = name
	const editar = createBotaoEditar()
	const limpar = createBotaoLimpar()
	const deletar = createBotaoDeletar(container, item)
	const salvar = createBotaoSalvar(caixa, deletar, limpar, editar)

	item.appendChild(caixa);
	item.appendChild(editar);
	item.appendChild(limpar);
	item.appendChild(deletar);
	item.appendChild(salvar);
	container.appendChild(item);
	return item;
}

function createNovaCaixa() {
	const novaCaixaTexto = document.createElement('div');
	novaCaixaTexto.contentEditable = 'false';
	novaCaixaTexto.value = '';
	novaCaixaTexto.className = 'caixaTexto';
	return novaCaixaTexto;
}

function createBotaoSalvar(novaCaixaTexto, botaoDeletar, botaoLimpar, botaoEditar) {
	const botaoSalvar = document.createElement('button');
	botaoSalvar.textContent = 'Salvar';
	botaoEditar.onclick = () => {
		editarCaixa(novaCaixaTexto);
		botaoEditar.disabled = true;
		botaoSalvar.disabled = false;
		botaoLimpar.disabled = false;
		botaoDeletar.disabled = false;
	}
	botaoSalvar.onclick = () => {
		salvarCaixa(novaCaixaTexto, botaoSalvar, botaoDeletar, botaoLimpar, botaoEditar);
	};
	botaoSalvar.disabled = true;
	return botaoSalvar;
}

function createBotaoEditar() {
	const botaoEditar = document.createElement('button');
	botaoEditar.textContent = 'Editar';
	botaoEditar.onclick = () => {
		botaoEditar.disabled = true;
	};
	botaoEditar.disabled = false;
	return botaoEditar;
}

function createBotaoLimpar() {
	const botaoLimpar = document.createElement('button');
	botaoLimpar.textContent = 'Limpar';
	botaoLimpar.onclick = () => {
		limparCaixa(novaCaixaTexto);
	}
	botaoLimpar.disabled = true;
	return botaoLimpar;
}

function createBotaoDeletar(container, item) {
	const botaoDeletar = document.createElement('button');
	botaoDeletar.textContent = 'Deletar';
	botaoDeletar.onclick = () => {
		container.removeChild(item);
		let items = JSON.parse(localStorage.getItem(localStgName) || "[]")
		const index = items.findIndex(dic => dic.id == item.id);
		if (index !== -1) {
			items.splice(index, 1);
		}
		localStorage.setItem(localStgName,JSON.stringify(items))
	}
	botaoDeletar.disabled = true;
	return botaoDeletar;
}

function editarCaixa(caixaTexto) {
	caixaTexto.contentEditable = true;
	caixaTexto.focus();
}

function salvarCaixa(caixaTexto, botaoSalvar, botaoDeletar, botaoLimpar, botaoEditar) {
	caixaTexto.contentEditable = false;
	if (caixaTexto.innerHTML == "") {
		caixaTexto.remove();
		botaoEditar.remove();
		botaoSalvar.remove();
		botaoLimpar.remove();
		botaoDeletar.remove();
	} else {
		botaoSalvar.disabled = true;
		botaoDeletar.disabled = true;
		botaoLimpar.disabled = true;
		botaoEditar.disabled = false;
	}

	let items = JSON.parse(localStorage.getItem(localStgName) || "[]")
	const found = items.some(dic => dic.id === caixaTexto.id);
	if (found) {
		found.name = caixaTexto
	} else if (items.length==0) {
		items.push({
			name: caixaTexto.innerHTML,
			id: 0
		})
	} else {
		items.push({
			name: caixaTexto.innerHTML,
			id: items[items.length-1].id+1
		})
	}
	localStorage.setItem(localStgName,JSON.stringify(items))
}

function limparCaixa(caixaTexto) {
	caixaTexto.innerHTML = "";
	caixaTexto.style.fontWeight = "normal";
	caixaTexto.style.fontStyle = "normal";
	caixaTexto.style.textAlign = "left";
	caixaTexto.style.textTransform = "none";
}

showList()