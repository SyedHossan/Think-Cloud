# Think Cloud (Browser Demo)

Think Cloud is an all-in-browser prototype for exploring and posting student “thought clouds” on a shared map. Everything runs client-side (HTML/CSS/JS/LocalStorage); no backend or install is required.

Link to Youtube Video: https://youtu.be/3Fi9FAPSWZI


## How to run
- Open `index.html` (or any page) in a modern browser, or start a simple static server (e.g., `python -m http.server`) and visit the page.
- Data persists in your browser’s LocalStorage; refreshes keep your demo accounts, connections, messages, 
and pins.


## Accounts & profiles
- Sign up or log in through the unified auth screens (shared layout, colors, input styles, and primary actions).
- Demo + created accounts are persisted; profiles are editable (name, school, major, bio, status, location) and you can toggle visibility for sensitive info.
- Profile, pins, and conversations are linked so connections and threads appear from both users’ points of view.


## Map & posting
- On load, the map requests browser geolocation with robust timeouts; if blocked or unavailable, it falls back to the active user’s campus (or UTD default) and always dismisses the “Finding your location…” overlay.
- A per-user posting radius guards against out-of-area posts; attempts outside the allowed area are blocked with clear, actionable errors.
- “Drop a Thought” pre-places a pin at your current/home location, tells you it can be dragged, and keeps the coordinates text in sync while you move it.
- Cloud markers are unified, color-coded by status with a visible legend; clustering and spacing make pins easier to tap, and place names replace raw lat/lng (e.g., “near UTD – Richardson, Texas”).
- World map is populated with seeded pins around UTD, Sydney, Singapore, Madrid, Monterrey, and more to keep the map feeling alive.
- Navigation helpers: Recenter returns to the initial view, and the Back escape avoids overlapping Leaflet controls.


## Messaging & connections
- “Message only connected users” is enforced on map and explore; pending requests on Explore can be accepted/declined, and once connected you can message directly there. Threads stay symmetric between both users.
- Connections can be removed; comments you own can be edited or deleted; supported messages can be deleted where applicable.


## Feedback & guidance
- Improved loading states for map and messaging plus toasts for posting clouds, sending messages, and changing filters make status obvious.
- Map guidance is larger/higher contrast so dropping clouds is discoverable; tooltips and short help explain icons, navigation, and how thought clouds work.
- Visual consistency: aligned button styles, gradients, and popups across Explore, Map, Connections, Messages, and Profile; denser layouts were simplified for clarity and smoother transitions.


## Demo data
- Diverse demo users across multiple countries, majors, and schools with hard-coded home locations; pins, profiles, and conversations are wired to reflect an international student community.


## Prototype boundaries
- Everything is front-end only; there is no real authentication or backend database.
- Likes, comments, messages, and pins persist only in the current browser; there is no multi-user real-time sync.


## Test Login Credentials


      email: "anya.patel@example.com"
      password: "anya123"

      email: "li.wei@example.sg"
      password: "liwei123"

      email: "lucia.garcia@example.es"
      password: "lucia123"

      email: "oliver.king@example.au"
      password: "oliver123"

      email: "sofia.ramirez@example.mx"
      password: "sofia123"
    