export const validateField = (name, value) => {
    const errors = {};

    // Text Field (Required)
    if (name === 'username' && !value.trim()) {
        errors[name] = 'Username is required';
    }

    // Email Validation
    if (name === 'email') {
        if (!value) errors[name] = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors[name] = 'Invalid email format';
        }
    }

    // Strong Password (8+ chars, 1 number, 1 special char)
    if (name === 'password') {
        if (!value) errors[name] = 'Password is required';
        else if (value.length < 8) errors[name] = 'Password must be 8+ characters';
        else if (!/[0-9]/.test(value)) errors[name] = 'Add at least 1 number';
        else if (!/[!@#$%^&*]/.test(value)) {
            errors[name] = 'Add 1 special character (!@#$%^&*)';
        }
    }

    // Checkbox (Must be checked)
    if (name === 'terms' && !value) {
        errors[name] = 'You must accept the terms';
    }

    // Radio Button (Must select one)
    if (name === 'gender' && !value) {
        errors[name] = 'Please select a gender';
    }

    return errors;
};

// Validate entire form
export const validateForm = (formData) => {
    let errors = {};
    Object.entries(formData).forEach(([name, value]) => {
        errors = { ...errors, ...validateField(name, value) };
    });
    return errors;
};