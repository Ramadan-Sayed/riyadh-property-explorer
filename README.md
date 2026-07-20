# GIS Dashboard Static UI - Riyadh Property Explorer (Weeks 1-3)

This repository tracks my daily progress during my intensive 6-month technical roadmap to become a Job-Ready Web GIS Developer.

## 🛠️ What I Accomplished So Far (Weeks 1-2):
* **Semantic HTML5 & Responsive UI/UX:** Built a clean, structured layout with interactive sidebar controls, reactive property feature cards, and fluid grid layouts optimized for map rendering.
* **JavaScript & DOM Architecture:** Implemented dynamic active-state class switching across the dashboard tabs using strict event-driven mechanisms.
* **Land Area Calculator:** Engineered a production-grade functional core (`calculateLandArea`) with robust form input validation and dynamic floating-point calculations.

---

### 🏁 Phase 1: Core Layout & Baseline GIS UI (Weeks 1-4)
- [x] **Week 1:** Layout Engineering, Teal Spectrum Visual Identity & Grid Refactoring.
- [x] **Week 2:** JavaScript Fundamentals, DOM Integration & Computational Logic.
- [ ] **Week 3:** Advanced JS (+ES6), Asynchronous Fetch, and Live GeoJSON Integration.
- [ ] **Week 4:** Coordinate Converter UI Construction & Geometry Logic.

---

### 📅 Phase 1 - Week 3: Advanced JavaScript & GeoJSON Integration (5-Day Plan)
- [x] **Day 1:** Mastery of ES6+ syntax enhancements and modular JavaScript architecture (ES Modules).
- [x] **Day 2:** Deep dive into JSON formatting structures and core Geospatial GeoJSON specifications.
- [ ] **Day 3:** Asynchronous Programming core concepts, Event Loops, Promises, and Async/Await paradigms.
- [ ] **Day 4:** Feature Engineering: Deploying Fetch API to ingest external spatial data streams dynamically.
- [ ] **Day 5:** Dynamic UI Binding: Linking fetched GeoJSON attributes directly to the interactive viewport.

### 📂 Week 3: Dynamic Data Ingestion & Modular Architecture

#### **Day 1: ES Modules & Architectural Separation**
* Refactoring the monolithic `app.js` into decoupled, specialized logical modules using import/export statements.

#### **Day 2: GeoJSON Schemas & Data Structures**
* **Core Learning & Methodology:** Mastered the **RFC 7946** geospatial data standard, focusing on feature structure distinction between 2D vector geometry types (`Point` vs `Polygon`) and attribute mapping via the `properties` object.
* **Practical Application:** Designed an external spatial dataset (`data/riyadh-properties.geojson`) featuring real-world North Riyadh property coordinates:
  * `Point`: Representing high-rise residential properties (e.g., Rafal Tower in Al-Sahafa).
  * `Polygon`: Defining boundary boundaries for commercial land plots (e.g., Al-Yasmin District plot).

#### **Day 3: Async Engine Bootstrapping**
* Transitioning logic components from blocking synchronous flows into clean, structured asynchronous operations utilizing Promises.

#### **Day 4: Fetch API & Spatial Resource Consumption**
* Implementing dynamic AJAX network requests to programmatically read and validate external GeoJSON configuration vectors during app runtime.

#### **Day 5: Viewport Integration & Structural Sync**
* Generating dynamic HTML elements on-the-fly based on parsed GeoJSON feature collections, successfully linking backend geospatial properties directly to the layout view.