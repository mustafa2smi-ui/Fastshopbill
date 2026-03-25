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
/*
let liveInput = "";
let historyItems = [];
let grandTotal = 0;
let activeField = "live";
let lastState = null; // For Undo
let printerDevice = null;

// Page load hote hi purani details bhar do
window.onload = function() {
    if(localStorage.getItem('shopName')) document.getElementById('set-shop-name').value = localStorage.getItem('shopName');
    if(localStorage.getItem('shopContact')) document.getElementById('set-shop-contact').value = localStorage.getItem('shopContact');
};

function saveShopDetails() {
    localStorage.setItem('shopName', document.getElementById('set-shop-name').value);
    localStorage.setItem('shopContact', document.getElementById('set-shop-contact').value);
    document.getElementById('shop-settings').style.display = 'none';
    alert("Details Saved Locally!");
}

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
/*
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
*

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
/*
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
*
        let sName = localStorage.getItem('shopName') || "STAR DIGITAL";
    let sContact = localStorage.getItem('shopContact') || "98XXXXXXXX";
    let cName = document.getElementById('set-cust-name').value || "Guest";
    let cContact = document.getElementById('set-cust-contact').value || "N/A";
    
    let now = new Date();
    let dateStr = now.toLocaleDateString();
    let timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    let esc = '\x1B\x40'; // Initialize
    esc += '\x1B\x61\x01'; // Center Align
    
    // --- Shop Header ---
    esc += '\x1B\x21\x30' + sName + '\n'; // Double size Shop Name
    esc += '\x1B\x21\x00' + 'Mob: ' + sContact + '\n';
    esc += '--------------------------------\n';
    
    // --- Date & Time ---
    esc += '\x1B\x61\x00'; // Left Align
    esc += `Date: ${dateStr}   Time: ${timeStr}\n`;
    
    // --- Customer Details ---
    esc += `Cust: ${cName}\n`;
    esc += `Contact: ${cContact}\n`;
    esc += '--------------------------------\n';
    
    // --- Bill Items (Loop) ---
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
/*
async function printBill() {
    // ... (Bluetooth connection wala purana code yahan rahega) ...

    // Dynamic Data uthayein
    let sName = localStorage.getItem('shopName') || "STAR DIGITAL";
    let sContact = localStorage.getItem('shopContact') || "98XXXXXXXX";
    let cName = document.getElementById('set-cust-name').value || "Guest";
    let cContact = document.getElementById('set-cust-contact').value || "N/A";
    
    let now = new Date();
    let dateStr = now.toLocaleDateString();
    let timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    let esc = '\x1B\x40'; // Initialize
    esc += '\x1B\x61\x01'; // Center Align
    
    // --- Shop Header ---
    esc += '\x1B\x21\x30' + sName + '\n'; // Double size Shop Name
    esc += '\x1B\x21\x00' + 'Mob: ' + sContact + '\n';
    esc += '--------------------------------\n';
    
    // --- Date & Time ---
    esc += '\x1B\x61\x00'; // Left Align
    esc += `Date: ${dateStr}   Time: ${timeStr}\n`;
    
    // --- Customer Details ---
    esc += `Cust: ${cName}\n`;
    esc += `Contact: ${cContact}\n`;
    esc += '--------------------------------\n';
    
    // --- Bill Items (Loop) ---
    historyItems.forEach((item, index) => {
        esc += `${index + 1}. ${item}\n`;
    });

    // ... (Grand Total aur Footer wala logic wahi rahega) ...
}
*/
/*
let liveInput = "";
let historyItems = [];
let grandTotal = 0;
let activeField = "live";
let lastState = null; 
let printerDevice = null;

// Page load par settings load karein
window.onload = function() {
    if(localStorage.getItem('shopName')) document.getElementById('set-shop-name').value = localStorage.getItem('shopName');
    if(localStorage.getItem('shopContact')) document.getElementById('set-shop-contact').value = localStorage.getItem('shopContact');
};

// Settings Modal ko kholne/band karne ke liye
function toggleSettings() {
    const modal = document.getElementById('shop-settings');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

function saveShopDetails() {
    localStorage.setItem('shopName', document.getElementById('set-shop-name').value);
    localStorage.setItem('shopContact', document.getElementById('set-shop-contact').value);
    toggleSettings(); // Close modal
    alert("Shop Details Saved!");
}

function updateNetBalance() {
    let prevDue = parseFloat(document.getElementById('prevDue').value) || 0;
    let received = parseFloat(document.getElementById('received').value) || 0;
    let net = (grandTotal + prevDue) - received;
    document.getElementById('net-result').innerText = "₹ " + net.toFixed(2);
}

function setCurrentInput(field) {
    activeField = field;
    // Input boxes highlight logic
    document.querySelectorAll('.input-group input').forEach(el => el.style.borderColor = "#ccc");
    document.getElementById(field).style.borderColor = "#007bff";
}

function addNumber(num) {
    if (activeField === "live") {
        liveInput = (liveInput === "0") ? num : liveInput + num;
        document.getElementById('live-display').value = liveInput;
    } else {
        let field = document.getElementById(activeField);
        field.value = (field.value === "0") ? num : field.value + num;
        updateNetBalance();
    }
}

function addOperator(op) {
    activeField = "live";
    if (liveInput === "") return;
    // Space is important for clean display
    liveInput += " " + op + " ";
    document.getElementById('live-display').value = liveInput;
}

function calculate() {
    try {
        if (liveInput === "" || liveInput === "0") return;
        
        let nameInput = document.getElementById('item-name').value || "Item";
        let expression = liveInput.trim();
        // Replace visual operators with math operators
        let mathExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(mathExpression);

        if (isNaN(result)) throw "Error";

        // Update Total and History
        grandTotal += result;
        historyItems.push(`${nameInput}: ${expression} = ${result.toFixed(2)}`);

        // UI Updates
        document.getElementById('history-row').innerText = historyItems.join(" | ");
        document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
        
        // Auto-scroll history
        let histScroll = document.getElementById('hist-scroll');
        histScroll.scrollLeft = histScroll.scrollWidth;

        // Reset for next entry
        liveInput = "";
        document.getElementById('live-display').value = "0";
        document.getElementById('item-name').value = ""; // Clear name
        updateNetBalance();

    } catch (e) {
        alert("Sahi calculation likhein!");
        liveInput = "";
        document.getElementById('live-display').value = "0";
    }
}

function clearAll() {
    if(!confirm("Pura bill saaf karein?")) return;
    liveInput = "";
    historyItems = [];
    grandTotal = 0;
    document.getElementById('live-display').value = "0";
    document.getElementById('history-row').innerText = "";
    document.getElementById('grand-total').innerText = "0";
    document.getElementById('prevDue').value = "0";
    document.getElementById('received').value = "0";
    document.getElementById('item-name').value = "";
    updateNetBalance();
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

async function printBill() {
    if (historyItems.length === 0) return alert("Pehle ADD (=) button dabayein!");

    try {
        if (!printerDevice) {
            printerDevice = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }, { namePrefix: 'SRS' }, { namePrefix: 'Bluetooth' }],
                optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb']
            });
        }

        const server = await printerDevice.gatt.connect();
        const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
        const characteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');

        // Sabhi values ko define karein warna error aayega
        let sName = localStorage.getItem('shopName') || "STAR DIGITAL";
        let sContact = localStorage.getItem('shopContact') || "98XXXXXXXX";
        let cName = document.getElementById('set-cust-name').value || "Guest";
        let cContact = document.getElementById('set-cust-contact').value || "N/A";
        let prevDue = parseFloat(document.getElementById('prevDue').value) || 0;
        let received = parseFloat(document.getElementById('received').value) || 0;
        let net = (grandTotal + prevDue) - received;
        
        let now = new Date();
        let dateStr = now.toLocaleDateString();
        let timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        let esc = '\x1B\x40'; // Init
        esc += '\x1B\x61\x01'; // Center
        esc += '\x1B\x21\x30' + sName + '\n'; // Big Shop Name
        esc += '\x1B\x21\x00' + 'Mob: ' + sContact + '\n';
        esc += '--------------------------------\n';
        esc += '\x1B\x61\x00'; // Left
        esc += `Date: ${dateStr}  Time: ${timeStr}\n`;
        esc += `Cust: ${cName}\n`;
        esc += `Contact: ${cContact}\n`;
        esc += '--------------------------------\n';
        
        historyItems.forEach((item, index) => {
            esc += `${index + 1}. ${item}\n`;
        });

        esc += '--------------------------------\n';
        esc += `SUB TOTAL:      Rs.${grandTotal.toFixed(2)}\n`;
        esc += `PICHLA UDHAR:   Rs.${prevDue.toFixed(2)}\n`;
        esc += `AAJ JAMA:       Rs.${received.toFixed(2)}\n`;
        esc += '--------------------------------\n';
        esc += '\x1B\x21\x10'; // Bold
        esc += `NET BALANCE:    Rs.${net.toFixed(2)}\n`;
        esc += '\x1B\x21\x00'; // Normal
        esc += '--------------------------------\n';
        esc += '\x1B\x61\x01' + '\nDHANYAWAD! VISIT AGAIN\n\n\n\n';

        const encoder = new TextEncoder();
        await characteristic.writeValue(encoder.encode(esc));
        alert("Printing...");
    } catch (error) {
        alert("Printer error! Bluetooth Check karein.");
    }
}
*/
/*
let liveInput = "";
let historyItems = [];
let grandTotal = 0;
let activeField = "live";
let printerDevice = null;

// 1. Page Load Logic
window.onload = function() {
    if(localStorage.getItem('shopName')) document.getElementById('set-shop-name').value = localStorage.getItem('shopName');
    if(localStorage.getItem('shopContact')) document.getElementById('set-shop-contact').value = localStorage.getItem('shopContact');
    updateNetBalance();
};

// 2. Settings Modal Logic
function toggleSettings() {
    const modal = document.getElementById('shop-settings');
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
    }
}

function saveShopDetails() {
    localStorage.setItem('shopName', document.getElementById('set-shop-name').value);
    localStorage.setItem('shopContact', document.getElementById('set-shop-contact').value);
    toggleSettings();
    alert("Settings Saved!");
}

// 3. Calculation & Display Logic
function updateNetBalance() {
    let prevDue = parseFloat(document.getElementById('prevDue').value) || 0;
    let received = parseFloat(document.getElementById('received').value) || 0;
    let net = (grandTotal + prevDue) - received;
    document.getElementById('net-result').innerText = "₹ " + net.toFixed(2);
}

function setCurrentInput(field) {
    activeField = field;
    document.querySelectorAll('.input-group input').forEach(el => el.style.borderColor = "#ccc");
    document.getElementById(field).style.borderColor = "#007bff";
}

function addNumber(num) {
    if (activeField === "live") {
        liveInput = (liveInput === "0") ? num : liveInput + num;
        document.getElementById('live-display').value = liveInput;
    } else {
        let field = document.getElementById(activeField);
        field.value = (field.value === "0") ? num : field.value + num;
        updateNetBalance();
    }
}

function addOperator(op) {
    activeField = "live";
    if (liveInput === "" || liveInput === "0") return;
    liveInput += " " + op + " ";
    document.getElementById('live-display').value = liveInput;
}

function calculate() {
    try {
        if (liveInput === "" || liveInput === "0") return;
        
        let nameInput = document.getElementById('item-name').value || "Item";
        let expression = liveInput.trim();
        // Replace visual ops with math ops
        let mathExp = expression.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(mathExp);

        if (isNaN(result)) throw "Error";

        // Update Total & History
        grandTotal += result;
        historyItems.push(`${nameInput}: ${expression} = ${result.toFixed(2)}`);

        // Update UI
        document.getElementById('history-row').innerText = historyItems.join(" | ");
        document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
        
        // Clear for next
        liveInput = "";
        document.getElementById('live-display').value = "0";
        document.getElementById('item-name').value = "";
        updateNetBalance();

    } catch (e) {
        alert("Sahi format likhein (e.g. 10 + 20)");
        liveInput = "";
        document.getElementById('live-display').value = "0";
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

function clearAll() {
    if(!confirm("Kya aap pura bill saaf karna chahte hain?")) return;
    liveInput = "";
    historyItems = [];
    grandTotal = 0;
    document.getElementById('live-display').value = "0";
    document.getElementById('history-row').innerText = "";
    document.getElementById('grand-total').innerText = "0";
    document.getElementById('prevDue').value = "0";
    document.getElementById('received').value = "0";
    document.getElementById('item-name').value = "";
    updateNetBalance();
}

// 4. Printer Logic
async function printBill() {
    if (historyItems.length === 0) return alert("Pehle item add karein!");

    try {
        if (!printerDevice) {
            printerDevice = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }, { namePrefix: 'SRS' }, { namePrefix: 'Bluetooth' }],
                optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb']
            });
        }

        const server = await printerDevice.gatt.connect();
        const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
        const characteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');

        let sName = localStorage.getItem('shopName') || "STAR DIGITAL";
        let sContact = localStorage.getItem('shopContact') || "98XXXXXXXX";
        let cName = document.getElementById('set-cust-name').value || "Guest";
        let cContact = document.getElementById('set-cust-contact').value || "N/A";
        let prevDue = parseFloat(document.getElementById('prevDue').value) || 0;
        let received = parseFloat(document.getElementById('received').value) || 0;
        let net = (grandTotal + prevDue) - received;
        
        let now = new Date();
        let dateStr = now.toLocaleDateString();
        let timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        let esc = '\x1B\x40'; 
        esc += '\x1B\x61\x01'; 
        esc += '\x1B\x21\x30' + sName + '\n'; 
        esc += '\x1B\x21\x00' + 'Mob: ' + sContact + '\n';
        esc += '--------------------------------\n';
        esc += '\x1B\x61\x00'; 
        esc += `Date: ${dateStr}  Time: ${timeStr}\n`;
        esc += `Cust: ${cName}\n`;
        esc += `Contact: ${cContact}\n`;
        esc += '--------------------------------\n';
        
        historyItems.forEach((item, index) => {
            esc += `${index + 1}. ${item}\n`;
        });

        esc += '--------------------------------\n';
        esc += `SUB TOTAL:      Rs.${grandTotal.toFixed(2)}\n`;
        esc += `PICHLA UDHAR:   Rs.${prevDue.toFixed(2)}\n`;
        esc += `AAJ JAMA:       Rs.${received.toFixed(2)}\n`;
        esc += '--------------------------------\n';
        esc += '\x1B\x21\x10' + `NET BALANCE:    Rs.${net.toFixed(2)}\n` + '\x1B\x21\x00';
        esc += '\x1B\x61\x01' + '\nDHANYAWAD! VISIT AGAIN\n\n\n\n';

        const encoder = new TextEncoder();
        await characteristic.writeValue(encoder.encode(esc));
    } catch (error) {
        alert("Bluetooth Printer Connect Nahi Hua!");
    }
}
*/
let liveInput = "";
let historyItems = [];
let grandTotal = 0;
let activeField = "live";
let lastState = null; // Undo ke liye
let printerDevice = null;

// 1. Save Bill to Local History (For Reloading later)
function saveToHistory() {
    let billData = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: [...historyItems],
        total: grandTotal,
        prev: document.getElementById('prevDue').value,
        recv: document.getElementById('received').value,
        shop: localStorage.getItem('shopName')
    };
    let allBills = JSON.parse(localStorage.getItem('allBills') || "[]");
    allBills.unshift(billData); // Naya bill upar rakhein
    localStorage.setItem('allBills', JSON.stringify(allBills.slice(0, 20))); // Sirf last 20 bills save karein
}

// 2. Undo Function
function undo() {
    if (lastState) {
        historyItems = [...lastState.history];
        grandTotal = lastState.total;
        document.getElementById('history-row').innerText = historyItems.join(" | ");
        document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
        updateNetBalance();
        lastState = null; // Ek hi baar undo hoga
        alert("Pichli entry wapas le li gayi!");
    } else {
        alert("Undo karne ke liye kuch nahi hai!");
    }
}
/*
// 3. Calculate (With Undo Support)
function calculate() {
    try {
        if (liveInput === "" || liveInput === "0") return;
        
        // Undo ke liye purana data save karein
        lastState = { history: [...historyItems], total: grandTotal };

        let nameInput = document.getElementById('item-name').value || "Item";
        let expression = liveInput.trim();
        let mathExp = expression.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(mathExp);

        grandTotal += result;
        // Text bachane ke liye format chota rakha hai
        historyItems.push(`${nameInput}:${result.toFixed(0)}`);

        document.getElementById('history-row').innerText = historyItems.join("|");
        document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
        
        liveInput = "";
        document.getElementById('live-display').value = "0";
        document.getElementById('item-name').value = "";
        updateNetBalance();
    } catch (e) { alert("Format Error!"); }
}
*/
// 4. CSV Export
function exportCSV() {
    if (historyItems.length === 0) return alert("Khaali bill export nahi ho sakta");
    let csvContent = "data:text/csv;charset=utf-8,Item,Amount\n";
    historyItems.forEach(line => {
        csvContent += line.replace(':', ',') + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Bill_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
}

// 5. Optimized Small Print Logic
async function printBill() {
    if (historyItems.length === 0) return alert("Pehle Add karein!");
    
    // Bill save kar lo taaki baad mein reload ho sake
    saveToHistory();

    try {
        if (!printerDevice) {
            printerDevice = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }, { namePrefix: 'SRS' }],
                optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb']
            });
        }
        const server = await printerDevice.gatt.connect();
        const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
        const char = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');

        let sName = localStorage.getItem('shopName') || "STAR DIGITAL";
        let prevDue = parseFloat(document.getElementById('prevDue').value) || 0;
        let received = parseFloat(document.getElementById('received').value) || 0;
        let net = (grandTotal + prevDue) - received;

        // SMALL FONT & COMPACT SPACE LOGIC
        let esc = '\x1B\x40'; // Init
        esc += '\x1B\x61\x01'; // Center
        esc += '\x1B\x21\x10' + sName + '\n'; // Medium Bold
        esc += '\x1B\x21\x01'; // SMALL FONT MODE (If supported)
        esc += '--------------------------\n'; // Choti line
        
        esc += '\x1B\x61\x00'; // Left
        historyItems.forEach((item, i) => {
            esc += `${i+1}.${item}\n`; // Ek line mein item aur price
        });

        esc += '--------------------------\n';
        esc += `Total: Rs.${grandTotal.toFixed(0)}\n`;
        esc += `Due:   Rs.${prevDue.toFixed(0)}\n`;
        esc += `Paid:  Rs.${received.toFixed(0)}\n`;
        esc += '\x1B\x21\x08'; // Bold
        esc += `NET:   Rs.${net.toFixed(0)}\n`;
        esc += '\x1B\x21\x01'; // Back to Small
        esc += '--------------------------\n';
        esc += '\x1B\x61\x01' + 'DHANYAWAD\n\n\n';

        await char.writeValue(new TextEncoder().encode(esc));
    } catch (e) { alert("Printer Error"); }
}
function clearAll() {
    if(!confirm("Kya aap pura bill saaf karna chahte hain?")) return;
    liveInput = "";
    historyItems = [];
    grandTotal = 0;
    document.getElementById('live-display').value = "0";
    document.getElementById('history-row').innerText = "";
    document.getElementById('grand-total').innerText = "0";
    document.getElementById('prevDue').value = "0";
    document.getElementById('received').value = "0";
    document.getElementById('item-name').value = "";
    updateNetBalance();
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
// 1. Page Load Logic
window.onload = function() {
    if(localStorage.getItem('shopName')) document.getElementById('set-shop-name').value = localStorage.getItem('shopName');
    if(localStorage.getItem('shopContact')) document.getElementById('set-shop-contact').value = localStorage.getItem('shopContact');
    updateNetBalance();
};

// 2. Settings Modal Logic
function toggleSettings() {
    const modal = document.getElementById('shop-settings');
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
    }
}

function saveShopDetails() {
    localStorage.setItem('shopName', document.getElementById('set-shop-name').value);
    localStorage.setItem('shopContact', document.getElementById('set-shop-contact').value);
    toggleSettings();
    alert("Settings Saved!");
}

// 3. Calculation & Display Logic
function updateNetBalance() {
    let prevDue = parseFloat(document.getElementById('prevDue').value) || 0;
    let received = parseFloat(document.getElementById('received').value) || 0;
    let net = (grandTotal + prevDue) - received;
    document.getElementById('net-result').innerText = "₹ " + net.toFixed(2);
}

function setCurrentInput(field) {
    activeField = field;
    document.querySelectorAll('.input-group input').forEach(el => el.style.borderColor = "#ccc");
    document.getElementById(field).style.borderColor = "#007bff";
}

function addNumber(num) {
    if (activeField === "live") {
        liveInput = (liveInput === "0") ? num : liveInput + num;
        document.getElementById('live-display').value = liveInput;
    } else {
        let field = document.getElementById(activeField);
        field.value = (field.value === "0") ? num : field.value + num;
        updateNetBalance();
    }
}

function addOperator(op) {
    activeField = "live";
    if (liveInput === "" || liveInput === "0") return;
    liveInput += " " + op + " ";
    document.getElementById('live-display').value = liveInput;
}
// 1. History Row mein direct edit karne ka function
function makeEditable() {
    const historyRow = document.getElementById('history-row');
    
    // Har item ko click-able banayein
    historyRow.addEventListener('input', function() {
        recalculateFromHistory(); // Jaise hi text badle, total update ho jaye
    });
}

// 2. Pura Total phir se calculate karna (History se data nikaal kar)
function recalculateFromHistory() {
    const historyText = document.getElementById('history-row').innerText;
    if (!historyText) {
        grandTotal = 0;
    } else {
        // "Item:100 | Item:200" mein se numbers nikaalna
        const parts = historyText.split('|');
        let newTotal = 0;
        
        parts.forEach(p => {
            let val = p.split('=')[1] || p.split(':')[1] || "0";
            newTotal += parseFloat(val) || 0;
        });
        grandTotal = newTotal;
    }
    
    // UI Update karein
    document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
    updateNetBalance();
}

// 3. Updated Calculate Function (Taaki items editable banein)
function calculate() {
    try {
        if (liveInput === "" || liveInput === "0") return;
        lastState = { history: [...historyItems], total: grandTotal };

        let nameInput = document.getElementById('item-name').value || "Item";
        let expression = liveInput.trim();
        let mathExp = expression.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(mathExp);

        grandTotal += result;
        
        // Naya Item Array mein aur UI mein
        let newItem = `${nameInput}:${result.toFixed(0)}`;
        historyItems.push(newItem);

        // History Row ko update karna
        const hr = document.getElementById('history-row');
        hr.innerText = historyItems.join(" | ");
        hr.setAttribute('contenteditable', 'true'); // Isse user touch karke edit kar payega
        
        document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
        
        liveInput = "";
        document.getElementById('live-display').value = "0";
        document.getElementById('item-name').value = "";
        updateNetBalance();
        
        makeEditable(); // Edit listener active karein
    } catch (e) { alert("Format Error!"); }
}
