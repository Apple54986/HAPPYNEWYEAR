const canvas = document.getElementById('cardCanvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('textInput');
const colorPicker = document.getElementById('colorPicker');
const downloadBtn = document.getElementById('downloadBtn');

// 準備背景圖 (你可以更換成自己的圖片網址)
const bgImage = new Image();
bgImage.crossOrigin = "anonymous"; 
// 這裡用一個紅底背景範例，建議之後在 GitHub 資料夾放一張 bg.jpg
bgImage.src = 'https://img.freepik.com/free-vector/traditional-chinese-new-year-red-background_1035-18880.jpg';

bgImage.onload = () => {
    drawCard();
};

// 繪製賀卡
function drawCard() {
    // 1. 畫背景
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    // 2. 設定文字樣式
    const fontSize = 80;
    ctx.font = `bold ${fontSize}px "Microsoft JhengHei"`;
    ctx.fillStyle = colorPicker.value;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const text = textInput.value;
    const lines = text.split('\n');

    // 3. 垂直繪製邏輯
    const margin = 100; // 邊距
    const colSpacing = 100; // 行距
    
    // 計算總共有幾行，從右邊開始寫 (符合古風)
    lines.forEach((line, colIndex) => {
        const characters = line.split('');
        const x = canvas.width - margin - (colIndex * colSpacing);
        
        characters.forEach((char, charIndex) => {
            const y = margin + (charIndex * (fontSize + 10));
            ctx.fillText(char, x, y);
        });
    });
}

// 監聽輸入即時更新
textInput.addEventListener('input', drawCard);
colorPicker.addEventListener('input', drawCard);

// 下載功能
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'new-year-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
