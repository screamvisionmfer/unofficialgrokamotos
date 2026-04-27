Unofficial Grokamotos mobile/layout fix

Changed:
- Enabled real vertical scrolling on phones/tablets.
- Removed mobile overflow locks from game shell/frame/tab content.
- Normalized mobile button/control sizes across top tabs, main routes, gallery, wallet, contacts, modals.
- Reworked mobile layouts into single-column responsive panels.
- Fixed missing Eagle font reference to an existing bundled font.
- Fixed broken boot menu arrow text encoding.
- Fixed main MINT route to open the gallery tab instead of pointing at a hidden anchor only.
- Kept collection count as 2026 in the hero.

Check:
- TSX syntax/type sanity checked with temporary Next module stubs.
- Full next build was not run in this sandbox because dependency install timed out.
