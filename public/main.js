const myForm = document.querySelector('#my-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const msg = document.querySelector('.msg');
const users = document.querySelector('#users');


myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    
    if(usernameInput.value === '' || passwordInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Provide The Required Details';
        
        setTimeout(()=> msg.remove(), 3000);
        }else{
        msg.innerHTML = 'welcome';
        
        setTimeout(()=> msg.remove(), 3000);
    }
}
