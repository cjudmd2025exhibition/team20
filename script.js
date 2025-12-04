// 부드러운 스크롤 - 모든 스크롤 동작에 적용
(function() {
  let ticking = false;
  
  function smoothScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // CSS scroll-behavior: smooth가 적용되도록 함
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // 스크롤 이벤트 리스너
  window.addEventListener('scroll', smoothScroll, { passive: true });
})();

// Mobile menu toggle & simple filter demo
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// (Optional) Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mobileMenu?.classList.add('hidden');
    }
  });
});

//어바웃내용
const scrollBtn = document.getElementById("scrollBtn");
if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// about5: 단일 오픈 + 라벨 네모 하이라이트 + 이미지/배경 동기화
(() => {
  const root   = document.querySelector("#about5");
  if (!root) return;

  const items  = [...root.querySelectorAll(".a5-acc__item")];
  const figure = root.querySelector(".about5__figure");
  const figImg = figure?.querySelector("img");

  function closeItem(item) {
    item.classList.remove("is-open");
    item.querySelector(".a5-acc__head")?.setAttribute("aria-expanded", "false");
    item.querySelector(".a5-acc__panel")?.setAttribute("hidden", "");
    item.querySelector(".a5-acc__label")?.classList.remove("is-active");
  }

  function openItem(item) {
    item.classList.add("is-open");
    item.querySelector(".a5-acc__head")?.setAttribute("aria-expanded", "true");
    item.querySelector(".a5-acc__panel")?.removeAttribute("hidden");
    item.querySelector(".a5-acc__label")?.classList.add("is-active");

    // 우측 카드 동기화
    const color = item.getAttribute("data-color");
    const img   = item.getAttribute("data-img");
    if (color) root.style.setProperty("--a5-accent", color);
    if (img && figImg) figImg.setAttribute("src", img);
  }

  // 초기 상태(첫 항목 오픈)
  items.forEach((it, i) => (i === 0 ? openItem(it) : closeItem(it)));

  // 클릭 이벤트 (단일 오픈)
  root.querySelectorAll("[data-acc]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".a5-acc__item");
      const isOpen = item.classList.contains("is-open");
      items.forEach(closeItem);
      if (!isOpen) openItem(item);
      else openItem(item); // 재클릭해도 열린 상태 유지
    });
  });
})();

//스크롤
document.addEventListener('DOMContentLoaded', () => {
    // 1. 스크롤 버튼 요소 가져오기
    const scrollBtn = document.getElementById('scrollBtn');
    
    // 2. 스크롤할 목표 섹션 요소 가져오기
    const targetSection = document.getElementById('aboutStart');

    // 3. 버튼에 클릭 이벤트 리스너 추가
    if (scrollBtn && targetSection) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 동작(a 태그라면 페이지 이동) 방지
            
            // 4. 목표 섹션으로 부드럽게 스크롤
            targetSection.scrollIntoView({
                behavior: 'smooth' // 부드럽게 스크롤하는 옵션
            });
        });
    }
});

//hero 스크롤
document.addEventListener('DOMContentLoaded', () => {
    // 1. 스크롤 버튼 요소 가져오기
    const scrollBtn = document.getElementById('scrollBtn');
    
    // 2. 스크롤할 목표 섹션 요소 가져오기
    const targetSection = document.getElementById('activitiesSection'); 

    // 3. 버튼에 클릭 이벤트 리스너 추가
    if (scrollBtn && targetSection) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            // 4. 목표 섹션으로 부드럽게 스크롤
            targetSection.scrollIntoView({
                behavior: 'smooth' // 부드럽게 스크롤하는 핵심 옵션
            });
        });
    }

    // (만약 다른 모바일 메뉴 토글 JS 코드가 있다면 여기에 함께 작성해주세요.)
});

//exp detail
  const tiles = document.querySelectorAll('.collage .tile');
  let topZ = 10;

  tiles.forEach(tile => {
    tile.addEventListener('mouseenter', () => {
      topZ++; // 호버할 때마다 z-index 갱신
      tile.style.zIndex = topZ;
      tile.style.transform = 'scale(1.05)'; // 살짝 앞으로
      tile.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      tile.style.boxShadow = '0 20px 40px rgba(0,0,0,0.25)';
    });
    tile.addEventListener('mouseleave', () => {
      tile.style.transform = 'scale(1)';
      tile.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
    });
  });

    // 본문 자동 높이 조절
  const bodyEl = document.querySelector('.exp01_editor-body');
  if (bodyEl) {
    const autoSize = () => { bodyEl.style.height='auto'; bodyEl.style.height = bodyEl.scrollHeight+'px'; };
    ['input','change'].forEach(e=>bodyEl.addEventListener(e, autoSize));
    autoSize();
  }

  // 임시저장 (로컬스토리지)
  const saveBtn = document.querySelector('.btn-outline');
  const tagEl   = document.querySelector('.exp01_editor-tags');
  if (saveBtn) saveBtn.addEventListener('click', () => {
    localStorage.setItem('draft_body', bodyEl.value);
    localStorage.setItem('draft_tags', tagEl.value);
    alert('임시저장 완료!');
  });
  // 로드
  if (bodyEl) {
    bodyEl.value = localStorage.getItem('draft_body') || '';
    bodyEl.dispatchEvent(new Event('input'));
  }
  if (tagEl) {
    tagEl.value = localStorage.getItem('draft_tags') || '';
  }

// Guide 페이지 스크롤 애니메이션 - 간단 버전
function initGuideAnimation() {
  console.log('Guide 애니메이션 초기화');
  
  const stepVisuals = document.querySelectorAll('.step-visual');
  console.log('step-visual 요소 개수:', stepVisuals.length);
  
  if (stepVisuals.length === 0) {
    console.log('step-visual 요소가 없습니다');
    return;
  }

  // 스크롤 이벤트 함수
  function handleScroll() {
    stepVisuals.forEach((visual, index) => {
      if (!visual.classList.contains('animate')) {
        const rect = visual.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // 요소가 화면에 80% 보이면 애니메이션 시작
        if (rect.top < windowHeight * 0.8) {
          console.log(`step-visual ${index} 애니메이션 시작`);
          visual.classList.add('animate');
        }
      }
    });
  }

  // 스크롤 이벤트 등록
  window.addEventListener('scroll', handleScroll);
  
  // 페이지 로드 시 즉시 체크
  setTimeout(handleScroll, 100);
}

// DOM 로드 완료 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGuideAnimation);
} else {
  initGuideAnimation();
}

// Experience 페이지 검색 기능
function initExperienceSearch() {
  const searchInput = document.querySelector('.experience-search');
  const experienceCards = document.querySelectorAll('.experience-card');
  const noResults = document.querySelector('.no-results');
  
  if (!searchInput || experienceCards.length === 0) return;
  
  function filterCards() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;
    
    experienceCards.forEach(card => {
      const cardText = card.textContent.toLowerCase();
      const isVisible = searchTerm === '' || cardText.includes(searchTerm);
      
      card.style.display = isVisible ? 'grid' : 'none';
      if (isVisible) visibleCount++;
    });
    
    // 검색 결과가 없을 때 메시지 표시
    if (noResults) {
      if (searchTerm !== '' && visibleCount === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    }
  }
  
  // 엔터키로 검색
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      filterCards();
    }
  });
  
  // 화살표 버튼으로 검색 실행
  const searchArrow = document.querySelector('.search-arrow');
  if (searchArrow) {
    searchArrow.addEventListener('click', filterCards);
  }
}

// Experience 페이지 검색 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExperienceSearch);
} else {
  initExperienceSearch();
}

  