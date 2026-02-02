const canvas = document.getElementById('cardCanvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('textInput');
const colorPicker = document.getElementById('colorPicker');
const downloadBtn = document.getElementById('downloadBtn');

const bgImage = new Image();
bgImage.src = 'bg.jpg'; // 請確保檔案名稱正確

bgImage.onload = () => {
    // 強制設定畫布為圖片原始尺寸 1080x1350
    canvas.width = 1080;
    canvas.height = 1350;
    drawCard();
};

function drawCard() {
    // 1. 繪製背景
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    // 2. 文字設定
    const text = textInput.value;
    const lines = text.split('\n');
    
    // 設定字體 (手機端建議使用 sans-serif 確保相容性)
    const fontSize = 100;
    ctx.font = `bold ${fontSize}px "Microsoft JhengHei", "PingFang TC", sans-serif`;
    ctx.fillStyle = colorPicker.value;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 3. 繪製文字位置 (水平置中)
    // 根據原圖，紅底空白處大約從 y=550 到 y=950
    // 我們從中心點開始往上下擴散畫線
    const centerX = canvas.width / 2;
    const centerY = 750; // 這是圖片中間紅底區域的垂直中心點
    const lineHeight = fontSize * 1.3;

    // 計算總高度來置中多行文字
    const totalHeight = lines.length * lineHeight;
    const startY = centerY - (totalHeight / 2) + (lineHeight / 2);

    lines.forEach((line, index) => {
        const drawY = startY + (index * lineHeight);
        
        // 加入淡淡的文字陰影增加質感
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;

        ctx.fillText(line, centerX, drawY);
    });
}

// 監聽即時輸入
textInput.addEventListener('input', drawCard);
colorPicker.addEventListener('input', drawCard);

// 下載功能 (優化手機端下載)
downloadBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'new-year-wish.png';
    link.href = dataURL;
    
    // 針對部分手機瀏覽器觸發下載
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
