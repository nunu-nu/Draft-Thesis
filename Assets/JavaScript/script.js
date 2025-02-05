// built reaction to current scroll to TOC
let sectionTolerance = 150;
document.addEventListener("DOMContentLoaded", function () {
  let visibleSections = []; // Array to store visible section indexes

  // Returns true if the element is visible in the viewport
  function isVisible(element) {
    let rect = element.getBoundingClientRect();
    let windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    // -50 here ensure enough tolerance to not show sections as visible when they aren't actually scrolled into
    return (
      rect.top + sectionTolerance < windowHeight &&
      rect.bottom - sectionTolerance > 0
    );
  }

  // Update the visibleSections array by checking each <section> element
  function updateTOC() {
    visibleSections = []; // Reset the array

    document.querySelectorAll("section").forEach((section, index) => {
      if (isVisible(section)) {
        visibleSections.push(index); // Add the index of the visible section
      }
    });

    console.log("Visible sections:", visibleSections); // Debug output

    // Now update the <p> tags inside the Table of Contents
    updateTOCClasses(visibleSections);
  }

  // Given an array of visible section indexes, update the <p> tags in #table-of-contents.
  function updateTOCClasses(visibleSections) {
    // Grab the Table of Contents element
    const tocSection = document.getElementById("table-of-contents");
    if (!tocSection) {
      console.warn("No element with id 'table-of-contents' found.");
      return;
    }

    // Get all <p> tags inside the Table of Contents
    const pTags = tocSection.querySelectorAll("p");

    // Loop through each <p> tag and update its class based on its index.
    pTags.forEach((p, index) => {
      // If the current index is in the visibleSections array, add the class.
      if (visibleSections.indexOf(index + 1) !== -1) {
        p.classList.add("current-section");
      } else {
        p.classList.remove("current-section");
      }
    });
  }

  // Run updateTOC on scroll and on page load.
  window.addEventListener("scroll", updateTOC);
  updateTOC();
});

// build links to scroll
//
document.addEventListener("DOMContentLoaded", function () {
  // Function that sets up click handlers on TOC <p> tags
  function bindTOCLinks() {
    const tocSection = document.getElementById("table-of-contents");
    if (!tocSection) {
      console.warn("No element with id 'table-of-contents' found.");
      return;
    }

    // Get all <p> tags inside the TOC
    const pTags = tocSection.querySelectorAll("p");

    // Bind a click event on each <p> tag
    pTags.forEach((p, index) => {
      p.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default action if any

        // Select all <section> elements on the page
        const sections = document.querySelectorAll("section");
        // Since the TOC is the first section, add 1 to the index to get the target section
        const targetSectionIndex = index + 1;

        if (sections[targetSectionIndex]) {
          // Scroll smoothly to the target section
          sections[targetSectionIndex].scrollIntoView({ behavior: "smooth" });
        } else {
          console.warn(
            "No corresponding section found for index",
            targetSectionIndex,
          );
        }
      });
    });
  }

  // Call the function on page load
  bindTOCLinks();
});

// Hide sidenotes when touching table of contents

// Hide sidenotes under TOC
/* function updateSidenotesPosition() {
  const toc = document.getElementById("table-of-contents");
  if (!toc) {
    console.warn("No element with ID 'table-of-contents' found.");
    return;
  }

  // Get the bottom position of the TOC relative to the viewport
  const rect = toc.getBoundingClientRect();
  const tocBottom = rect.bottom; // The bottom of the TOC

  // Get all elements with the class "sidenote"
  const sidenotes = document.querySelectorAll(".sidenote");

  // Loop through each sidenote
  sidenotes.forEach((sidenote) => {
    const sidenoteTop = sidenote.getBoundingClientRect().top;

    // If the sidenote is below the bottom of the TOC, add the class "under-toc"
    if (sidenoteTop - 50 > tocBottom) {
      sidenote.classList.remove("under-toc");
    } else {
      sidenote.classList.add("under-toc");
    }
  });
}

// Call the function on page load and on scroll to track changes
window.addEventListener("scroll", updateSidenotesPosition);
document.addEventListener("DOMContentLoaded", updateSidenotesPosition);
*/
