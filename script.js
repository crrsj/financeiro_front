
function cadastrarRegistro(mes,ano,nome,produtoOuFatura,dataCompra,pagamento,cartao,parcelas,valor) {
    
    // Captura os valores do formulário
    var  mes = document.getElementById("mes").value;
    var  ano = document.getElementById("ano").value;
    var  nome = document.getElementById("nome").value;
    var  produtoOuFatura = document.getElementById("produtoOuFatura").value;
    var  dataCompra = document.getElementById("dataCompra").value;
    var  pagamento = document.getElementById("pagamento").value;
    var cartao = document.getElementById("cartao").value;
    var parcelas = document.getElementById("parcelas").value;
    var valor = document.getElementById("valor").value;
    
   
   
    // Cria um objeto com os dados a serem enviados
    var data = {
        mes: mes,
        ano: ano,
        nome: nome,
        produtoOuFatura: produtoOuFatura,
        dataCompra: dataCompra,
        pagamento: pagamento,
        cartao: cartao,
        parcelas: parcelas,
        valor: valor,
        
    };

    // Envia os dados para o servidor
    fetch('http://localhost:8080/conta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar registro.');
            
        }
        return response.json();
    })
    .then(data => {
        console.log( 'Registro cadastrado com sucesso:', data);
        alert("Cadastro realizado com sucesso !")
        fetchDataAndPopulateTable();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
     
     document.getElementById("mes").value ="";
     document.getElementById("ano").value ="";
     document.getElementById("nome").value ="";
     document.getElementById("produtoOuFatura").value ="";
     document.getElementById("dataCompra").value ="";
     document.getElementById("pagamento").value ="";
     document.getElementById("cartao").value ="";
     document.getElementById("parcelas").value ="";
     document.getElementById("valor").value ="";
     
   
}


    function validarFormulario() { 
    
    var mes = document.getElementById('mes').value;
    var ano = document.getElementById('ano').value;
    var nome = document.getElementById('nome').value;
    var produtoOuFatura = document.getElementById('produtoOuFatura').value;
    var dataCompra = document.getElementById('dataCompra').value;
    var pagamento = document.getElementById('pagamento').value;
    var cartao =  document.getElementById("cartao").value;
    var parcelas = document.getElementById('parcelas').value;
    var valor = document.getElementById('valor').value;
    
    if (mes === '') {
        alert('Por favor, preencha o campo mês.');
        return false;
    }
    if (ano === '') {
        alert('Por favor, preencha o campo ano.');
        return false;
    }
    if (produtoOuFatura === '') {
        alert('Por favor, preencha o campo prodto ou fatura.');
        return false;
    }
    if (dataCompra === '') {
        alert('Por favor, preencha o campo data da compra.');
        return false;
    }

    if (pagamento === '') {
        alert('Por favor, preencha o campo pagamento.');        
        return false;
    }
   /* if (cartao === '') {
        alert('Por favor, preencha o campo cartão.');
        return false;
    }
    */
    if (parcelas === '') {
        alert('Por favor, preencha o campo parcelas.');
        return false;
    }
   
    if (valor === '') {
      alert('Por favor, preencha o campo valor.');
      return false;
  }
 
    // Se a validação passar, você pode chamar a função para salvar os registros
     cadastrarRegistro(mes,ano,nome,produtoOuFatura,dataCompra,pagamento,cartao
      ,parcelas,valor);

    // Retorna true para permitir o envio do formulário após salvar os registros
    return true;
}

     // Função para buscar dados da API e preencher a tabela
     async function fetchDataAndPopulateTable() {
        try {
          // Substitua 'URL_DA_SUA_API' pela URL real da sua API
          const response = await fetch( 'http://localhost:8080/conta');
          const data = await response.json();
  
          // Limpa a tabela antes de inserir novos dados
          const tbody = document.querySelector('#tabela tbody');
          tbody.innerHTML = '';
  
          // Preenche a tabela com os dados recebidos da API
          data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${item.id}</td>
              <td>${item.dataHora}</td>
              <td>${item.mes}</td>
              <td>${item.ano}</td>
              <td>${item.nome}</td>
              <td>${item.produtoOuFatura}</td>
              <td>${item.dataCompra}</td>
              <td>${item.pagamento}</td>
              <td>${item.cartao}</td> 
              <td>${item.parcelas}</td> 
              <td>${item.valor}</td> 
              <td><button  class="btn btn-warning"  onclick="buscarPorId(${item.id})">Detalhes</button></td>
              <td><button  class="btn btn-success"  onclick=" updateUserData()">Editar</button></td>
              <td><button  class="btn btn-danger" onclick="deletarRegistro(${item.id})">Excluir</button></td>`;
                           
            tbody.appendChild(row);
          });
        } catch (error) {
          console.error('Erro ao buscar e preencher dados:', error);
        }
      }
      document.addEventListener('DOMContentLoaded', () => {
      // Chama a função para buscar e preencher os dados quando a página carrega
       fetchDataAndPopulateTable();
    });
     
    function preencherFormulario(user) {
        document.getElementById('id').value = user.id;
        document.getElementById('mes').value = user.mes;
        document.getElementById('ano').value = user.ano;
        document.getElementById('nome').value = user.nome;
        document.getElementById('produtoOuFatura').value = user.produtoOuFatura;
        document.getElementById('dataCompra').value = user.dataCompra;
        document.getElementById('pagamento').value = user.pagamento;
        document.getElementById('cartao').value = user.cartao;
        document.getElementById('parcelas').value = user.parcelas;       
        document.getElementById('valor').value = user.valor;     
  
    }

    function buscarPorId(id) {
        fetch('http://localhost:8080/conta/' + id)
          .then(response => response.json())
          .then(user => {
            preencherFormulario(user) ;
          })
          .catch(error => console.error('Error fetching user data:', error));
      }
        async function updateUserData() {    
        const idInput = document.getElementById('id');
        const mesInput = document.getElementById('mes');
        const anoInput = document.getElementById('ano');
        const nomeInput = document.getElementById('nome');
        const produtoOuFaturaInput = document.getElementById('produtoOuFatura');
        const dataCompraInput = document.getElementById('dataCompra');
        const pagamentoInput = document.getElementById('pagamento');
        const cartaoInput = document.getElementById('cartao');
        const parcelasInput = document.getElementById('parcelas');
        const valorInput = document.getElementById('valor');
        
          
        const updateId =  idInput.value
        const updateMes = mesInput.value 
        const updateAno = anoInput.value
        const updateNome = nomeInput.value
        const updatepredutoOuFatura = produtoOuFaturaInput.value 
        const updateDataCompra = dataCompraInput.value 
        const updatePagamento = pagamentoInput.value 
        const updateCartao = cartaoInput.value
        const updateParcelas = parcelasInput.value 
        const updateValor = valorInput.value 
      
        try {
          const response = await fetch(`http://localhost:8080/conta`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updateId,
              ano: updateAno,
              mes: updateMes,
              nome: updateNome,
              produtoOuFatura: updatepredutoOuFatura,
              dataCompra: updateDataCompra,
              pagamento: updatePagamento,
              cartao: updateCartao,
              parcelas: updateParcelas,
              valor: updateValor,
              
            }),
          });
      
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
          }
      
          alert('Dados do usuário atualizados com sucesso!');
          fetchDataAndPopulateTable();          
        } catch (error) {
          console.error(`Erro durante a atualização dos dados: ${error.message}`);
        }
        document.getElementById("mes").value = "";
        document.getElementById("ano").value = "";
        document.getElementById("nome").value = "";
        document.getElementById("produtoOuFatura").value ="";
        document.getElementById("dataCompra").value ="";
        document.getElementById("pagamento").value ="";
        document.getElementById("cartao").value ="";
        document.getElementById("parcelas").value ="";
        document.getElementById("valor").value ="";
      }

      async function deletarRegistro(id) {
        try {
          // Substitua 'URL_DA_SUA_API' pela URL real da sua API para deletar
          const response = await fetch(`http://localhost:8080/conta/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // Adicione cabeçalhos adicionais, se necessário
            },
          });
  
          if (response.ok) {
            console.log(`Registro com ID ${id} deletado com sucesso.`);
            // Atualiza a tabela após a exclusão
            fetchDataAndPopulateTable();
          } else {
            console.error('Erro ao deletar registro:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao deletar registro:', error);
        }
      }
