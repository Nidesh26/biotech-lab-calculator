document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Check if dark mode was previously selected
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Toggle Light Mode";
    }

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Save theme preference
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️ Toggle Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙 Toggle Dark Mode";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const unitType = document.getElementById("unit-type");
    const fromUnit = document.getElementById("from-unit");
    const toUnit = document.getElementById("to-unit");
    const inputValue = document.getElementById("input-value");
    const convertBtn = document.getElementById("convert");
    const resultDisplay = document.getElementById("result");

    const unitOptions = {
        length: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Micrometer", "Nanometer"],
        mass: ["Gram", "Kilogram", "Milligram", "Microgram", "Pound"],
        volume: ["Liter", "Milliliter", "Cubic Meter", "Cubic Centimeter"],
        temperature: ["Celsius", "Fahrenheit", "Kelvin"]
    };

    const conversionFactors = {
        length: {
            "Meter": { "Kilometer": 0.001, "Centimeter": 100, "Millimeter": 1000, "Micrometer": 1e6, "Nanometer": 1e9, "Meter": 1 },
            "Kilometer": { "Meter": 1000, "Centimeter": 100000, "Millimeter": 1e6, "Micrometer": 1e9, "Nanometer": 1e12, "Kilometer": 1 },
            "Centimeter": { "Meter": 0.01, "Kilometer": 1e-5, "Millimeter": 10, "Micrometer": 10000, "Nanometer": 1e7, "Centimeter": 1 },
            "Millimeter": { "Meter": 0.001, "Kilometer": 1e-6, "Centimeter": 0.1, "Micrometer": 1000, "Nanometer": 1e6, "Millimeter": 1 }
        },
        mass: {
            "Gram": { "Kilogram": 0.001, "Milligram": 1000, "Microgram": 1e6, "Pound": 0.00220462, "Gram": 1 },
            "Kilogram": { "Gram": 1000, "Milligram": 1e6, "Microgram": 1e9, "Pound": 2.20462, "Kilogram": 1 },
            "Milligram": { "Gram": 0.001, "Kilogram": 1e-6, "Microgram": 1000, "Pound": 2.20462e-6, "Milligram": 1 }
        },
        volume: {
            "Liter": { "Milliliter": 1000, "Cubic Meter": 0.001, "Cubic Centimeter": 1000, "Liter": 1 },
            "Milliliter": { "Liter": 0.001, "Cubic Meter": 1e-6, "Cubic Centimeter": 1, "Milliliter": 1 },
            "Cubic Meter": { "Liter": 1000, "Milliliter": 1e6, "Cubic Centimeter": 1e6, "Cubic Meter": 1 }
        },
        temperature: {
            "Celsius": { "Fahrenheit": (v) => (v * 9/5) + 32, "Kelvin": (v) => v + 273.15, "Celsius": (v) => v },
            "Fahrenheit": { "Celsius": (v) => (v - 32) * 5/9, "Kelvin": (v) => ((v - 32) * 5/9) + 273.15, "Fahrenheit": (v) => v },
            "Kelvin": { "Celsius": (v) => v - 273.15, "Fahrenheit": (v) => ((v - 273.15) * 9/5) + 32, "Kelvin": (v) => v }
        }
    };
    

    function updateUnitOptions() {
        const selectedType = unitType.value;
        fromUnit.innerHTML = "";
        toUnit.innerHTML = "";

        unitOptions[selectedType].forEach(unit => {
            let option1 = new Option(unit, unit);
            let option2 = new Option(unit, unit);
            fromUnit.add(option1);
            toUnit.add(option2);
        });
    }

    function convertUnits() {
        const value = parseFloat(inputValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;
        const type = unitType.value;

        if (isNaN(value)) {
            resultDisplay.textContent = "Please enter a valid number.";
            return;
        }

        let convertedValue;
        if (typeof conversionFactors[type][from][to] === "function") {
            convertedValue = conversionFactors[type][from][to](value);
        } else {
            convertedValue = value * (conversionFactors[type][from][to] || 1);
        }
        
        resultDisplay.textContent = `${value} ${from} = ${convertedValue.toFixed(4)} ${to}`;
        // Store the conversion in history
let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
history.unshift(`${value} ${from} = ${convertedValue.toFixed(4)} ${to}`);

// Keep only last 10 conversions
history = history.slice(0, 10);

localStorage.setItem("conversionHistory", JSON.stringify(history));

    }

    unitType.addEventListener("change", updateUnitOptions);
    convertBtn.addEventListener("click", convertUnits);

    updateUnitOptions(); // Initialize with default unit type
});
// Load history on the History Page
document.addEventListener("DOMContentLoaded", function () {
    const historyList = document.getElementById("history-list");
    const clearHistoryBtn = document.getElementById("clear-history");

    if (historyList) {
        let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];

        history.forEach(entry => {
            let li = document.createElement("li");
            li.textContent = entry;
            historyList.appendChild(li);
        });

        clearHistoryBtn.addEventListener("click", function () {
            localStorage.removeItem("conversionHistory");
            historyList.innerHTML = ""; // Clear list
        });
    }
});
// Feedback Page Functionality
document.addEventListener("DOMContentLoaded", function () {
    const ratingStars = document.querySelectorAll(".star");
    const ratingValue = document.getElementById("rating-value");
    const feedbackInput = document.getElementById("feedback-input");
    const submitFeedbackBtn = document.getElementById("submit-feedback");
    const feedbackList = document.getElementById("feedback-list");

    // Load previous feedback
    if (feedbackList) {
        let feedbackHistory = JSON.parse(localStorage.getItem("feedbackHistory")) || [];
        feedbackHistory.forEach(entry => {
            let li = document.createElement("li");
            li.textContent = entry;
            feedbackList.appendChild(li);
        });
    }

    // Handle Star Rating
    if (ratingStars.length > 0) {
        ratingStars.forEach(star => {
            star.addEventListener("click", function () {
                let value = this.getAttribute("data-value");
                ratingStars.forEach(s => s.classList.remove("selected"));
                this.classList.add("selected");
                ratingValue.textContent = `You rated: ${value} stars`;
                localStorage.setItem("userRating", value);
            });
        });

        // Load saved rating
        let savedRating = localStorage.getItem("userRating");
        if (savedRating) {
            ratingStars[savedRating - 1].classList.add("selected");
            ratingValue.textContent = `You rated: ${savedRating} stars`;
        }
    }

    // Handle Feedback Submission
    if (submitFeedbackBtn) {
        submitFeedbackBtn.addEventListener("click", function () {
            let feedback = feedbackInput.value.trim();
            if (feedback) {
                let feedbackHistory = JSON.parse(localStorage.getItem("feedbackHistory")) || [];
                feedbackHistory.unshift(feedback);
                feedbackHistory = feedbackHistory.slice(0, 5); // Keep only last 5 feedbacks
                localStorage.setItem("feedbackHistory", JSON.stringify(feedbackHistory));

                let li = document.createElement("li");
                li.textContent = feedback;
                feedbackList.prepend(li);

                feedbackInput.value = "";
                alert("Thank you for your feedback!");
            }
        });
    }
});

