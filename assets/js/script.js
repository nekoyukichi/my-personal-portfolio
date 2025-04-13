// 初期スクリプト（今後のインタラクティブな機能追加用）
document.addEventListener('DOMContentLoaded', () => {
    console.log('ポートフォリオページが読み込まれました');
    
    // 今後、インタラクションやアニメーションの追加コードをここに記述していきます
  });

// ページロード時の初期処理
document.addEventListener('DOMContentLoaded', () => {
    console.log('ページが読み込まれました');
  
    // ボタンクリックでテーマ切り替え
    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher) {
      themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
      });
    }
  });
  