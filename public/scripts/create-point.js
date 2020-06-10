// Array que irá composto pelas opções do menu de escolha de estado
var array_estados = [];

function ordenarEstados() {
    const ufSelect = document.querySelector("select[name=uf]")

    // Ordena os estados
    array_estados.sort(function compararEstados(a, b) {
        var novo_ar = []
        // Tem que dar split, se não irá ordenar pelo id, não pelo nome
        var a_com_split = a.split('>') 
        var b_com_split = b.split('>')
        novo_ar.push(a_com_split[1]); 
        novo_ar.push(b_com_split[1]); 
        novo_ar.sort();
        if(novo_ar[0] == a_com_split[1]){
            return -1;
        } else if(novo_ar[0] == b_com_split[1]) {
            return 1;
        }
        return 0;
    })

    // Concatena os estados ordenados no ufSelect
    for(var i = 0; i < array_estados.length; i++) {
        ufSelect.innerHTML += array_estados[i];
    }
    console.log(array_estados);
    console.log(ufSelect);

}

// Consulta os estados pela API
function populateUFs() {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then (states => {
        for(const state of states){
            // Armazena as opções de estados no array_estados
            array_estados.push(`<option value="${state.id}">${state.nome}</option>`);
        }
        this.ordenarEstados()
    });
 }


populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].txt

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/distritos`

    citySelect.innerHTM = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then (cities => {

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)


//itens de coleta
//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name-items]")
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover uma classe

    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    //verificar selecionador
    //pegar selecinados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    //se estiver selec tirar da selecao
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(temId)
    }
    collectedItems.value = selectedItems
}
