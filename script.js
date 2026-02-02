const canvas = document.getElementById('cardCanvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('textInput');
const colorPicker = document.getElementById('colorPicker');
const downloadBtn = document.getElementById('downloadBtn');

// 1. 準備背景圖
const bgImage = new Image();
// 這裡改為你的檔名，因為在同一個資料夾，直接寫檔名即可
bgImage.src = 'bg.jpg'; 

// 2. 當圖片載入完成後才執行繪製
bgImage.onload = () => {
    // 自動調整畫布尺寸以符合圖片實際大小
    canvas.width = bgImage.width;
    canvas.height = bgImage.height;
    drawCard();
};

function drawCard() {
    // 清除畫布並重繪背景
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    // 設定文字樣式 (根據畫布寬度動態調整字體大小，避免圖大字小)
    const fontSize = Math.floor(canvas.width * 0.1); // 字體大小約為寬度的 10%
    ctx.font = `bold ${fontSize}px "Microsoft JhengHei", "PingFang TC", sans-serif`;
    ctx.fillStyle = colorPicker.value;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // 取得文字並處理換行
    const text = textInput.value;
    const lines = text.split('\n');

    // 垂直繪製邏輯
    const marginSide = canvas.width * 0.15; // 左右邊距
    const marginTop = canvas.height * 0.15; // 上方邊距
    const colSpacing = fontSize * 1.2;     // 行距
    
    lines.forEach((line, colIndex) => {
        const characters = line.split('');
        // 從右側開始排版 (符合春聯習俗)
        const x = canvas.width - marginSide - (colIndex * colSpacing);
        
        characters.forEach((char, charIndex) => {
            const y = marginTop + (charIndex * (fontSize * 1.1));
            // 繪製文字陰影，讓字在花花綠綠的背景上更清楚
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            ctx.shadowBlur = 10;
            ctx.fillText(char, x, y);
        });
    });
}

// 監聽輸入
textInput.addEventListener('input', drawCard);
colorPicker.addEventListener('input', drawCard);

// 下載功能
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'happy-new-year.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
