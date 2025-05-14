# Demy Web Application

Demy is a responsive and accessible web application built with Angular 19, designed to simplify the academic and administrative workflows of traditional education academies. This project is part of a broader initiative to deliver a modular, scalable, and user-friendly platform for coordinators and teachers.

## Project Overview

This web app was developed following the **Lean UX** methodology and **Domain-Driven Design (DDD)** principles, with a clear separation into bounded contexts (e.g., IAM, Attendance, Scheduling, Enrollments).

## Tech Stack

- **Angular 19** with standalone components
- **Angular Material** for UI components and theming
- **i18n**: Internationalization using `@ngx-translate/core`
- **i11y**: Accessibility-first design
- **Routing**: Structured lazy-loaded routes per bounded context
- **Fake API**: Temporary endpoints using MockAPI
- **Responsive Design**: Mobile-first UI with adaptive layouts

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Angular CLI 19

### Install dependencies

```bash
npm install
```

### Start development server

```bash
ng serve
```

Navigate to [http://localhost:4200](http://localhost:4200) in your browser.

## Internationalization

This application supports both English and Spanish. Language switching is available via the UI. All texts are externalized using "@ngx-translate/core".

## Accessibility

Accessibility has been integrated into components via:
- ARIA labels
- High contrast theming support

## Build

To build the app for production:

```bash
ng build
```

The build artifacts will be stored in the "dist/" directory.

## Contributors

This project is developed by a team of Software Engineering students from UPC's School of Engineering.

## License

This project is licensed under the MIT License.
