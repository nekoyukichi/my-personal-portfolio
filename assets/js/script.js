document.addEventListener('DOMContentLoaded', () => {
    console.log('ポートフォリオページが読み込まれました');
    
    // テーマ切替ボタンの処理
    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher) {
      themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        console.log('テーマ切替ボタンがクリックされました');
      });
    }
    
    // 今後追加予定: インタラクションやアニメーションの処理
  });
  