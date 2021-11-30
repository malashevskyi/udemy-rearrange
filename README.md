Chrome extension for udemy rearrange. Disable 'Course content' component and move 'Overview, Q&A, Notes, Announcements'

### Extension

I didn't publish it in chrome store, if you think it is useful you can use it locally

- download and go to [chrome://extensions/](chrome://extensions/) and press `Load unpacked` to load your extension

### Why:

I not often use `Course content` block on udemy because usually I watch courses from the start to the end. Instead of I pretty often use `Notes` and `Q&F` tabs. It is very inconvenient to scroll video every time to find some question or a note. Especially if you have hundreds of notes and you need to scroll, click and scroll again to watch.

If you use some webpages very often and you don't like something, you can delete, move, change `font-size`, delete advertising block and so on.

Also you can set some changes without clicking an extension button. Just put your code in content.js without event function ~~chrome.runtime.onMessage.addListener(() => {})~~

### Usage on other webpages

Just change url in `manifest.json` and change styles, js logic in content.js

```json
  "content_scripts": [
    {
      "matches": ["https://www.udemy.com/*/*"],
      "js": ["content.js"]
    }
  ],
```
