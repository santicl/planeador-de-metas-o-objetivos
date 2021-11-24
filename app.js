document.getElementById("form-M").addEventListener("submit", create);
document.getElementById("form-M").addEventListener("submit", changeItem);
let valueTotal;
let valueMonth;

function changeItem(item) { // Dependiendo si es meses o si es año retornara el valor; si es en meses retornara el mismo valor, si es por año, se multiplica el valor por la cantidad de meses que tiene un año.
    let cant;
    let c = document.getElementById("time-value").value;
    if (item === "Meses") {
        cant = parseInt(c);
    } else if (item === "Años") {
        cant = c * 12;
    }
    return cant;
}

function calculingPayForMonth(timePerson, cantMeta) { // Se calcula cuanto se pagara por mes.
    let m;
    valueMonth = document.getElementById("time-how").value;
    const tMonth = changeItem(valueMonth); // Se obtiene si es año o meses, se obtiene la cantidad de meses.
    const valueInitial = document.getElementById("value-initial").value;
    cantMeta -= valueInitial;
    let totalMoney = cantMeta * tMonth;
    m = new Intl.NumberFormat('es-ES').format(cantMeta / tMonth);
    cantMeta = m;
    return cantMeta;
}

function create(e) {
    const nameMeta = document.getElementById("meta-aho").value;
    const timeMeta = document.getElementById("time-value").value;
    const valueMeta = parseInt(document.getElementById("value-meta").value);
    const a = calculingPayForMonth(timeMeta, valueMeta); // Se obtiene cuanto se debe pagar por mes, despues se guarda.
    valueTotal = a;
    let meta = {
        nameMeta,
        timeMeta,
        valueMeta,
        valueTotal,
        valueMonth
    }
    if (localStorage.getItem("Metas") === null) {
        let metas = [];
        metas.push(meta);
        localStorage.setItem("Metas", JSON.stringify(metas));
    } else {
        let metas = JSON.parse(localStorage.getItem("Metas"));
        metas.push(meta);
        localStorage.setItem("Metas", JSON.stringify(metas));
    }
    read();
    document.getElementById("form-M").reset();
    e.preventDefault();
    console.log("Se guardo correctamente");
}

function read() {
    let metas = JSON.parse(localStorage.getItem("Metas"));
    document.getElementById("tbody").innerHTML = "";

    for (var i = 0; i < metas.length; i++) {
        let nameMeta = metas[i].nameMeta;
        let timeMeta = metas[i].timeMeta;
        let valueMeta = new Intl.NumberFormat('es-ES').format(metas[i].valueMeta);
        let valueTotal = metas[i].valueTotal;
        let valueMonth = metas[i].valueMonth;
        document.getElementById("tbody").innerHTML += `<tr>
        <td>${nameMeta}</td>
        <td>${timeMeta} ${valueMonth}</td>
        <td>$ ${valueMeta}</td>
        <td><strong>$ ${valueTotal}</strong><p id="paragraph-p">La inflacion anual sera como minimo del <strong>4%</strong></p></td>
        <td><button type="button" class="btn btn-block btn-danger my-2" onclick="dele('${valueTotal}')">Eliminar</button></td>
        </tr>`;
    }
}

function dele(valueTotal) {
    let metas = JSON.parse(localStorage.getItem("Metas"));

    for (var i = 0; i < metas.length; i++) {
        if (metas[i].valueTotal === valueTotal) {
            metas.splice(i, 1);
        }
    }
    localStorage.setItem("Metas", JSON.stringify(metas));
    read();
}
read();
