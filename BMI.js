let button = document.getElementById('btn');

button.addEventListener('click', () => {
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const age = parseInt(document.getElementById('age').value);
    const result = document.getElementById('output');
    let height_status = false, weight_status = false, age_status = false;

    if (height === '' || isNaN(height) || height <= 0) {
        document.getElementById('height_error').innerHTML = 'Please provide a valid height';
    } else {
        document.getElementById('height_error').innerHTML = '';
        height_status = true;
    }

    if (weight === '' || isNaN(weight) || weight <= 0) {
        document.getElementById('weight_error').innerHTML = 'Please provide a valid weight';
    } else {
        document.getElementById('weight_error').innerHTML = '';
        weight_status = true;
    }

    if (age === '' || isNaN(age) || age <= 0) {
        document.getElementById('age_error').innerHTML = 'Please provide a valid age';
    } else {
        document.getElementById('age_error').innerHTML = '';
        age_status = true;
    }

    if (height_status && weight_status && age_status) {
        // Convert height to meters and weight to kilograms
        const heightInMeters = height * 0.0254; // 1 inch = 0.0254 meters
        const weightInKg = weight * 0.453592; // 1 pound = 0.453592 kilograms

        // Calculate BMI using the adjusted formula
        let bmi;
        if (age >= 18) {
            bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
        } else {
            // Adjusted BMI calculation for children and adolescents
            bmi = ((weightInKg / (heightInMeters * heightInMeters)) + (0.02 * age)).toFixed(2);
        }

        if (bmi < 18.5) {
            result.innerHTML = 'Underweight: ' + bmi;
        } else if (bmi >= 18.5 && bmi < 24.9) {
            result.innerHTML = 'Normal weight: ' + bmi;
        } else if (bmi >= 25 && bmi < 29.9) {
            result.innerHTML = 'Overweight: ' + bmi;
        } else {
            result.innerHTML = 'Obese: ' + bmi;
        }
    } else {
        alert('The form has errors');
        result.innerHTML = '';
    }
});