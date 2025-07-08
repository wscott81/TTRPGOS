
# 🎲 TTRPG OS Roadmap

## Phase 1 — Core System Foundation
- [x] Basic Debian-based OS or Debian VM base
- [x] React Frontend project scaffolded
- [x] Node.js + Express Backend
- [x] SQLite DB integration
- [ ] Basic GM & Player Account system (auth, registration, bcrypt hashed passwords)
- [ ] JWT-based Session tokens
- [ ] OAuth support (Twitch, Discord, Google)

## Phase 2 — Core UI/UX Framework
- [ ] GM / Player Login Screen
- [ ] GM Dashboard
- [ ] Player Dashboard
- [ ] Map View for Players and GM
- [ ] Responsive UI / UX design
- [ ] Theme customization (Dark mode, fantasy themes, sci-fi themes, etc.)
- [ ] Streamer Mode UI (toggle option)

## Phase 3 — Game Management Features
- [ ] Character Sheet Editor
- [ ] Campaign and Session Manager
- [ ] Dice Roller UI
- [ ] Handouts / Documents / Shared Media
- [ ] Turn Tracker

## Phase 4 — Map & Combat Features
- [ ] Map Editor (upload background images, grid support)
- [ ] Token placement system (drag and drop)
- [ ] Real-time syncing of maps and tokens across clients
- [ ] NFC Amiibo-like token support (NFC chips + printable bases)
- [ ] NFC Reader integration (scan tokens to auto-load characters or monsters)
- [ ] Mobile app NFC integration (Android / iOS app to read/write NFC tags)

## Phase 5 — Security / Privacy Features
- [ ] End-to-end encryption for sensitive player data
- [ ] Secure cloud instance deployments (supporting AWS, Azure, Google Cloud, etc.)
- [ ] Streamer-friendly data masking (obscure hidden GM info)
- [ ] Regular database backups
- [ ] Role-based access control (GM vs. player)

## Phase 6 — Media & Streaming Support
- [ ] Streamer Mode (dedicated screen-friendly view)
- [ ] OBS / Xsplit Plugins or Extensions:
  - [ ] Scene overlays with live map
  - [ ] Character stat boxes
  - [ ] Initiative tracker overlay
- [ ] Twitch Extension integration
- [ ] Viewer Map Mode: stream viewers can see real-time public map view

## Phase 7 — Multi-Platform Support
- [ ] Android / iOS companion app
  - [ ] Player sheet editing
  - [ ] NFC token management
  - [ ] Session join & chat
- [ ] Web app (hosted version on cloud or personal server)
- [ ] Electron app for Windows / Mac / Linux (standalone app version)
- [ ] Live CD / USB image builder (for "arcade-style" setups or convention booths)
- [ ] Proxmox-ready VM image export

## Phase 8 — Community & Modding Support
- [ ] Modular Plugin System (allow 3rd party extensions)
- [ ] Marketplace for Maps, Tokens, Modules, NPCs
- [ ] Custom Rule Support (non-D&D systems: e.g. Pathfinder, Starfinder, Shadowrun)
- [ ] Multi-language support

## Phase 9 — Commercialization & Packaging
- [ ] Cloud deployment automation (instance-per-user model)
- [ ] One-click cloud instance launcher
- [ ] Billing / Licensing system for paid cloud hosting version
- [ ] Official documentation site & wiki
- [ ] Streamlined installer for local use
- [ ] App Store deployment (Google Play, iOS App Store, Windows Store, Mac App Store)

---

**Notes:**
- Some phases will run in parallel (ex: Phase 5 Security can be layered in while working on Phase 3/4).
- Iterative development approach is recommended.
