import './styles.css';
let tips: NodeList;
let currentTip: number;
let currentTotal: number;

document.onreadystatechange = function () {
    if (document.readyState === 'interactive') {
        runApp();
    }
};

function runApp() {
    currentTip = 1;
    currentTotal = 0;

    const dollarInput = document.getElementById('dollarInput') as HTMLInputElement;
    dollarInput.onkeyup = handleDollarInput;

    tips = document.querySelectorAll('.tip');
    tips.forEach(function (tip: HTMLButtonElement) {
        tip.addEventListener('click', handleTipClick);
    });

    if (localStorage.getItem('currentTip')) {
        currentTip = Number.parseFloat(localStorage.getItem('currentTip'));

        tips.forEach(function (tip: HTMLButtonElement) {
            if (Number.parseFloat(tip.value) === currentTip) {
                tip.disabled = true;

                const percentTip = document.getElementById('percentTip') as HTMLLabelElement;
                percentTip.innerText = tip.innerText;
            }
        });
    }
}

function handleDollarInput() {
    const inputedValue = this as HTMLInputElement;

    if (Number.parseFloat(inputedValue.value) >= 0) {
        currentTotal = Number.parseFloat(inputedValue.value);

        const totalInput = document.getElementById('totalInput') as HTMLLabelElement;
        totalInput.innerText = inputedValue.value;

        const totalPaid = document.getElementById('totalPaid') as HTMLLabelElement;
        totalPaid.innerText = calculateTotal(currentTotal, currentTip);

        const totalTip = document.getElementById('totalTip') as HTMLLabelElement;
        totalTip.innerText = calculateTip(currentTotal, currentTip);

    }
}

function handleTipClick() {
    const clickedTip = this as HTMLButtonElement;
    currentTip = Number.parseFloat(clickedTip.value);
    localStorage.setItem('currentTip', clickedTip.value);

    const selectedTip = document.getElementById('selectedTip') as HTMLLabelElement;

    const percentTip = document.getElementById('percentTip') as HTMLLabelElement;
    percentTip.innerText = clickedTip.innerText;

    const totalTip = document.getElementById('totalTip') as HTMLLabelElement;
    totalTip.innerText = calculateTip(currentTotal, currentTip);

    // handle tip buttons
    tips.forEach(function (tip: HTMLButtonElement) {
        if (tip.id === clickedTip.id) {
            tip.disabled = true;
        }
    });

}

function calculateTotal(total: number, percent: number): string {
    return (total + total * percent).toFixed(2);
}

function calculateTip(total: number, percent: number): string {
    return (total * percent).toFixed(2);
}

