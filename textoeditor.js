function negrito() {
	document.execCommand("bold");
}
function italico() {
	document.execCommand("italic");
}

function createNew() {
	const container = document.getElementById('caixasTextoContainer')
	container.appendChild(createNovaCaixa());
	container.appendChild(createBotaoSalvar());
	container.appendChild(createBotaoEditar());
	container.appendChild(createBotaoLimpar());
}

function createNovaCaixa() {
	const novaCaixaTexto = document.createElement('div');
	novaCaixaTexto.contentEditable = 'true';
	novaCaixaTexto.value = '';
	novaCaixaTexto.className = 'caixaTexto';
	return novaCaixaTexto;
}

function createBotaoSalvar() {
	const botaoSalvar = document.createElement('button');
	botaoSalvar.textContent = 'Salvar';
	botaoSalvar.onclick = () => {
		salvarCaixa(novaCaixaTexto, botaoEditar, botaoSalvar, botaoLimpar);
	};
	return botaoSalvar;
}

function createBotaoEditar() {
	const botaoEditar = document.createElement('button');
	botaoEditar.textContent = 'Editar';
	botaoEditar.onclick = () => {
		editarCaixa(novaCaixaTexto, botaoEditar, botaoSalvar);
	};
	botaoEditar.disabled = true;
	return botaoEditar;
}

function createBotaoLimpar() {
	const botaoLimpar = document.createElement('button');
	botaoLimpar.textContent = 'Limpar';
	botaoLimpar.onclick = () => {
		limparCaixa(novaCaixaTexto);
	}
	return botaoLimpar;
}

function editarCaixa(caixaTexto, botaoEditar, botaoSalvar) {
	caixaTexto.contentEditable = true;
	caixaTexto.focus();
	botaoSalvar.disabled = false;
	botaoEditar.disabled = true;
}

function salvarCaixa(caixaTexto, botaoEditar, botaoSalvar, botaoLimpar) {
	caixaTexto.contentEditable = false;
	if (caixaTexto.innerHTML == "") {
		caixaTexto.remove();
		botaoEditar.remove();
		botaoSalvar.remove();
		botaoLimpar.remove();
	} else {
		botaoSalvar.disabled = true;
		botaoEditar.disabled = false;
	}
}

function limparCaixa(caixaTexto) {
	caixaTexto.innerHTML = "";
	caixaTexto.style.fontWeight = "normal";
	caixaTexto.style.fontStyle = "normal";
	caixaTexto.style.textAlign = "left";
	caixaTexto.style.textTransform = "none";
}



