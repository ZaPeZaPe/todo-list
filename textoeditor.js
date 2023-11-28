function negrito() {
	document.execCommand("bold");
}
function italico() {
	document.execCommand("italic");
}

function criarECriarNova() {
	const novaCaixaTexto = document.createElement('div');
	novaCaixaTexto.contentEditable = 'true';
	novaCaixaTexto.value = '';
	novaCaixaTexto.className = 'caixaTexto';
	document.getElementById('caixasTextoContainer').appendChild(novaCaixaTexto);
	const botaoSalvar = document.createElement('button');
	botaoSalvar.textContent = 'Salvar';
	botaoSalvar.onclick = () => {
		salvarCaixa(novaCaixaTexto, botaoEditar, botaoSalvar, botaoLimpar);
	};
	document.getElementById('caixasTextoContainer').appendChild(botaoSalvar);
	const botaoEditar = document.createElement('button');
	botaoEditar.textContent = 'Editar';
	botaoEditar.onclick = () => {
		editarCaixa(novaCaixaTexto, botaoEditar, botaoSalvar);
	};
	botaoEditar.disabled = true;
	document.getElementById('caixasTextoContainer').appendChild(botaoEditar);

	const botaoLimpar = document.createElement('button');
	botaoLimpar.textContent = 'Limpar';
	botaoLimpar.onclick = () => {
		limparCaixa(novaCaixaTexto);
	}
	document.getElementById('caixasTextoContainer').appendChild(botaoLimpar);
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



