const TABELA_CATEGORIAS = document.getElementById('tabela-categorias');
const MODAL_CONTEUDO =document.getElementById('modal-conteudo');

const FORM_ADD_CATEGORIA =document.getElementById('form_add_categoria');

const NOTIFICACOES = document.getElementById('notificacoes');

const INPUT_EDITAR_ID  = document.getElementById('editar-id');
const INPUT_EDITAR_NOME =document.getElementById('editar-nome');
const INPUT_EDITAR_DESCRICAO =document.getElementById('editar-descricao');
const INPUT_EDITAR_FOTO =document.getElementById('editar-foto');

function mostrarNotificacoes(mensagem){
    NOTIFICACOES.innerHTML += `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Pronto</strong> ${mensagem}
    <button id="teste" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;

  setTimeout(()=>{
    document.getElementById('teste').dispatchEvent(new Event('click'))},5000);

}

function abrirImagem(nome){
    MODAL_CONTEUDO.innerHTML =`<img src="${nome}" width="100%">`
}

function filtrar() {
    let expressao = document.getElementById('busca').value.toLowerCase();
    let linhas = TABELA_CATEGORIAS.getElementsByTagName('tr');

    for (let tr in linhas){
        let conteudo = linhas[tr].innerHTML.toLowerCase();
        
        if( true === linhas[tr].innerHTML.includes(expressao)){
            linhas[tr].style.display='';
    }else{
        linhas[tr].style.display= 'none';
    }

}
}


function inserirCategorias(){
    event.preventDefault();

    fetch('http://localhost:9000/categorias',{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            nome: document.getElementById('nome').value,
            descricao: document.getElementById('descricao').value,
            foto: document.getElementById('foto').value,
        })
    });
    mostrarNotificacoes('Nova Categoria adicionada')

  //  setTimeout(mostrarNotificacoes('Nova Categoria adicionada') , 3000)

    buscarCategorias();

    //limpa o formulario apos cadastrar
    FORM_ADD_CATEGORIA.reset();

    //DISPARAR
    document.querySelector('[data-bs-target="#add-categoria"]').dispatchEvent(new Event('click'));
}

function excluirCategoria(id){
    if(false === confirm('TEM CERTEZA RAPAZ ?')){
        return;
    }

    fetch('http://localhost:9000/categorias/'+id,{method:'DELETE'});
    //RECARREGAR A PAGINA
    setTimeout
    mostrarNotificacoes('Categoria Excluida')
    buscarCategorias()
}

function editarCategoria(id,nome,descricao,foto){
    INPUT_EDITAR_ID.value=id;
    INPUT_EDITAR_NOME.value =nome;
    INPUT_EDITAR_DESCRICAO.value = descricao;
    INPUT_EDITAR_FOTO.value = foto;
}
 function atualizarCategoria(){
    event.preventDefault()

        fetch('http://localhost:9000/categorias/'+INPUT_EDITAR_ID.value,{
            method:'PATCH',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: INPUT_EDITAR_NOME.value,
                descricao: INPUT_EDITAR_DESCRICAO.value,
                foto: INPUT_EDITAR_FOTO.value,
            })
        });

    mostrarNotificacoes('Categoria atualizada')
    setTimeout(()=>{
        buscarCategorias();
    },2000);

 }

function buscarCategorias(){
    //limpa a tabela pra adicionar depois
    TABELA_CATEGORIAS.innerHTML ='';

    fetch('http://localhost:9000/categorias')
    .then(resposta=> resposta.json())
    .then(categorias => {
        categorias.map(cadacategoria =>{
            // aqui
            TABELA_CATEGORIAS.innerHTML +=`
                <tr>
                    <td>${cadacategoria.id}</td>
                    <td>${cadacategoria.nome}</td>
                    <td>${cadacategoria.descricao}</td>
                    <td>
                        <a onclick ="abrirImagem('${cadacategoria.foto}')" href="#" data-bs-toggle="modal" data-bs-target="#modal-foto">                
                            <img src="${cadacategoria.foto}" width="100px">
                        </a>    
                    </td>
                    <td>
                    <button onclick="editarCategoria('${cadacategoria.id}','${cadacategoria.nome}','${cadacategoria.descricao}','${cadacategoria.foto}')" data-bs-toggle="modal" data-bs-target="#modal-editar-categoria" class="bt btn-warning btn-sm"> Editar</button>
                    <button class="bt btn-danger btn-sm" onclick="excluirCategoria(${cadacategoria.id})"> excluir</button>
                    </td>
                </tr>
            `;
        })
    });


}

buscarCategorias();




