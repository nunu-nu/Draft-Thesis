// built reaction to current scroll to TOC
let sectionTolerance = 150;
// let delayBeforeTOCupdate = 80;
let scrooooooling = false;
const IM_STILL_UPDATING_TIME_ = 800;
const smallDelayAfterClickOnTableOfContents = 20;
//  usage: await delay(5000);
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

    // console.log("Visible sections:", visibleSections); // Debug output

    // Now update the <p> tags inside the Table of Contents
    updateTOCClasses(visibleSections);
  }

  // Given an array of visible section indexes, update the <p> tags in #letterform-through-lexicon.
  function updateTOCClasses(visibleSections) {
    // Grab the Table of Contents element
    const tocSection = document.getElementById("letterform-through-lexicon");
    if (!tocSection) {
      console.warn("No element with id 'letterform-through-lexicon' found.");
      return;
    }

    // Get all <p> tags inside the Table of Contents
    const pTags = tocSection.querySelectorAll("p");

    // Loop through each <p> tag and update its class based on its index.
    pTags.forEach((p, index) => {
      // If the current index is in the visibleSections array, add the class.
      if (visibleSections.indexOf(index + 1) != -1) {
        p.classList.add("current-section");
      } else {
        p.classList.remove("current-section");
      }
    });
  }

  let scrollTimeout;

  document.addEventListener("scroll", function () {
    clearTimeout(scrollTimeout);
    if (!scrooooooling) updateTOC();
    // scrollTimeout = setTimeout(updateTOC, delayBeforeTOCupdate); // Update after 300ms of no scrolling
  });

  if (!scrooooooling) setInterval(updateTOC, 1000);

  updateTOC();
});

// build links to scroll
//

document.addEventListener("DOMContentLoaded", function () {
  // Function that sets up click handlers on TOC <p> tags
  function bindTOCLinks() {
    const tocSection = document.getElementById("letterform-through-lexicon");
    const pTags = tocSection.querySelectorAll("p");
    if (!tocSection) {
      console.warn("No element with id 'letterform-through-lexicon' found.");
      return;
    }

    // Get all <p> tags inside the TOC
    

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
          scrooooooling = true;
          sections[targetSectionIndex].scrollIntoView({ behavior: "smooth" });
          setTimeout(() => (scrooooooling = false), IM_STILL_UPDATING_TIME_);
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


// MOBILE TABLE OF CONTENTS
document.addEventListener("DOMContentLoaded", function () {
const tableOfContents = document.getElementById("letterform-through-lexicon");
const title = tableOfContents.querySelector("h2");
const paragraphs = tableOfContents.querySelectorAll("p");
const activeClass = "showTOC";

// Function to toggle the class on all <p> elements
function toggleParagraphs() {
  const isActive = [...paragraphs].some(p => p.classList.contains(activeClass));

  if (isActive) {
      // Remove class from all <p> elements
      paragraphs.forEach(p => p.classList.remove(activeClass));
  } else {
      // Add class to all <p> elements
      paragraphs.forEach(p => p.classList.add(activeClass));
  }
}

// Function to handle clicks outside the tableOfContents
function handleClickOutside(event) {
  // If the clicked target is NOT inside the tableOfContents and is not a <p>, remove the class
  if (!tableOfContents.contains(event.target) || event.target.tagName === "H2") {
      paragraphs.forEach(p => p.classList.remove(activeClass));
  }
}

// Attach event listener to the h2
title.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent the document event from immediately firing
  toggleParagraphs();
});

// Attach event listener to the document to detect clicks outside the tableOfContents
document.addEventListener("click", handleClickOutside);

    // Close menu on mobile after click

    let timeoutId; // Stores the timeout reference

    function removeClassAfterDelay() {
        // Clear any existing timeout before setting a new one
        clearTimeout(timeoutId);

        // Remove the class after 3 seconds (3000ms)
        timeoutId = setTimeout(() => {
            paragraphs.forEach(p => p.classList.remove(activeClass));
        }, smallDelayAfterClickOnTableOfContents);
    }

    // Click event for each <p> to start the delay
    paragraphs.forEach(p => {
        p.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent it from being removed immediately by document click
            removeClassAfterDelay();
        });
    });
})