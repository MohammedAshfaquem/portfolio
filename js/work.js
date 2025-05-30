  window.addEventListener("load", () => {
    const carousel = document.getElementById("work-carousel");
    const items = carousel.querySelectorAll(".work-item");

    // Initially focus the first item
    items.forEach(item => item.classList.remove("focused"));
    if (items[0]) items[0].classList.add("focused");

    function updateFocus() {
      const carouselRect = carousel.getBoundingClientRect();
      const center = carouselRect.left + carouselRect.width / 2;

      let closestItem = null;
      let minDistance = Infinity;

      items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(center - itemCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestItem = item;
        }
      });

      items.forEach(item => item.classList.remove("focused"));
      if (closestItem) closestItem.classList.add("focused");
    }

    // Run once on load
    updateFocus();

    // Update on scroll
    carousel.addEventListener("scroll", () => {
      requestAnimationFrame(updateFocus);
    });
  });
  


