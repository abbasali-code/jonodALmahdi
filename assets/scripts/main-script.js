document.querySelectorAll(".links a").forEach(function (a) {
  a.addEventListener("click", function () {
    document.querySelector(".links").classList.remove("open");
  });
});

/* theme */

(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var icon = document.getElementById("themeIcon");

  function setTheme(theme) {
    if (theme === "light") {
      root.classList.add("light");
      icon.textContent = "🌙";
      localStorage.setItem("theme", "light");
    } else {
      root.classList.remove("light");
      icon.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    }
  }

  var savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme("dark");
  }

  function toggleTheme() {
    if (root.classList.contains("light")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  toggle.addEventListener("click", toggleTheme);
})();

/* reveal */

var io = new IntersectionObserver(
  function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 },
);

document.querySelectorAll(".reveal").forEach(function (e) {
  io.observe(e);
});

/* scroll */

(function () {
  var pr = document.querySelector(".prog");
  var fab = document.querySelector(".fab");
  var tk = 0;
  var jn = false;

  addEventListener(
    "scroll",
    function () {
      if (tk) return;

      tk = requestAnimationFrame(function () {
        tk = 0;

        var h = document.documentElement;

        pr.style.transform =
          "scaleX(" +
          h.scrollTop / (h.scrollHeight - h.clientHeight || 1) +
          ")";

        fab.classList.toggle("on", h.scrollTop > 600 && !jn);
      });
    },
    { passive: true },
  );

  new IntersectionObserver(function (e) {
    jn = e[0].isIntersecting;

    fab.classList.toggle("on", !jn && document.documentElement.scrollTop > 600);
  }).observe(document.getElementById("join"));

  var t = document.querySelector(".toast");

  document.getElementById("cp").addEventListener("click", function () {
    function ok() {
      t.classList.add("on");

      setTimeout(function () {
        t.classList.remove("on");
      }, 1800);
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText("@IR_Mahdi_110").then(ok, ok);
    } else {
      ok();
    }
  });

  var a = document.querySelector(".arch");

  if (a && matchMedia("(hover:hover) and (min-width:861px)").matches) {
    addEventListener(
      "pointermove",
      function (e) {
        var x = e.clientX / innerWidth - 0.5;
        var y = e.clientY / innerHeight - 0.5;

        a.style.transform =
          "perspective(900px) rotateY(" +
          x * 8 +
          "deg) rotateX(" +
          y * -6 +
          "deg)";
      },
      { passive: true },
    );
  }
})();
