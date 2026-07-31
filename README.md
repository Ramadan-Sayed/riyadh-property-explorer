# GIS Dashboard Static UI - Riyadh Property Explorer (Weeks 1-4)

This repository contains the source code and development milestone documentation for the Riyadh Property Explorer—a high-performance, interactive Web GIS platform engineered for spatial data analysis and property mapping.

## 🛠️ What I Accomplished So Far (Weeks 1-4):
* **Semantic HTML5 & Responsive UI/UX:** Built a clean, structured layout with interactive sidebar controls, reactive property feature cards, and fluid grid layouts optimized for map rendering.
* **JavaScript & DOM Architecture:** Implemented dynamic active-state class switching across the dashboard tabs using strict event-driven mechanisms.
* **Land Area Calculator:** Engineered a production-grade functional core (`calculateLandArea`) with robust form input validation and dynamic floating-point calculations.
* **GeoJSON Ingestion & Map Interactions:** Asynchronously integrated external GeoJSON features and created global spatial utilities (`mapUtils`) for dynamic map transitions (`flyTo`) and converted point markers.
* **TypeScript Migration & Coordinate Converter:** Migrated core modules to TypeScript, created strong OOP services (`CoordinateService`), and delivered a fully interactive WGS84 to UTM Coordinate Converter with Clipboard support.

---

### 📊 Phase 1 Progress Track (Weeks 1-7)
- [x] **Week 1:** Layout Engineering, Teal Spectrum Visual Identity & Grid Refactoring (Completed ✅).
- [x] **Week 2:** JavaScript Fundamentals, DOM Integration & Computational Logic (Completed ✅).
- [x] **Week 3:** Async Fetch, GeoJSON Ingestion & WKT Conversion Helpers (Completed ✅).
- [x] **Week 4:** TypeScript Coordinate Converter — Strong Typing, UTM Projections & Interactive Map Integration (Completed ✅).
- [ ] **Week 5:** Layer Manager & TypeScript Migration — Interfaces, Types, Enums & Survey Station Card (Upcoming ⏳).
- [ ] **Weeks 6–7:** Spatial Search — Search Filters & UI Spatial Data Querying (Upcoming ⏳).

---

### 📅 Phase 1 - Week 3: Advanced JavaScript & GeoJSON Integration (5-Day Plan)
- [x] **Day 1:** Mastery of ES6+ syntax enhancements and modular JavaScript architecture (ES Modules).
- [x] **Day 2:** Deep dive into JSON formatting structures and core Geospatial GeoJSON specifications.
- [x] **Day 3:** Asynchronous Programming core concepts, Event Loops, Promises, and Async/Await paradigms.
- [x] **Day 4:** Feature Engineering: Deploying Fetch API to ingest external spatial data streams dynamically.
- [x] **Day 5:** Dynamic UI Binding & Spatial Utility Helpers (Coordinate Converter Setup).


### 📅 Phase 1 - Week 4: TypeScript Migration & Interactive GIS Tools
- [x] **Day 1:** TypeScript Bootstrapping & Core GIS Interfaces / Models Setup.
- [x] **Day 2:** Coordinate Transformation Service (`WGS84` to `UTM Zone 38N`) & Riyadh Bounds Validation.
- [x] **Day 3:** Encapsulated UI Component Architecture (`ConverterUIComponent`).
- [x] **Day 4:** GIS Map Integration (`flyToLocation` & Leaflet Marker Ingestion).
- [x] **Day 5:** Result Clipboard Integration (`copyResult`) & End-to-End Application Wiring.


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


### 📂 Week 4: TypeScript Refactoring & Coordinate Tool Engineering

#### **Day 1: TypeScript Bootstrapping & Domain Modeling**
* **Core Learning & Methodology:** Mastered TypeScript foundational concepts, including strict type definitions, interfaces, type aliases, and project compilation settings (`tsconfig.json`) to enforce type safety across GIS modules.
* **Practical Application:** Established core data structures and interfaces (`ICoordinate`, `IUTMResult`) to define precise schemas for spatial coordinates and geographic projection outputs.

#### **Day 2: Spatial Transformation Core & Validation Service**
* **Core Learning & Methodology:** Applied Object-Oriented Programming (OOP) design patterns in TypeScript to encapsulate mathematical logic and geospatial validation rules.
* **Practical Application:** Engineered `CoordinateService.ts` providing two main spatial functions:
  * Checking latitude/longitude input against predefined bounding box parameters for Riyadh city.
  * Projecting WGS84 decimal degrees into UTM Zone 38N formatted coordinate strings.

#### **Day 3: Encapsulated UI Component Architecture**
* **Core Learning & Methodology:** Studied component-driven design principles for client-side applications, separating visual DOM handlers from underlying business logic services.
* **Practical Application:** Developed `ConverterUIComponent.ts` to manage input extraction, trigger spatial conversions via `CoordinateService`, and display structured UTM output dynamically while handling invalid input states cleanly.

#### **Day 4: Geospatial Map Integration & Viewport Navigation**
* **Core Learning & Methodology:** Explored programmatic map viewport manipulation and global window object integration for Leaflet mapping instances.
* **Practical Application:** Expanded `mapUtils.js` with global utility functions:
  * `flyToLocation`: Executes smooth camera pan and zoom animations directly to target coordinates.
  * `addConvertedPointMarker`: Generates interactive map markers with rich HTML popups displaying calculated UTM metrics.

#### **Day 5: Async Clipboard Utility & End-to-End System Wiring**
* **Core Learning & Methodology:** Mastered asynchronous browser web APIs, specifically modern Clipboard interaction primitives (`navigator.clipboard.writeText`) alongside defensive event binding.
* **Practical Application:** Integrated one-click coordinate copy functionality (`copyResult`) within the converter UI, connected DOM triggers to interactive map updates, and finalized TypeScript compilation for production readiness.