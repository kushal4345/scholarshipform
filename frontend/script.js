function toggleReferralCode() {
    const referralSelect = document.getElementById('referral');
    const referralCodeGroup = document.getElementById('referralCodeGroup');
    const referralCodeDisplay = document.getElementById('referralCodeDisplay');
    const generatedReferralCode = document.getElementById('generatedReferralCode');

    if (referralSelect.value === 'yes') {
        referralCodeGroup.style.display = 'block';
        referralCodeDisplay.style.display = 'none';
    } else {
        referralCodeGroup.style.display = 'none';
        referralCodeDisplay.style.display = 'block';
        generatedReferralCode.textContent = generateReferralCode();
    }
}

function generateReferralCode(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let referralCode = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        referralCode += characters[randomIndex];
    }
    return referralCode;
}

async function submitForm(event) {
    event.preventDefault();

    const form = document.getElementById('scholarshipForm');
    const referralSelect = document.getElementById('referral');
    const referralCodeInput = document.getElementById('referralCode');
    const generatedReferralCode = document.getElementById('generatedReferralCode');

    const formData = {
        fullName: form.fullName.value,
        email: form.email.value,
        phone: form.phone.value,
        referralCode: referralSelect.value === 'yes' ? referralCodeInput.value : generatedReferralCode.textContent,
        essay: form.essay.value,
    };

    try {
        const response = await fetch('https://scholarshipform-k1f6.vercel.app/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        alert(result.message || result.error);
        form.reset();
    } catch (error) {
        alert('An error occurred while submitting the form.');
    }
}