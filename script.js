/*
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
*/
let liveInput = "";
let historyItems = [];
let grandTotal = 0;
let activeField = "live"; // Track which field to type in

function setCurrentInput(field) {
    activeField = field;
    // Highlight effect for user to know which box is active
    document.querySelectorAll('.input-group input').forEach(el => el.style.borderColor = "#444");
    if(field !== 'live') document.getElementById(field).style.borderColor = "var(--primary-glow)";
}

function addNumber(num) {
    if (activeField === "live") {
        if (liveInput === "0") liveInput = num;
        else liveInput += num;
        document.getElementById('live-display').value = liveInput;
    } else {
        let field = document.getElementById(activeField);
        field.value = field.value === "0" ? num : field.value + num;
    }
}

function addOperator(op) {
    if (activeField !== "live") { activeField = "live"; } // Switch to live on operator
    if (liveInput === "") return;
    liveInput += " " + op + " ";
    document.getElementById('live-display').value = liveInput;
}

function backspace() {
    if (activeField === "live") {
        liveInput = liveInput.trim().slice(0, -1);
        document.getElementById('live-display').value = liveInput || "0";
    } else {
        let field = document.getElementById(activeField);
        field.value = field.value.slice(0, -1) || "0";
    }
}

function calculate() {
    try {
        let expression = liveInput.replace('×', '*').replace('÷', '/');
        let result = eval(expression);
        
        // Add to History and Update Total
        historyItems.push(liveInput);
        grandTotal += result;

        // Update UI
        document.getElementById('history-row').innerText = historyItems.join(", ");
        document.getElementById('grand-total').innerText = grandTotal;
        
        // Reset Live Section (As requested)
        liveInput = "";
        document.getElementById('live-display').value = "0";
        activeField = "live";
    } catch (e) {
        alert("Math Error");
    }
}

function clearAll() {
    liveInput = "";
    historyItems = [];
    grandTotal = 0;
    document.getElementById('live-display').value = "0";
    document.getElementById('history-row').innerText = "";
    document.getElementById('grand-total').innerText = "0";
    document.getElementById('prevDue').value = "0";
    document.getElementById('received').value = "0";
    activeField = "live";
}

function printBill() {
    let prevDue = parseFloat(document.getElementById('prevDue').value) || 0;
    let received = parseFloat(document.getElementById('received').value) || 0;
    let netTotal = (grandTotal + prevDue) - received;

    let content = `
        <div style="text-align:center; font-family:monospace;">
            <h3>STAR DIGITAL</h3>
            ---------------------------<br>
            ${historyItems.map(item => `<div>+ ${item}</div>`).join('')}
            ---------------------------<br>
            <b>Total: ${grandTotal}</b><br>
            Pichla Udhar: ${prevDue}<br>
            Aaj Jama: ${received}<br>
            <b>Net Balance: ${netTotal}</b><br>
            ---------------------------<br>
            Dhanyawad!
        </div>
    `;

    document.getElementById('printArea').innerHTML = content;
    window.print();
}
