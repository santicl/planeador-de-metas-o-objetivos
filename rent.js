document.getElementById("form-E").addEventListener("submit", viewCalculeted);

var btnOpenPopup = document.body;

var	overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup');

btnOpenPopup.onload = function(){
	overlay.classList.add('active');
	popup.classList.add('active');
}

btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
});

function grossProfit(income, expenses) {
    let totalGrossProfit = income - expenses;
    return totalGrossProfit;
}

function netOperatingProfit(grossProfit, otherEgress) {
    let totalNop = grossProfit - otherEgress;
    return totalNop;
}

function costEffectiveness(totalNetOperatingProfit, totalInvestment) {
    let totalCE = (totalNetOperatingProfit / totalInvestment) * 100;
    return totalCE;
}

function returnOnInvestment(totalNetOperatingProfit, totalInvestment) {
    let totalROI = (totalNetOperatingProfit - totalInvestment) / totalInvestment;
    return totalROI;
}

function viewCalculeted(e) {
    let income = document.getElementById("income").value;
    let expenses = document.getElementById("expenses").value;
    let otherEgress = document.getElementById("otherEgress").value;
    let investment = document.getElementById("investment").value;
    let totalGrossProfit = grossProfit(income, expenses);
    let totalNetOperatingProfit = netOperatingProfit(totalGrossProfit, otherEgress);
    let totalCE = costEffectiveness(totalNetOperatingProfit, investment);
    let totalROI = returnOnInvestment(totalNetOperatingProfit, investment);
    alert("La utilidad bruta es $ "+totalGrossProfit+" Tu utilidad Neta es de $ "+totalNetOperatingProfit+" Tu rentabilidad es de "+totalCE+"% y el ROI es de "+totalROI);
    e.preventDefault();
    document.getElementById("form-E").reset();
}
