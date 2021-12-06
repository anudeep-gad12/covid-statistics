class Nav {
  _parentElement = document.querySelector(".nav");

  renderHover() {
    // console.log(this._parentElement);
    this._parentElement.addEventListener("mouseover", function (e) {
      const navLinkList = Array.from(
        document.querySelectorAll(".nav_menuList--listItems")
      );
      navLinkList.forEach((navLink) => {
        navLink.classList.remove("listItem--active");
      });
      //   console.log(navLinkList);
      if (e.target.className === "listItems-link") {
        e.target
          .closest(".nav_menuList--listItems")
          .classList.add("listItem--active");
      }
    });
  }

  renderSmoothScroll() {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.className === "listItems-link") {
        const moveTo = document.querySelector(
          `${e.target.getAttribute("href")}`
        );
        console.log(e.target.href);
        moveTo.scrollIntoView({
          behavior: "smooth",
        });
      }
      const moveToMoreStats = document.querySelector(".main_stats--more");
      moveToMoreStats.addEventListener("click", function (e) {
        e.preventDefault();
        const sectionId = moveToMoreStats.getAttribute("href");
        const element = document.querySelector(sectionId);
        // console.log(element);
        element.scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }
  renderStickyNav() {
    const nav = this._parentElement;
    const main = document.querySelector(".main");
    const container = document.querySelector(".container");
    // const table = document.querySelector("#table--section");
    const stickyNav = function (entries) {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        nav.classList.add("sticky");
        main.classList.add("move");
        // console.log("sticked");
      } else {
        // console.log("removed");
        main.classList.remove("move");
        nav.classList.remove("sticky");
      }
    };
    const navObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0.9,
      rootMargin: "10px",
    });
    navObserver.observe(main);
  }
}

export default new Nav();
