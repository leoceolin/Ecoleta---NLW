function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    })
    .catch((err) => {
      console.log("err", err);
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

// itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  // adicona ou remove a classe selected do item
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  // validando quais itens estão selecionados e adiciona ou remove do array que será enviado
  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item === itemId;
    return itemFound;
  });

  if (alreadySelected >= 0) {
    // remove se estiver selecionado
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDiff = item != itemId;
      return itemIsDiff;
    });

    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }

  // adicionando ao hidden items
  collectedItems.value = selectedItems;
}
