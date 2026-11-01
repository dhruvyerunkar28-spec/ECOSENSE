ECOSENSE WEBSITE — QUICK START

FASTEST WAY TO RUN (Windows)
1. Extract this folder.
2. Open the folder in File Explorer.
3. Double-click index.html.
   This opens the website in your browser.

RECOMMENDED LOCAL SERVER (if Python is installed)
1. Open this folder in VS Code.
2. Open Terminal > New Terminal.
3. Run:
   py -m http.server 5500
4. Open:
   http://localhost:5500

TO PUT IT ONLINE QUICKLY
1. Open https://app.netlify.com/drop
2. Sign in if asked.
3. Drag the extracted EcoSense-Website folder onto the page.
4. Wait for deployment and open the generated public URL.

IMPORTANT PROJECT NOTES
- This is a static front-end website based on your Stitch HTML export.
- It includes responsive mobile navigation, a responsive layout, section navigation,
  and interactive seasonal stage selection.
- Sensor readings shown in the supplied Stitch design are presentation/demo values.
  They are NOT verified live hardware readings. To make telemetry genuinely live,
  connect your sensor/API endpoint and replace the sample values with API data.
- The page uses Tailwind CDN and Google Fonts, so an internet connection is needed
  for those external resources to load correctly.
- No backend is required to preview or host this static front end.
