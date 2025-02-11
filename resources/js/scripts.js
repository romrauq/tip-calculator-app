const bill_input = document.getElementById("bill-input");
const five = document.getElementById("five");
const ten = document.getElementById("ten");
const fifteen = document.getElementById("fifteen");
const twenty_five = document.getElementById("twenty-five");
const fifty = document.getElementById("fifty");
const custom_tip = document.getElementById("custom-tip");
const alert_text = document.getElementById("alert-text");
const people_input_container = document.getElementById("people-input-container");
const people_input = document.getElementById("people-input");
const tip_amount = document.getElementById("tip-amount-output");
const total_amount = document.getElementById("total-amount-output");
const reset_button = document.getElementById("reset-button");

let bill;
let percentage;
let people;
let tip_per_person;
let total_payment_amount;

bill_input.addEventListener("blur", () => {
	if (bill_input.value != "") {
		bill = parseFloat(bill_input.value);
		// console.log(bill);
	}
	calculateAmounts();
});

// Assign buttons variables into arrays paired with their associated numerical values:
const grid_buttons = [
	[five, 5],
	[ten, 10],
	[fifteen, 15],
	[twenty_five, 25],
	[fifty, 50],
];

grid_buttons.map((item) => {
	// Event listener to get the value of user selected tip percentage button:
	item[0].addEventListener("click", () => {
		//Map through all percentage tip buttons & remove class value:
		grid_buttons.map((item) => {
			item[0].classList.remove("tip-button-selected");
		});

		// Add class value to the currently selected button element:
		item[0].classList.add("tip-button-selected");
		percentage = item[1]; // Assign associated numerical value to percentage varisble.
		// console.log(percentage);
		calculateAmounts();
	});
});

// Event listener to get value of from tip percentage input field:
custom_tip.addEventListener("blur", () => {
	if (custom_tip.value != "") {
		// Map through all percentage tip buttons & remove class value:
		grid_buttons.map((item) => {
			item[0].classList.remove("tip-button-selected");
		});
		percentage = parseFloat(custom_tip.value);
		// console.log(percentage);
	}
	calculateAmounts();
});

// Event listener to get value of number of people:
people_input.addEventListener("blur", () => {
	if (parseFloat(people_input.value) == 0) {
		alert_text.textContent = "Can't be zero";
		alert_text.style.display = "block";
		people_input_container.style.border = "2px solid hsl(0, 100%, 66%)";
	} else if (people_input.value != "") {
		people = parseFloat(people_input.value);
		alert_text.style.display = "none";
		people_input_container.style.border = "2px solid hsl(172, 67%, 45%)";
		// console.log(people);
	} else {
		alert_text.textContent = "Can't be left empty";
		alert_text.style.display = "block";
		people_input_container.style.border = "2px solid hsl(0, 100%, 66%)";
	}
	calculateAmounts();
});

function calculateAmounts() {
	if (bill > 1 && percentage > 1 && people > 1) {
		console.log("All inputs filled.");
		let split_bill = bill / people;
		let tip_payment = split_bill * (percentage / 100);
		let total_payment = split_bill + tip_payment;
		console.log(split_bill);
		console.log(tip_payment);
		console.log(total_payment);

		tip_amount.textContent = tip_payment.toFixed(2); // Dynamically modify text content.
		total_amount.textContent = total_payment.toFixed(2); // Dynamically modify text content.
		reset_button.classList.add("reset-button-completed");
		reset_button.addEventListener("click", () => {
			bill_input.value = "";
			percentage.value = "";
			people_input.value = "";
			tip_amount.textContent = "0.00";
			total_amount.textContent = "0.00";
			grid_buttons.map((item) => {
				item[0].classList.remove("tip-button-selected");
			});
			reset_button.classList.remove("reset-button-completed");
		});
	} else {
		console.log("All inputs not filled.");
	}
}
