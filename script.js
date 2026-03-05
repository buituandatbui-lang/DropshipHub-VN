function calculateProfit() {
    const baseCost = parseFloat(document.getElementById('baseCost').value) || 0;
    const marketingCost = parseFloat(document.getElementById('marketingCost').value) || 0;
    const shippingCost = parseFloat(document.getElementById('shippingCost').value) || 0;
    const platformFeePercent = parseFloat(document.getElementById('platformFee').value) || 0;
    const retailPrice = parseFloat(document.getElementById('retailPrice').value) || 0;

    const platformFee = retailPrice * (platformFeePercent / 100);
    const totalCost = baseCost + marketingCost + shippingCost + platformFee;
    const netProfit = retailPrice - totalCost;
    
    let margin = 0;
    if (retailPrice > 0) {
        margin = ((netProfit / retailPrice) * 100).toFixed(2);
    }

    document.getElementById('totalCost').innerText = totalCost.toLocaleString('vi-VN') + " VNĐ";
    document.getElementById('feeAmount').innerText = platformFee.toLocaleString('vi-VN') + " VNĐ";
    document.getElementById('netProfit').innerText = netProfit.toLocaleString('vi-VN') + " VNĐ";
    document.getElementById('marginPercent').innerText = margin + "%";

    const adviceBox = document.getElementById('adviceMessage');
    if (retailPrice === 0) {
        adviceBox.innerHTML = "Vui lòng nhập giá bán lẻ để phân tích.";
        adviceBox.style.color = "#cbd5e1";
    } else if (netProfit <= 0) {
        adviceBox.innerHTML = "🔴 RỦI RO DÒNG TIỀN ÂM: Giá vốn và chi phí đang cao hơn giá bán. Cân nhắc tăng giá bán lẻ.";
        adviceBox.style.color = "#fca5a5"; 
    } else if (margin < 15) {
        adviceBox.innerHTML = "🟡 BIÊN LỢI NHUẬN MỎNG: Lãi ròng của bạn đang dưới 15%. Rất dễ bị lỗ nếu tỷ lệ hoàn hàng cao.";
        adviceBox.style.color = "#fde047"; 
    } else {
        adviceBox.innerHTML = "🟢 CHỈ SỐ LÝ TƯỞNG: Sản phẩm có khả năng sinh lời tốt (Margin > 15%).";
        adviceBox.style.color = "#86efac"; 
    }
}

// Lệnh tắt Modal
function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const form = this;
    const data = new URLSearchParams(new FormData(form)); 
    const btn = form.querySelector('button');
    const originalBtnText = btn.innerText;
    
    btn.innerText = "Đang gửi dữ liệu..."; 

    // ======== DÁN LẠI LINK GOOGLE CỦA BRO VÀO ĐÂY ========
    const googleAppScriptURL = "https://script.google.com/macros/s/AKfycbz8_G0rbTYDoC8cCMvRVUa2mHmI1Fpd2iiB4EPEBEHRMHlpjiosqSH-7zu4HgrK13sx/exec";
    // ======================================================

    fetch(googleAppScriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: data
    })
    .then(res => {
        // Thay vì hiện alert() phèn phèn, ta bật cái Modal xịn xò lên
        document.getElementById('successModal').classList.add('show');
        form.reset(); 
        btn.innerText = originalBtnText; 
    })
    .catch(error => {
        alert("Lỗi kết nối máy chủ, vui lòng thử lại sau.");
        btn.innerText = originalBtnText;
    });
});

