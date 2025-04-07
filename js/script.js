window.addEventListener("load", () => {
  // ---------------------------
  // 1. (옵션) IntersectionObserver 예시: section03 내부 요소 제어
  // ---------------------------
  const section03 = document.getElementById("section03");
  const screen = document.querySelector(".screen");
  const profile = document.querySelector(".profile");
  const light = document.querySelector(".light");
  const txtwrap = document.querySelectorAll(".txt-wrap");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          screen.classList.add("visible");
          profile.classList.add("visible");
          light.classList.add("visible");
          txtwrap.forEach((el) => el.classList.add("visible"));
        } else {
          screen.classList.remove("visible");
          profile.classList.remove("visible");
          light.classList.remove("visible");
          txtwrap.forEach((el) => el.classList.remove("visible"));
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(section03);

  gsap.registerPlugin(ScrollToPlugin);

  const sections = document.querySelectorAll(".item");
  let isScrolling = false;
  let currentSectionIndex = 0;

  // 스크롤하여 해당 섹션으로 즉시 이동하는 함수
  function scrollToSection(index) {
    // 인덱스가 범위 내에 있는지 체크
    if (index < 0 || index >= sections.length) return;

    isScrolling = true;
    gsap.to(window, {
      scrollTo: { y: sections[index], autoKill: false },
      duration: 0.3, // 즉시 이동 (0초)
      onComplete: () => {
        currentSectionIndex = index;
        isScrolling = false;
      },
    });
  }

  // 휠 이벤트를 감지하여 섹션 변경
  window.addEventListener(
    "wheel",
    (e) => {
      // 스크롤 중이면 이벤트 무시
      if (isScrolling) return;

      // 기본 휠 동작 방지
      e.preventDefault();

      if (e.deltaY > 0) {
        // 아래로 스크롤: 다음 섹션으로 이동
        scrollToSection(currentSectionIndex + 1);
      } else {
        // 위로 스크롤: 이전 섹션으로 이동
        scrollToSection(currentSectionIndex - 1);
      }
    },
    { passive: false }
  );

  // 만약 터치 스크롤도 지원하고 싶다면 별도의 터치 이벤트 핸들링 추가

  // .btn-wrap 제어용 ScrollTrigger (section02에 들어가면 활성화)
  ScrollTrigger.create({
    trigger: "#section02",
    start: "top center", // section02 상단이 뷰포트 중앙에 도달할 때
    markers: { startColor: "red", endColor: "red", fontSize: "12px" },
    onEnter: () => {
      console.log("Entering section02");
      document.querySelector(".btn-wrap").classList.add("active");
    },
    onLeaveBack: () => {
      console.log("Leaving section02");
      document.querySelector(".btn-wrap").classList.remove("active");
    },
  });
});
