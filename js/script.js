import { validacaoCep } from "./apiCep.js";
$(document).ready(() => {
  let produtos = []; 
  let anexos = [];
  // Função para validar a tabela de produtos e fazendo com que pelo menos 1 produto e anexo seja obrigatorio
  //caso nao funcione a validação padrao
  function validarProdutos() {
    const produtos = document.querySelectorAll(".produto");
    if (produtos.length === 0) {
      return false;
    }

    for (const produto of produtos) {
      const descricao = produto.querySelector(".nomeProduto").value;
      const unidadeMedida = produto.querySelector(".unidadeMedida").value;
      const quantidadeEstoque = produto.querySelector(".quantidadeEstoque").value;
      const valorUnitario = produto.querySelector(".valorUnitario").value;
      const valorTotal = produto.querySelector(".valorTotal").value;

      if (!descricao || !unidadeMedida || !quantidadeEstoque || !valorUnitario || !valorTotal) {
        alert('Necessário preencher informações do produto')
      }
    }
    return true;
  }

  // AQUI Recupera os dados do formulário da sessionStorage, se estiverem disponíveis 
  const formData = getSessionData("formData");
  if (formData) {
    populateFormData(formData);
  }

  function populateFormData(formData) {
    // Popula os campos do formulário com dados da sessão
    $("#razaoSocial").val(formData.razaoSocial);
    $("#nomeFantasia").val(formData.nomeFantasia);
    $("#cnpj").val(formData.cnpj);
    $("#inscricaoEstadual").val(formData.inscricaoEstadual);
    $("#cep").val(formData.cep);
    $("#inscricaoMunicipal").val(formData.inscricaoMunicipal);
    $("#endereco").val(formData.endereco);
    $("#numero").val(formData.numero);
    $("#complemento").val(formData.complemento);
    $("#bairro").val(formData.bairro);
    $("#municipio").val(formData.municipio);
    $("#estado").val(formData.estado);
    $("#contato").val(formData.contato);
    $("#telefone").val(formData.telefone);
  }

  // Função para salvar os dados do formulário na sessionStorage
  function saveFormDataToSession() {
    const formData = {
      razaoSocial: $("#razaoSocial").val(),
      nomeFantasia: $("#nomeFantasia").val(),
      cnpj: $("#cnpj").val(),
      inscricaoEstadual: $("#inscricaoEstadual").val(),
      cep: $("#cep").val(),
      inscricaoMunicipal: $("#inscricaoMunicipal").val(),
      endereco: $("#endereco").val(),
      numero: $("#numero").val(),
      complemento: $("#complemento").val(),
      bairro: $("#bairro").val(),
      municipio: $("#municipio").val(),
      estado: $("#estado").val(),
      contato: $("#contato").val(),
      telefone: $("#telefone").val(),
      produtos: produtos,
      anexos: anexos,
    };

    // Função para definir dados na sessionStorage
    function setSessionData(sessionKey, data) {
      const jsonString = JSON.stringify(data);
      sessionStorage.setItem(sessionKey, jsonString);
    }

    // Definindo os dados na sessionStorage
    setSessionData("formData", formData);
  }

  // Função para obter dados da sessionStorage
  function getSessionData(sessionKey) {
    const jsonString = sessionStorage.getItem(sessionKey);
    return JSON.parse(jsonString);
  }
  //Função formatar dados !!
  function formatarDadosParaJSON() {
    const razaoSocial = $("#razaoSocial").val();
    const nomeFantasia = $("#nomeFantasia").val();
    const cnpj = $("#cnpj").val();
    const inscricaoEstadual = $("#inscricaoEstadual").val();
    const cep = $("#cep").val();
    const inscricaoMunicipal = $("#inscricaoMunicipal").val();
    const endereco = $("#endereco").val();
    const numero = $("#numero").val();
    const complemento = $("#complemento").val();
    const bairro = $("#bairro").val();
    const municipio = $("#municipio").val();
    const estado = $("#estado").val();
    const contato = $("#contato").val();
    const telefone = $("#telefone").val();

    // Produtos
    const produtos = [];
    const produtosElements = $(".produto");
    produtosElements.each((index, element) => {
      const produto = {
        indice: index + 1,
        descricaoProduto: $(element).find(".nomeProduto").val(),
        unidadeMedida: $(element).find(".unidadeMedida").val(),
        qtdeEstoque: $(element).find(".quantidadeEstoque").val(),
        valorUnitario: $(element).find(".valorUnitario").val(),
        valorTotal: $(element).find(".valorTotal").val(),
      };
      produtos.push(produto);
    });

    // Anexos
    const anexos = [];
    const anexosElements = $(".anexo");
    anexosElements.each((index, element) => {
      const anexoInput = $(element).find(".arquivoAnexo")[0];
      if (anexoInput && anexoInput.files.length > 0) {
        const arquivo = anexoInput.files[0];
        const anexo = {
          indice: index + 1,  
          nomeArquivo: arquivo.name,
        };
        anexos.push(anexo);
      }
    });

    const jsonData = {
      razaoSocial,
      nomeFantasia,
      cnpj,
      inscricaoEstadual,
      cep,
      inscricaoMunicipal,
      endereco,
      numero,
      complemento,
      bairro,
      municipio,
      estado,
      contato,
      telefone,
      produtos,
      anexos,
    };

    const jsonString = JSON.stringify(jsonData, null, 4);

    const blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });

    const url = window.URL.createObjectURL(blob);

    const downloadLink = document.getElementById("downloadJSON");

    downloadLink.href = url;
    downloadLink.style.display = "block";

    return jsonString;
  }

  // "Função" para validar e enviar o formulário caso a validação padrao nao funcione 
  $("#cadastroFornecedorForm").submit(function (e) {
    e.preventDefault();
    $('.error-message').text('').hide();


    // Validar os campos obrigatórios
    const razaoSocial = $("#razaoSocial").val();
    const nomeFantasia = $("#nomeFantasia").val();
    const cnpj = $("#cnpj").val();
    const cep = $("#cep").val();
    const endereco = $("#endereco").val();
    const numero = $("#numero").val();
    const complemento = $("#complemento").val();
    const bairro = $("#bairro").val();
    const municipio = $("#municipio").val();
    const estado = $("#estado").val();
    const contato = $("#contato").val();
    const telefone = $("#telefone").val();
    const produtosValidos = validarProdutos();
    const anexosValidos = validarAnexos();

    if (
      razaoSocial &&
      nomeFantasia &&
      cnpj &&
      cep &&
      endereco &&
      numero &&
      complemento &&
      bairro &&
      municipio &&
      estado &&
      contato &&
      telefone &&
      produtosValidos &&
      anexosValidos &&
      cnpj.length == 14 &&
      validacaoCep
    ) {
      saveFormDataToSession();
      mostrarModalCarregamento();
      const jsonString = formatarDadosParaJSON();
      $.ajax({
        url: 'sua_url_de_envio',
        type: 'POST',
        data: {
          razaoSocial: $("#razaoSocial").val(),
          nomeFantasia: $("#nomeFantasia").val(),
          produtos: produtos,
          anexos: anexos,
        },
        success: function (data) {
          esconderModalCarregamento();

        },
        error: function (error) {
          esconderModalCarregamento();

        }
      });

    } else {
      if (cnpj.length !== 14) {
        $('#cnpj').next('.error-message').text('O CNPJ deve conter 14 números.').show();
        alert('Por favor preencha o cnpj corretamente!')
      }else if(validacaoCep === false){
        alert('CEP inválido. Por favor, insira um CEP válido.');
    }
    }
  });


  // Função para validar a tabela de anexos
  function validarAnexos() {
    const anexos = document.querySelectorAll(".anexo");
    return anexos.length > 0;
  }

  // Função para mostrar o modal de carregamento
  function mostrarModalCarregamento() {
    $("#loadingModal").show();
  }

  // Função para esconder o modal de carregamento
  function esconderModalCarregamento() {
    $("#loadingModal").hide();
  }

  // Mudando calculo do input valor total
  $("#lista-produto").on("input", ".valorUnitario, .quantidadeEstoque", function () {
    const $produto = $(this).closest(".produto");
    const valorUnitario = parseFloat($produto.find(".valorUnitario").val()) || 0;
    const quantidadeEstoque = parseInt($produto.find(".quantidadeEstoque").val()) || 0;
    const $valorTotal = $produto.find(".valorTotal");

    const valorTotal = valorUnitario * quantidadeEstoque;

    $valorTotal.val(valorTotal.toFixed(2));

    if (valorTotal === 0) {
      $valorTotal.addClass("disabled");
    } else {
      $valorTotal.removeClass("disabled");
    }
  });

  //função que atualiza o botão se tiver um anexo e produto vai ficar desabilitado,
  //Se tiver dois ou mais vai ficar habilitado pra apagar
  function atualizarBotoesExcluir() {
    const produtos = document.querySelectorAll(".produto");
    const anexos = document.querySelectorAll(".anexo");

    $(".excluirProduto").prop("disabled", produtos.length <= 1);
    $(".excluirAnexo").prop("disabled", anexos.length <= 1);
  }

  atualizarBotoesExcluir();

  $("#lista-produto").on("click", ".excluirProduto", function () {
    $(this).closest(".produto").remove();
    atualizarBotoesExcluir();
  });


  // Adicionando campos de produtos: 
  $("#adicionarProduto").click(function () {
    const produtoHtml = `
        <div class="produto">
        <div>
        <button class="excluirProduto"  ${$(".produto").length > 1 ? "" : "disabled"}>
        <img src="img/flaticon-trash.png" alt="excluir"></button>
        <img src="img/caixa.png" alt="caixa" id="imagem-caixa-produto">
    </div>
    <div class="content-titulo-produto">
    <div>
        <label for="input-nome-produto">Produto <span>*</span></label>
        <input type="text" required id="input-nome-produto" class="nomeProduto">
    </div>
    <div class="row">
        <div>
            <label for="unidadeMedida">Unidade de Medida <span>*</span></label>
            <input type="text" class="unidadeMedida form-control" >
        </div>
        <div>
            <label for="quantidadeEstoque">Quantidade em Estoque <span>*</span></label>
            <input type="number" class="quantidadeEstoque  form-control" inputmode="numeric"
                pattern="[0-9]*" required>
        </div>
        <div >
            <label for="valorUnitario">Valor Unitário <span>*</span></label>
            <input type="number" class="valorUnitario  form-control" inputmode="numeric"
                pattern="[0-9]*" required>
        </div>
        <div >
            <label for="valorTotal">Valor Total <span>*</span></label>
            <input type="number" class="valorTotal disabled form-control" required readonly>
        </div>
    </div>
</div>
        </div>
    `;
    $("#lista-produto").append(produtoHtml);
    atualizarBotoesExcluir(); 
  });

  // tentando atualizar botoes ao carregar a página
  atualizarBotoesExcluir();

  // "Função" pra visualizar anexo
  $("#lista-anexos").on("click", ".visualizarAnexo", function () {
    const $anexo = $(this).closest(".anexo");


    const $arquivoAnexo = $anexo.find("#arquivoAnexo")[0];


    if ($arquivoAnexo.files.length > 0) {
      const arquivo = $arquivoAnexo.files[0];

      const url = window.URL.createObjectURL(arquivo);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.target = "_blank";
      downloadLink.download = arquivo.name;
      downloadLink.click();
    }
  });

  $("#lista-anexos").on("click", ".excluirAnexo", function () {
    const $anexo = $(this).closest(".anexo");
    $anexo.remove();
    atualizarBotoesExcluir();
  });

  // "Função" pra adicionar anexos 
  $("#adicionarAnexo").click(function () {
    const anexoHtml = `
      <div class="anexo">
        <button class="visualizarAnexo" data-anexo-id="" type="button"><img src="img/flaticon-view.png" alt="ver"></button>
        <button class="excluirAnexo" ${$(".anexo").length > 1 ? "" : "disabled"} data-anexo-id="" type="button"><img src="img/flaticon-trash.png" alt="excluir"></button>
        <label for="arquivoAnexo" id="labelFile">Arquivo do Anexo <span class="texto">*</span></label>
        <input type="file" class="arquivoAnexo" required>
      </div>
    `;
    $("#lista-anexos").append(anexoHtml);
    atualizarBotoesExcluir();
  });

  //"Função" pra filtrar os dados que podem entar no input
  $("#cep,#cnpj, #numero, #telefone, #inscricaoMunicipal, #inscricaoEstadual").on("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });
});