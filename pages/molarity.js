document.getElementById("calculateMolarity").addEventListener("click", function() {
    const moles = parseFloat(document.getElementById("moles").value);
    const volume = parseFloat(document.getElementById("volume").value);

    if (!isNaN(moles) && !isNaN(volume) && volume > 0) {
        const molarity = moles / volume;
        document.getElementById("molarityResult").textContent = `Molarity: ${molarity.toFixed(2)} M`;
    } else {
        document.getElementById("molarityResult").textContent = "Please enter valid numbers!";
    }
});
