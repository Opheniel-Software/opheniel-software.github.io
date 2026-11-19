'use strict';
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab, moveFocus = false) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  }
  if (moveFocus) tab.focus();
}
for (const tab of tabs) {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    const current = tabs.indexOf(tab);
    const positions = {ArrowRight: (current + 1) % tabs.length,
      ArrowLeft: (current - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1};
    if (Object.hasOwn(positions, event.key)) {
      event.preventDefault();
      selectTab(tabs[positions[event.key]], true);
    }
  });
}
