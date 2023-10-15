    //adicionando api e validando input cep 

$('#cep').blur(function () {
    let valor = this.value;
    let cepError = $('#cepError'); 

    // Verificar se o CEP tem um formato válido e colocando a api
    if (/^\d{8}$/.test(valor)) {
        $.get('https://viacep.com.br/ws/' + valor + '/json/', function (dados) {
            if (!dados.erro) {
                $('#bairro').val(dados.bairro);
                $('#municipio').val(dados.localidade);
                $('#estado').val(dados.uf);
                $('#endereco').val(dados.logradouro)
                cepError.text(''); 
            } else {
                cepError.text('CEP inválido. Por favor, insira um CEP válido.');
            }
        });
    } else {
        cepError.text('CEP inválido');
    }
});

$('#cadastroFornecedorForm').submit(function (event) {
    let cepError = $('#cepError');
    if (cepError.text() !== '') {
        event.preventDefault(); 
    }
});







