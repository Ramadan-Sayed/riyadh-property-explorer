# 🗺️ Riyadh Property Explorer — Web GIS Dashboard

> 🔄 **Current Active Branch / Feature:** `feature/spatial-search` (Sprint 5 / Weeks 6–7)  
> 📌 **Development Roadmap:** Phase 1 — Interactive Mapping & Spatial Search Engine Architecture

> ⚡ **Latest Milestone:** Week 7 (Day 6) — Map Spatial Synchronization & Dynamic Leaflet Layer Highlighting

This repository contains the source code and development milestone documentation for the Riyadh Property Explorer—a high-performance, interactive Web GIS platform engineered for spatial data analysis and property mapping.

## 🛠️ What I Accomplished So Far (Weeks 1-5):
* **Semantic HTML5 & Responsive UI/UX:** Built a clean, structured layout with interactive sidebar controls, reactive property feature cards, and fluid grid layouts optimized for map rendering.
* **JavaScript & DOM Architecture:** Implemented dynamic active-state class switching across the dashboard tabs using strict event-driven mechanisms.
* **Land Area Calculator:** Engineered a production-grade functional core (`calculateLandArea`) with robust form input validation and dynamic floating-point calculations.
* **GeoJSON Ingestion & Map Interactions:** Asynchronously integrated external GeoJSON features and created global spatial utilities (`mapUtils`) for dynamic map transitions (`flyTo`) and converted point markers.
* **TypeScript Migration & Coordinate Converter:** Migrated core modules to TypeScript, created strong OOP services (`CoordinateService`), and delivered a fully interactive WGS84 to UTM Coordinate Converter with Clipboard support.
* **Layer Management Engine & Survey Stations:** Built an extensible `LayerService` using TypeScript classes, interfaces, and generic Leaflet helpers. Rendered 35 interactive survey stations across Riyadh districts with dynamic sidebar cards and live map marker toggling.

---

### 📊 Phase 1 Progress Track (Weeks 1–7)
- [x] **Week 1:** Layout Engineering, Teal Spectrum Visual Identity & Grid Refactoring (Completed ✅).
- [x] **Week 2:** JavaScript Fundamentals, DOM Integration & Computational Logic (Completed ✅).
- [x] **Week 3:** Async Fetch, GeoJSON Ingestion & WKT Conversion Helpers (Completed ✅).
- [x] **Week 4:** TypeScript Coordinate Converter — Strong Typing, UTM Projections & Interactive Map Integration (Completed ✅).
- [x] **Week 5:** Layer Manager & Advanced TypeScript Architecture — Interfaces, Types, Enums, 35 Survey Stations & Dynamic Map Markers (Completed ✅).
- [x] **Week 6:** Spatial Search Engine Architecture & UI Foundations — Interfaces, Services, Multi-Attribute Filtering & Range Helpers (Completed ✅).
- [ ] **Week 7:** Map Spatial Synchronization & Final Project Integration — Dynamic Highlighting, Auto Bounds & Final Release (In Progress ⏳).

---

### 📅 Phase 1 - Week 6: Spatial Search Engine Architecture & UI Foundations
- [x] **Day 1:** Spatial Search Interfaces, Query Enums & Criteria Models Setup (`src/types/search.ts`).
- [x] **Day 2:** Spatial Filtering Engine Core Implementation (`SpatialSearchService.ts`).
- [x] **Day 3:** Search Panel Component & Responsive Form Control Markup (`src/components/SearchPanel.ts`).
- [x] **Day 4:** Live Text & Multi-Criteria Attribute Filtering Binding (District Name, Property Type) (`app.js`).
- [x] **Day 5:** Spatial Bounding Box & Area Range Query Calculation Helpers (`src/utils/spatial-helpers.ts`).

### 📅 Phase 1 - Week 7: Map Spatial Synchronization & Final Project Integration
- [x] **Day 6:** Spatial Highlight Layer & Dynamic Leaflet Marker Filtering (`mapUtils.ts`).
- [x] **Day 7:** Auto Viewport Transition & Extent Fitting (`map.fitBounds`) on Filter Results.
- [ ] **Day 8:** Reactive UI State Management & Dynamic Spatial Results Summary Counter.
- [ ] **Day 9:** End-to-End Search Performance Optimization & Defensive Error Handling.
- [ ] **Day 10:** Final Production Build, Codebase Cleanup & Platform Release Deployment.

---

## 📂 Detailed Weekly Breakdown & Technical Highlightsc

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


### 📂 Week 5: Advanced TypeScript & Layer Management Engine

#### **Day 1: Data Contracts & Layer Architecture**
* **Core Learning & Methodology:** Applied TypeScript `Interfaces` and `Enums` to establish strict Data Contracts for spatial layers, preventing runtime shape mismatches across the mapping engine.
* **Practical Application:** Defined `LayerCategory` Enum (Basemap, Districts, Parcels) and `LayerConfig` interface within `src/types/layer.ts` alongside building the Side Panel Layer Manager HTML container.

#### **Day 2: Object-Oriented Layer State Management**
* **Core Learning & Methodology:** Implemented State Management patterns using TypeScript `Classes`, private member encapsulation (`Map<string, LayerConfig>`), and custom Type Aliases (`LayerToggleHandler`).
* **Practical Application:** Engineered `LayerService.ts` to encapsulate spatial layer registration, retrieval, active filtering (`getActiveLayers`), and reactive visibility toggling logic via callbacks safely.

#### **Day 3: Generic Map Helpers & Reactive Leaflet Binding**
* **Core Learning & Methodology:** Leveraged TypeScript `Generics` (`T extends { addTo: Function; remove: Function }`) to construct highly reusable, framework-agnostic spatial utility functions.
* **Practical Application:** Built `toggleMapLayer` helper in `src/utils/leaflet-helpers.ts` and bound UI checkboxes directly to live Riyadh GeoJSON layers on the Leaflet map instance.

#### **Day 4: Domain Component Engineering (Survey Station Card)**
* **Core Learning & Methodology:** Extended OOP modularity by crafting standalone UI components with strongly typed data models (`SurveyStation`).
* **Practical Application:** Created `SurveyStationCard.ts` component class for spatial elevation rendering, registering survey station vector data as an optional feature layer inside `LayerService`.

#### **Day 5: Dataset Expansion, Dynamic Markers & Application Wiring**
* **Core Learning & Methodology:** Applied full-stack GIS UI dynamic rendering, connecting TypeScript component instances to live Leaflet map layer groups (`L.layerGroup`).
* **Practical Application:** * Expanded mock survey stations dataset (`surveyStationsData.ts`) to 35 locations covering all major Riyadh districts (North, South, East, West, Central).
  * Resolved event listener and syntax errors in `app.js` to ensure single-responsibility layer toggling.
  * Rendered 35 dynamic `SurveyStationCard` HTML elements in the sidebar and wired their coordinates to interactive Leaflet markers with rich Popups (Code & Elevation).

---

### 📂 Weeks 6 & 7: Spatial Search Engine & Final Platform Release Roadmap

#### **Day 1: Spatial Search Domain Modeling & Interfaces Setup**
* **Core Learning & Methodology:** Designing strongly typed spatial search criteria and query parameters using TypeScript interfaces and Enums.
* **Practical Application:** Created `src/types/search.ts` defining `ISpatialSearchCriteria`, `PropertyCategory`, and `ISearchResult` contracts.

#### **Day 2: Client-Side Spatial Filtering Engine Implementation**
* **Core Learning & Methodology:** Implementing fast in-memory array filtering algorithms for spatial GeoJSON feature properties.
* **Practical Application:** Built `SpatialSearchService.ts` providing multi-property search methods with execution timing metrics.

#### **Day 3: Responsive Search Panel UI Component Engineering**
* **Core Learning & Methodology:** Designing accessible, dark-themed UI forms for complex spatial attribute queries.
* **Practical Application:** Engineered `SearchPanel.ts` component with input fields for district name, property type dropdowns, and area range sliders.

#### **Day 4: Multi-Attribute Query Wiring & Event Listeners**
* **Core Learning & Methodology:** Event-driven architecture for real-time input debounce and reactive state querying.
* **Practical Application:** Connected DOM form inputs in `app.js` to trigger `SpatialSearchService` on keystroke and dropdown changes.

#### **Day 5: Spatial Range & Geometric Distance Helpers**
* **Core Learning & Methodology:** Applying mathematical geometric calculations (Haversine formula & Bounding Box inclusion) in TypeScript.
* **Practical Application:** Created spatial filter helpers in `src/utils/spatial-helpers.ts` to evaluate feature intersection and area parameters.

#### **Day 6: Leaflet Layer Dynamic Filtering & Highlight Markers**
* **Core Learning & Methodology:** Programmatically updating Leaflet `GeoJSON` layer styles and marker visibility based on query results.
* **Practical Application:** Built `updateMapSearchResults` function to highlight matched property polygons and hide non-matching features.

#### **Day 7: Viewport Synchronization & Auto-Zoom (`fitBounds`)**
* **Core Learning & Methodology:** Dynamic spatial bounding box computation (`L.latLngBounds`) to adjust map viewport based on active result set.
* **Practical Application:** Integrated automatic camera transitions adjusting map extent to encompass all filtered spatial results seamlessly.

#### **Day 8: Spatial Results Metrics & Summary Card Component**
* **Core Learning & Methodology:** Real-time DOM updating of query status, result count, and performance indicators.
* **Practical Application:** Developed `SearchResultSummary.ts` displaying total matches, total area summary, and search execution time in milliseconds.

#### **Day 9: Defensive Validation & Query Edge-Case Handling**
* **Core Learning & Methodology:** Implementing robust input sanitization, empty state placeholders, and error boundaries for spatial queries.
* **Practical Application:** Added empty-result fallback UI cards and input sanitization to handle invalid spatial search inputs gracefully.

#### **Day 10: Final Code Optimization, Build Verification & Release**
* **Core Learning & Methodology:** Production bundle validation, strict TypeScript compilation checking (`tsc`), and project deployment preparation.
* **Practical Application:** Executed full end-to-end testing, removed debug logs, updated documentation, and executed final production Git release merge.