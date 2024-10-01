const medications = require('./medications.json');

const calculator = document.getElementById('app');

const calculateDoses = (weight) => {
  const doses = medications.map((medication) => {
    const dose = medication.dose * weight;
    return {
      name: medication.name,
      dose: dose,
      weight: weight,
      frequency: medication.frequency,
      formula: medication.formula,
      category: medication.category,
      indications: medication.indications
    };
  });
  return doses;
};

const renderCalculator = (weight) => {
  const doses = calculateDoses(weight);
  const html = `
    <h1>Pediatric Dose Calculator</h1>
    <form>
      <label>
        Weight (kg):
        <input type="number" id="weight" value="${weight}" />
      </label>
    </form>
    <h2>Calculated Doses:</h2>
    <table>
      <thead>
        <tr>
          <th>Medication</th>
          <th>Dose (mg/kg)</th>
          <th>Weight (kg)</th>
          <th>Dose (mg)</th>
          <th>Frequency</th>
          <th>Formula</th>
          <th>Category</th>
          <th>Indications</th>
        </tr>
      </thead>
      <tbody>
        ${doses.map((dose) => `
          <tr>
            <td>${dose.name}</td>
            <td>${dose.dose} mg/kg</td>
            <td>${dose.weight} kg</td>
            <td>${dose.dose * dose.weight} mg</td>
            <td>${dose.frequency}</td>
            <td>${dose.formula}</td>
            <td>${dose.category}</td>
            <td>${dose.indications.join(', ')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  calculator.innerHTML = html;
};

const handleWeightChange = (event) => {
  const weight = event.target.value;
  renderCalculator(weight);
};

const weightInput = document.createElement('input');
weightInput.type = 'number';
weightInput.id = 'weight';
weightInput.placeholder = 'Enter weight (kg)';
weightInput.addEventListener('input', handleWeightChange);

calculator.appendChild(weightInput);

renderCalculator(1);