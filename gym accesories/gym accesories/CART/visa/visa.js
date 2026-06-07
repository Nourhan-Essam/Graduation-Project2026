document.addEventListener('DOMContentLoaded', () => {
    
    const inputName = document.getElementById('input-name');
    const inputNumber = document.getElementById('input-number');
    const inputMonth = document.getElementById('input-month');
    const inputYear = document.getElementById('input-year');
    const inputCcv = document.getElementById('input-ccv');


    const displayName = document.getElementById('display-name');
    const displayNumber = document.getElementById('display-number');
    const displayMonth = document.getElementById('display-month');
    const displayYear = document.getElementById('display-year');
    const displayCcv = document.getElementById('display-ccv');

   
    inputName.addEventListener('input', () => {
        displayName.innerText = inputName.value.toUpperCase() || ' ';
    });

    inputNumber.addEventListener('input', () => {
        let value = inputNumber.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
        displayNumber.innerText = formattedValue || ' ';
    });

  
    inputMonth.addEventListener('input', () => {
        displayMonth.innerText = inputMonth.value || 'MM';
    });

 
    inputYear.addEventListener('input', () => {
        displayYear.innerText = inputYear.value || 'YY';
    });


    inputCcv.addEventListener('input', () => {
        displayCcv.innerText = inputCcv.value.replace(/./g, '*') || '***';
    });
});



const payBtn = document.querySelector('.pay-btn');

payBtn.addEventListener('click', (e) => {
    e.preventDefault(); 


    Swal.fire({
        title: 'Payment Successful!',
        text: 'Thank you for visiting our website!!',
        icon: 'success',
       showConfirmButton: false, 
        background: '#002b5b', 
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            
            localStorage.removeItem("cart");
            
           
            window.location.href = "index.html"; 
        }
    });
});