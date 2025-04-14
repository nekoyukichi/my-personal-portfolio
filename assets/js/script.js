document.addEventListener('DOMContentLoaded', () => {
    console.log('ポートフォリオページが読み込まれました');
    
    // AOS (Animate On Scroll) 初期化
    AOS.init({
      duration: 800,
      easing: 'ease',
      once: true,
      offset: 100,
    });
    
    // Particles.js 初期化（ヒーローセクションの背景用）
    if (document.getElementById('particles-js')) {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#ffffff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
    
    // スクロール時のヘッダースタイル変更
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // モバイルメニュー切替
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
      });
    }
    
    // ナビゲーションリンクのスムーススクロール
    const navLinks = document.querySelectorAll('.main-nav a, .footer-links a, .scroll-down, .hero-cta a');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // 内部リンク（#で始まるリンク）のみ処理
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          
          // モバイルメニューが開いている場合は閉じる
          if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
          }
          
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            const offsetTop = targetSection.offsetTop - header.offsetHeight;
            
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // テーマ切替ボタンの処理
    const themeSwitcher = document.getElementById('theme-switcher');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // ローカルストレージからテーマ設定を取得するか、システム設定を使用
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
      document.body.classList.add('dark-mode');
      if (themeSwitcher) {
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i><span>テーマ切替</span>';
      }
    }
    
    if (themeSwitcher) {
      themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // アイコン変更
        if (document.body.classList.contains('dark-mode')) {
          themeSwitcher.innerHTML = '<i class="fas fa-sun"></i><span>テーマ切替</span>';
          localStorage.setItem('theme', 'dark');
        } else {
          themeSwitcher.innerHTML = '<i class="fas fa-moon"></i><span>テーマ切替</span>';
          localStorage.setItem('theme', 'light');
        }
        
        console.log('テーマ切替ボタンがクリックされました');
      });
    }
    
    // タイピングアニメーション
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
      const text = typingElement.textContent;
      typingElement.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          typingElement.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      setTimeout(typeWriter, 1000);
    }
    
    // プロジェクトフィルター
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // アクティブクラス切替
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          if (filterValue === 'all' || filterValue === cardCategory) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // スキルのプログレスバーアニメーション
    const progressBars = document.querySelectorAll('.progress');
    const animateProgressBars = () => {
      progressBars.forEach(progress => {
        const value = progress.style.width;
        progress.style.width = '0';
        setTimeout(() => {
          progress.style.width = value;
        }, 300);
      });
    };
    
    // Intersection Observer APIを使用して表示されたときにアニメーション実行
    if ('IntersectionObserver' in window) {
      const skillsSection = document.querySelector('.skills-section');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      if (skillsSection) {
        observer.observe(skillsSection);
      }
    } else {
      // IntersectionObserver非対応ブラウザ向けのフォールバック
      window.addEventListener('scroll', () => {
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
          const sectionTop = skillsSection.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (sectionTop < windowHeight * 0.8) {
            animateProgressBars();
            // このイベントリスナーを一度だけ実行するために削除
            window.removeEventListener('scroll', arguments.callee);
          }
        }
      });
    }
    
    // お問い合わせフォーム送信処理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());
        
        // ここに実際のフォーム送信処理を追加（サーバーサイドへの送信など）
        // 現在はコンソールログのみ
        console.log('フォーム送信データ:', formObject);
        
        // 送信成功時の処理（実際の実装では非同期処理の後に行う）
        alert('お問い合わせありがとうございます！メッセージが送信されました。');
        contactForm.reset();
      });
    }
    
    // トップに戻るボタン
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      // スクロール位置によってボタンの表示/非表示
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          backToTopBtn.style.opacity = '1';
          backToTopBtn.style.visibility = 'visible';
        } else {
          backToTopBtn.style.opacity = '0';
          backToTopBtn.style.visibility = 'hidden';
        }
      });
    }
  
    // プロジェクトカードのホバーエフェクト強化
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(image => {
      image.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = image.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const img = image.querySelector('img');
        if (img) {
          // 3Dのような傾き効果
          img.style.transform = `scale(1.1) translate(${(x - 0.5) * 10}px, ${(y - 0.5) * 10}px)`;
        }
      });
      
      image.addEventListener('mouseleave', () => {
        const img = image.querySelector('img');
        if (img) {
          img.style.transform = '';
        }
      });
    });
  }); 