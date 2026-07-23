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
- [x] **Week 3:** Advanced JS (+ES6), Asynchronous Fetch, and Live GeoJSON Integration.
- [ ] **Week 4:** Coordinate Converter UI Construction & Geometry Logic.

---

### 📅 Phase 1 - Week 3: Advanced JavaScript & GeoJSON Integration (5-Day Plan)
- [x] **Day 1:** Mastery of ES6+ syntax enhancements and modular JavaScript architecture (ES Modules).
- [x] **Day 2:** Deep dive into JSON formatting structures and core Geospatial GeoJSON specifications.
- [x] **Day 3:** Asynchronous Programming core concepts, Event Loops, Promises, and Async/Await paradigms.
- [x] **Day 4:** Feature Engineering: Deploying Fetch API to ingest external spatial data streams dynamically.
- [x] **Day 5:** Dynamic UI Binding & Spatial Utility Helpers (Coordinate Converter Setup).


### 📂 Week 3: Dynamic Data Ingestion & Modular Architecture

#### **Day 1: ES Modules & Architectural Separation**
* Refactoring the monolithic `app.js` into decoupled, specialized logical modules using import/export statements.

#### **Day 2: GeoJSON Schemas & Data Structures**
* **Core Learning & Methodology:** Mastered the **RFC 7946** geospatial data standard, focusing on feature structure distinction between 2D vector geometry types (`Point` vs `Polygon`) and attribute mapping via the `properties` object.
* **Practical Application:** Designed an external spatial dataset (`data/riyadh-properties.geojson`) featuring real-world North Riyadh property coordinates:
  * `Point`: Representing high-rise residential properties (e.g., Rafal Tower in Al-Sahafa).
  * `Polygon`: Defining boundary boundaries for commercial land plots (e.g., Al-Yasmin District plot).

#### **Day 3: Async Engine Bootstrapping & Fetch Service**
* **Core Learning & Methodology:** Mastered non-blocking asynchronous JavaScript workflows, utilizing Promises and modern `async/await` syntax to keep the application responsive during network data ingestion.
* **Practical Application:** Constructed a specialized data fetching module (`dataService.js`) with integrated defensive error management (`try/catch` & HTTP status validation) to asynchronously request local GeoJSON resources.

#### **Day 4: GeoJSON Viewer Core & Dynamic Layer Binding**
* **Core Learning & Methodology:** Studied programmatic GIS rendering engines and vector layer mapping, binding external spatial streams asynchronously to Leaflet viewport instances.
* **Practical Application:** Completed the baseline **GeoJSON Viewer** core within `app.js`. Connected the async `dataService` pipeline to render both points and polygons dynamically with custom interactive HTML popups displaying real-time property attributes (`name`, `price`, and `district`).

#### **Day 5: Coordinate Converter Setup & Spatial Helpers**
* **Core Learning & Methodology:** Studied geospatial point formats, specifically standardizing raw floating-point coordinates into **Well-Known Text (WKT)** structures utilized in spatial database engines (e.g. PostGIS).
* **Practical Application:** Built `geoHelpers.js` utility module providing precision rounding and dual-format coordinate object output (`WKT` & Array) to prepare underlying logic for Week 4's Coordinate Converter tool.