const doc = document;
const url = 'https://v6.exchangerate-api.com/v6/1d30b571d07e6904dcbae45d/latest/USD';
const selects = doc.querySelectorAll('.select');
const favCurrencyProps = {
    currencyList: ['USD', 'EUR', 'UAH'],
    state: true,
};
let convRate;

let checkAll = doc.querySelector('.checkbox_all');


start();

checkAll.onclick = function() {
    favCurrencyProps.state = !favCurrencyProps.state;
    start();
};


function start() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        convRate = data.conversion_rates;
        renderOptions(selects[0], convRate, favCurrencyProps);

    });


    selects.forEach(select => {
        select.onchange = function() {
            const val = this.value;
            const index = this.selectedIndex;
            const currency = this.options[index].innerText;

            if (this.dataset.type == "source") {
                renderOptions(selects[1], convRate, favCurrencyProps, currency);
            } 
        }
    });

}


function renderOptions(select, dataObj, props, exludeKey) {
    select.innerHTML = '';

    if (!dataObj) {
        return;
    }

    if (exludeKey) {
        delete dataObj[exludeKey.toUpperCase()];
    }

    renderOption(select, '', 'choice currency');
    for (let key in dataObj) {
        if (!props.state) {
            renderOption(select, dataObj[key], key);
            continue 
        } 

        if (props.currencyList.includes(key)) {
            renderOption(select, dataObj[key], key);
        }
    }  
}

function renderOption(select, value, text) {
    const option = doc.createElement('option');
    option.value = value;
    option.innerText = text;
    select.append(option);
}


