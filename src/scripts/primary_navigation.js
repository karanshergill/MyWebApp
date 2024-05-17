
document.addEventListener("DOMContentLoaded", () => {
  let marker = document.querySelector("#marker");
  let items = document.querySelectorAll("nav ul li a");
  let nav = document.querySelector("#navbar-sticky");

  function indicator(link) {
    const rect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    marker.style.left = rect.left - navRect.left + "px";
    marker.style.width = rect.width + "px";
  }

  items.forEach((link) => {
    link.addEventListener("click", (e) => {
      indicator(e.target);
    });

    link.addEventListener("mouseover", (e) => {
      indicator(e.target);
    });

    link.addEventListener("mouseout", () => {
      const activeLink = document.querySelector("nav ul li a[aria-current='page']");
      if (activeLink) {
        indicator(activeLink);
      }
    });
  });

  // Initialize the marker position for the active link
  const activeLink = document.querySelector("nav ul li a[aria-current='page']");
  if (activeLink) {
    indicator(activeLink);
  }
});
