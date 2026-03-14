let currentInput = "";
let printLog = []; // Isme sara data save hoga print ke liye

function addNumber(num) {
    currentInput += num;
    document.getElementById('result').value = currentInput;
}

function addOperator(op) {
    if (currentInput === "") return;
    printLog.push("+" + currentInput); // Print list mein add karein
    updateHistory();
    currentInput += " " + op + " ";
    document.getElementById('result').value = currentInput;
}

function calculate() {
    try {
        let expression = document.getElementById('result').value;
        let res = eval(expression.replace('×', '*').replace('÷', '/'));
        
        // Log the final line of this calculation
        printLog.push(expression + " = " + res);
        
        document.getElementById('result').value = res;
        currentInput = res.toString();
        updateHistory();
    } catch (e) {
        alert("Invalid Calculation");
    }
}

function updateHistory() {
    document.getElementById('history').innerHTML = printLog.join("<br>");
    const historyDiv = document.getElementById('history');
    historyDiv.scrollTop = historyDiv.scrollHeight;
}

function clearAll() {
    currentInput = "";
    printLog = [];
    document.getElementById('result').value = "0";
    document.getElementById('history').innerHTML = "";
}

function printBill() {
    let prevDue = parseFloat(document.getElementById('prevDue').value) || 0;
    let received = parseFloat(document.getElementById('received').value) || 0;
    let currentTotal = parseFloat(document.getElementById('result').value) || 0;
    let netTotal = (currentTotal + prevDue) - received;

    let content = `
        <div style="text-align:center;">
            <b>RETAIL INVOICE</b><br>
            ---------------------------
        </div>
        <div style="text-align:left;">
            ${printLog.map(line => `<div>${line}</div>`).join('')}
            <div class="print-line"></div>
            <b>Aaj ka Total: ${currentTotal}</b><br>
            Pichla Udhar: ${prevDue}<br>
            Aaj Jama: ${received}<br>
            <div class="print-line"></div>
            <b style="font-size:14px;">Net Balance: ${netTotal}</b>
        </div>
        <div style="text-align:center; margin-top:10px;">
            DHANYAWAD!
        </div>
    `;

    document.getElementById('printArea').innerHTML = content;
    window.print();
}
