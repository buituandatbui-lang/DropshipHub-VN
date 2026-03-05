document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const form = this;
    const btn = form.querySelector('button');
    const originalBtnText = btn.innerText;
    
    btn.innerText = "Đang gửi dữ liệu..."; 

    // CHÚ Ý: Thảo dán lại cái link script của bạn vào đây nhé
    const googleAppScriptURL = "DAN_LINK_SCRIPT_CUA_THAO_VAO_DAY";

    // Cách đóng gói dữ liệu đơn giản nhất để Sheets dễ nhận
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();

    fetch(`${googleAppScriptURL}?${queryString}`, {
        method: 'POST',
        mode: 'no-cors'
    })
    .then(() => {
        // Bật hộp thoại thành công xịn xò của Thảo
        document.getElementById('successModal').classList.add('show');
        form.reset(); 
        btn.innerText = originalBtnText; 
    })
    .catch(error => {
        console.error('Lỗi:', error);
        alert("Có lỗi kết nối, Thảo kiểm tra lại mạng nhé!");
        btn.innerText = originalBtnText;
    });
});

// Hàm đóng Modal
function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}
