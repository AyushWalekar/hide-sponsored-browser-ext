console.debug("Google Search - Hide Sponsered: Content script loaded");

let lastClicked = 0;
const CLICK_COOLDOWN = 1000; // 1 second cooldown

function checkAndClick() {
  chrome.storage.sync.get(
    ["selector", "text"],
    (items: { [key: string]: any }) => {
      const selector = items.selector || "span";
      const text = (items.text || "Hide sponsored result").toLowerCase();

      const elements = Array.from(document.querySelectorAll(selector));
      const targetElement = elements.find((el) => {
        if (text) {
          const combined = `${(el as HTMLElement).innerText} ${
            (el as HTMLElement).getAttribute("aria-label") || ""
          }`.toLowerCase();
          return combined.includes(text);
        }
        return true;
      });

      if (targetElement) {
        const now = Date.now();
        if (now - lastClicked > CLICK_COOLDOWN) {
          console.debug(
            `Google Search - Hide Sponsered: Found element matching "${selector}" and "${text}", clicking...`
          );
          (targetElement as HTMLElement).click();
          lastClicked = now;
        }
      }
    }
  );
}

// Initial check
checkAndClick();

// Observe DOM changes
const observer = new MutationObserver(() => {
  // Debounce or just check? Google search updates a lot.
  // Let's just check.
  checkAndClick();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
