document.getElementById("calculateDilution").addEventListener("click", function() {
    const m1 = parseFloat(document.getElementById("m1").value);
    const v1 = parseFloat(document.getElementById("v1").value);
    const v2 = parseFloat(document.getElementById("v2").value);

    if (!isNaN(m1) && !isNaN(v1) && !isNaN(v2) && v2 > 0) {
        const m2 = (m1 * v1) / v2;
        document.getElementById("dilutionResult").textContent = `Final Molarity (M2): ${m2.toFixed(2)} M`;
    } else {
        document.getElementById("dilutionResult").textContent = "Please enter valid numbers!";
    }
});
