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
/*
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
*/
let liveInput = "";
let historyItems = [];
let grandTotal = 0;
let activeField = "live";
let lastState = null; // For Undo
let printerDevice = null;

function updateNetBalance() {
    let prevDue = parseFloat(document.getElementById('prevDue').value) || 0;
    let received = parseFloat(document.getElementById('received').value) || 0;
    let net = (grandTotal + prevDue) - received;
    document.getElementById('net-result').innerText = "₹ " + net.toFixed(2);
}

function setCurrentInput(field) {
    activeField = field;
    document.querySelectorAll('.input-group input').forEach(el => el.style.borderColor = "#444");
    document.getElementById(field).style.borderColor = "var(--primary-glow)";
}

function addNumber(num) {
    if (activeField === "live") {
        liveInput = (liveInput === "0") ? num : liveInput + num;
        document.getElementById('live-display').value = liveInput;
        // Auto Scroll Live
        let el = document.getElementById('live-display');
        el.scrollLeft = el.scrollWidth;
    } else {
        let field = document.getElementById(activeField);
        field.value = (field.value === "0") ? num : field.value + num;
        updateNetBalance();
    }
}

function addOperator(op) {
    activeField = "live";
    if (liveInput === "") return;
    liveInput += " " + op + " ";
    document.getElementById('live-display').value = liveInput;
}
/*
function calculate() {
    try {
        if (liveInput === "") return;
        let expression = liveInput.replace('×', '*').replace('÷', '/');
        let result = eval(expression);
        
        historyItems.push(liveInput);
        grandTotal += result;

        document.getElementById('history-row').innerText = historyItems.join(", ");
        document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
        
        // Auto Scroll History
        let hist = document.getElementById('hist-scroll');
        hist.scrollLeft = hist.scrollWidth;

        liveInput = "";
        document.getElementById('live-display').value = "0";
        updateNetBalance();
    } catch (e) {
        alert("Calculation Error");
    }
}
*/
function calculate() {
    let nameInput = document.getElementById('item-name').value || "Item"; // Naam uthayein
    let expression = liveInput;
    let result = eval(expression.replace('×', '*').replace('÷', '/'));

    // Naya Format: Name + Value
    historyItems.push(`${nameInput}: ${expression} = ${result}`);

    // UI Update karein
    document.getElementById('history-row').innerText = historyItems.join(", ");
    
    // Clear karein
    liveInput = "";
    document.getElementById('item-name').value = ""; // Name box khali karein
    document.getElementById('live-display').value = "0";
    updateNetBalance();
}

function clearAll() {
    // Save state before clearing for Undo
    lastState = {
        history: [...historyItems],
        total: grandTotal,
        prev: document.getElementById('prevDue').value,
        recv: document.getElementById('received').value
    };
    
    liveInput = "";
    historyItems = [];
    grandTotal = 0;
    document.getElementById('live-display').value = "0";
    document.getElementById('history-row').innerText = "";
    document.getElementById('grand-total').innerText = "0";
    document.getElementById('prevDue').value = "0";
    document.getElementById('received').value = "0";
    updateNetBalance();
}

function undo() {
    if (lastState) {
        historyItems = lastState.history;
        grandTotal = lastState.total;
        document.getElementById('prevDue').value = lastState.prev;
        document.getElementById('received').value = lastState.recv;
        
        document.getElementById('history-row').innerText = historyItems.join(", ");
        document.getElementById('grand-total').innerText = grandTotal;
        updateNetBalance();
        lastState = null; // Use once
    } else {
        alert("Nothing to undo!");
    }
}

function backspace() {
    if (activeField === "live") {
        liveInput = liveInput.trim().slice(0, -1);
        document.getElementById('live-display').value = liveInput || "0";
    } else {
        let field = document.getElementById(activeField);
        field.value = field.value.slice(0, -1) || "0";
        updateNetBalance();
    }
}
/*
function printBill() {
    let prevDue = parseFloat(document.getElementById('prevDue').value) || 0;
    let received = parseFloat(document.getElementById('received').value) || 0;
    let net = (grandTotal + prevDue) - received;

    let content = `
        <div style="width:58mm; font-family:monospace; font-size:12px;">
            <center><b>STAR DIGITAL</b></center><br>
            ${historyItems.map(h => `+ ${h}<br>`).join('')}
            -------------------------<br>
            Total: ${grandTotal.toFixed(2)}<br>
            Pichla Udhar: ${prevDue.toFixed(2)}<br>
            Aaj Jama: ${received.toFixed(2)}<br>
            <b>NET BALANCE: ${net.toFixed(2)}</b><br>
            -------------------------<br>
            <center>Thank You!</center>
        </div>
    `;
    document.getElementById('printArea').innerHTML = content;
    window.print();
}
*/

async function printBill() {
    if (historyItems.length === 0 && liveInput === "") {
        return alert("Pehle calculation karein!");
    }

    try {
        // Bluetooth Connection Logic
        if (!printerDevice) {
            printerDevice = await navigator.bluetooth.requestDevice({
                filters: [
                    { services: ['000018f0-0000-1000-8000-00805f9b34fb'] }, 
                    { namePrefix: 'SRS' }, 
                    { namePrefix: 'Bluetooth' }
                ],
                optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb']
            });
        }

        const server = await printerDevice.gatt.connect();
        const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
        const characteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');

        // Bill Data taiyar karna
        let prevDue = parseFloat(document.getElementById('prevDue').value) || 0;
        let received = parseFloat(document.getElementById('received').value) || 0;
        let net = (grandTotal + prevDue) - received;
        let date = new Date().toLocaleString();

        // ESC/POS Commands (Thermal Printer ki bhasha)
        let esc = '\x1B\x40'; // Initialize printer
        esc += '\x1B\x61\x01'; // Center Align
        esc += '\x1B\x21\x30' + 'STAR DIGITAL\n'; // Double height/width text
        esc += '\x1B\x21\x00'; // Normal text
        esc += '--------------------------------\n';
        esc += '\x1B\x61\x00'; // Left Align
        esc += `Date: ${date}\n`;
        esc += '--------------------------------\n';
        
        // Items list (History) print karna
        historyItems.forEach((item, index) => {
            esc += `${index + 1}. ${item}\n`;
        });

        esc += '--------------------------------\n';
        esc += `SUB TOTAL:      Rs.${grandTotal.toFixed(2)}\n`;
        esc += `PICHLA UDHAR:   Rs.${prevDue.toFixed(2)}\n`;
        esc += `AAJ JAMA:       Rs.${received.toFixed(2)}\n`;
        esc += '--------------------------------\n';
        esc += '\x1B\x21\x10'; // Bold text
        esc += `NET BALANCE:    Rs.${net.toFixed(2)}\n`;
        esc += '\x1B\x21\x00'; // Normal
        esc += '--------------------------------\n';
        esc += '\x1B\x61\x01' + '\nDHANYAWAD! VISIT AGAIN\n\n\n\n';

        const encoder = new TextEncoder();
        await characteristic.writeValue(encoder.encode(esc));
        
        alert("Printing Successful!");
    } catch (error) {
        console.log(error);
        alert("Printer connect nahi hua! Bluetooth on karein aur SRS588 select karein.");
    }
}
