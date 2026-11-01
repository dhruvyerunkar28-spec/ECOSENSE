ECOSENSE - LIVE MONITORING REPAIR

RUN ON WINDOWS
1. Extract the complete EcoSense-live-site folder.
2. Open that folder in VS Code or PowerShell.
3. Run: npm install
4. Run: npm run dev
5. Open the localhost URL printed by Vite (usually http://localhost:5173).

WHAT WAS FIXED
- Restored the full EcoSense dashboard as the Vite home page.
- Replaced the remote logo dependency with images/ecosense-logo.svg, stored locally.
- Connected the monitoring cards to Open-Meteo current weather and air-quality endpoints.
- Added a manual Refresh now control and automatic refresh every 10 minutes.
- Added a visible feed status / last-updated time and an error message if the feed is unavailable.
- Clearly labels the data as public API/model estimates, not readings from physical IoT sensors.
- Water pH/turbidity/dissolved oxygen remain prototype-only because no water-quality sensor/API is connected.

DATA SOURCE / LIMITATIONS
Weather and air-quality readings are regional API estimates for 19.3919 N, 72.8397 E.
They are not measurements from installed local hardware. A real sensor gateway/API is needed
for true on-site live monitoring. An internet connection is required for the Open-Meteo feed,
Google Fonts, and Tailwind CDN styling.
