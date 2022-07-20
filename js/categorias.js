const TABELA_CATEGORIAS = document.getElementById('tabela-categorias');
const MODAL_CONTEUDO =document.getElementById('modal-conteudo');

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
    alert('categoria, nova adicionada com sucesso !!!')
}

function excluirCategoria(id){
    if(false === confirm('TEM CERTEZA RAPAZ ?')){
        return;
    }

    fetch('http://localhost:9000/categorias/'+id,{method:'DELETE'});
    //RECARREGAR A PAGINA
    alert('pronto, Categoria Excluida !!!')
location.href= '';
}


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
                    <button class="bt btn-warning btn-sm"> Editar</button>
                    <button class="bt btn-danger btn-sm" onclick="excluirCategoria(${cadacategoria.id})"> excluir</button>
                    </td>
                </tr>
            `;
        })
    });


