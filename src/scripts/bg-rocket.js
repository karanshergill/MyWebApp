      document.addEventListener("mousemove", function (e) {
        var rocket = document.querySelector(".rocket");
        rocket.style.left = e.clientX + "px";
        rocket.style.top = e.clientY + "px";
      });

      document.addEventListener("mousedown", function () {
        document.querySelector(".scene").classList.add("active");
      });

      document.addEventListener("mouseup", function () {
        document.querySelector(".scene").classList.remove("active");
      });