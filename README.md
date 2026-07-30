# Sentinel AI

You are a Senior Staff Software Engineer, Principal UI/UX Designer, DevSecOps Architect, Security Engineer, Product Manager, and System Architect with 20+ years of enterprise software experience.

Your task is to build a complete production-ready SaaS application called

SentinelAI

Continuous Provenance & Blast-Radius Remediation Engine

The application is a modern enterprise cybersecurity platform that continuously monitors an organization's open-source software supply chain, generates Software Bills of Materials (SBOMs), identifies vulnerable dependencies, visualizes blast radius, and automates remediation workflows.

--------------------------------------------------

OBJECTIVE

--------------------------------------------------

Build a polished enterprise-grade web application that looks comparable to:

• GitHub Advanced Security

• Snyk

• Wiz

• Prisma Cloud

• Datadog

• SentinelOne

The application must be production-ready, scalable, maintainable, responsive, and follow modern React architecture.

--------------------------------------------------

TECH STACK

--------------------------------------------------

Frontend

• React.js

• JavaScript (ES6+)

• Vite

• Tailwind CSS

• React Router

• React Query

• Axios

• React Flow

• Recharts

• Framer Motion

• Lucide React

Backend

• Supabase

Database

• PostgreSQL

Authentication

• GitHub OAuth

Deployment

• Vercel

Version Control

• GitHub

--------------------------------------------------

DESIGN STYLE

--------------------------------------------------

The UI must follow a premium enterprise SaaS aesthetic.

Inspired by the SentinelAI dashboard on Dribbble.

Characteristics:

• Minimal

• Large whitespace

• Rounded cards (12–20px)

• Soft shadows

• Clean typography

• Card-based dashboard

• White background

• Orange primary accent (#FF6B35)

• Green for healthy

• Red for critical

• Blue for informational

• Purple for AI insights

• Smooth micro animations

• Responsive layout

Do NOT copy the design directly. Create an original implementation with the same design philosophy.

--------------------------------------------------

FEATURES

--------------------------------------------------

Authentication

• GitHub OAuth

• Protected routes

• Organization support

Dashboard

• Security Score

• Critical Vulnerabilities

• Active Repositories

• Dependency Count

• SBOM Coverage

• Auto Remediation Rate

Repositories

• Connect GitHub repositories

• View repository health

• Search repositories

• Filter repositories

Dependency Explorer

• Interactive dependency graph

• React Flow visualization

• Search packages

• Filter dependencies

• Node details

Blast Radius Visualization

• Interactive node graph

• Animated dependency edges

• Healthy nodes

• Critical nodes

• Risk propagation

• Zoom

• Pan

SBOM Explorer

• Generate SBOM

• CycloneDX support

• SPDX support

• Download SBOM

• Version history

Vulnerability Center

• CVE list

• Severity filters

• Package details

• Repository affected

• Timeline

Remediation Center

• Suggested updates

• Automated version upgrades

• Pull Request status

• Test results

• Deployment status

AI Insights

• Risk prediction

• Vulnerability explanation

• Recommended actions

• Dependency analysis

Analytics

• Repository health

• Security trends

• Dependency growth

• Monthly reports

• Risk heatmap

Notifications

• Real-time alerts

• Push notifications

• Activity feed

--------------------------------------------------

DATABASE

--------------------------------------------------

Design a normalized PostgreSQL schema including:

users

organizations

repositories

dependencies

sboms

vulnerabilities

pull_requests

notifications

activity_logs

audit_logs

Use Supabase Row Level Security.

--------------------------------------------------

UI REQUIREMENTS

--------------------------------------------------

Pages

Login

Dashboard

Repositories

Dependencies

SBOM Explorer

Blast Radius

Vulnerabilities

Remediation

Reports

Settings

Each page must contain:

Professional layout

Loading states

Skeleton loaders

Error handling

Empty states

Responsive design

Dark mode support

--------------------------------------------------

CODE QUALITY

--------------------------------------------------

Follow

Component-based architecture

Reusable hooks

Reusable components

Clean folder structure

Environment variables

API abstraction

Error boundaries

Lazy loading

Code splitting

Performance optimization

Accessibility

SEO

--------------------------------------------------

OUTPUT

--------------------------------------------------

Generate the complete application including

Folder structure

React project

All pages

Reusable components

Supabase integration

Authentication

Database schema

Routing

State management

Animations

Responsive design

Professional UI

Documentation

README

Deployment guide

The application should be indistinguishable from a commercial SaaS product.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7b6bc387-dc86-46f1-a075-710b4acc1a9f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
