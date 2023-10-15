    //adicionando api e validando input cep 
    export let validacaoCep = false;
   $('#cep').blur(function () {
        let valor = this.value;
        let cepError = $('#cepError');    
        if (/^\d{8}$/.test(valor)) {
            $.get('https://viacep.com.br/ws/' + valor + '/json/', function (dados) {
                if (!dados.erro) {
                    $('#bairro').val(dados.bairro);
                    $('#municipio').val(dados.localidade);
                    $('#estado').val(dados.uf);
                    $('#endereco').val(dados.logradouro);
                    cepError.text('');
                    validacaoCep = true; 
                }
            });
        } else {
            cepError.text('CEP inválido');
            validacaoCep = false; 
        }
    })







