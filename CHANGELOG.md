# Change Log

All notable changes to this project will be documented in this file.

## [0.6.2]

- [web-client](./web-client) FEATURE: implemented the initial flow of the board management. We are able to make basic CRUD operations when it comes to boards/columns
- [backend](./backend) FIX: fixed the issue in data deletion when DELETE /boards/:id/columns was called.

## [0.6.1]

- [backend](./backend) CHANGE: adjust the endpoints for better represent the UI requirements. The boards and columns are separated to be utilized more appropriately.

## [0.6.0]

- [backend](./web-client) FEATURE: added a basic implementation of the modal wrapper, including of the basic keyboard control 
- [backend](./backend) FEATURE: added an initial implementation of the golang service, using mock data working with the boards + having a basic CRUD

## [0.5.0]

- [web-client](./web-client) FEATURE: added the initial implementation of the components on the board
- [web-client](./web-client) FEATURE: added mocks for the board and cards elements, matching the Frontend Mentor Figma design

## [0.4.0]

- [web-client](./web-client) FEATURE: added components related to Sidebar and bits of Header (Logo)
- [web-client](./web-client) FEATURE: added SVG assets to cover the sidebar functionality
- [web-client](./web-client) CHANGE: extended the folder structure to accommodate new elements (layout components) 
- [web-client](./web-client) CHANGE: incorporate new options for the form element to serve the Sidebar features
- [web-client](./web-client) CHANGE: simplify the changelog
- [web-client](./web-client) CHANGE: improved the keyboard controls of custom elements (ThemeSwitcher, SvgButton)

## [0.3.0]

- [web-client](./web-client) FEATURE: added a set of new components (checkbox, Dropdown, TextField) component
- [web-client](./web-client) FEATURE: added a support for SVG files and exported first two assets from the Figma design
- [web-client](./web-client) FEATURE: created a simple assert function for the HTML Node type check

## [0.2.1]

- [web-client](./web-client) FEATURE: created a component structure and added a Button component
- [web-client](./web-client) CHANGE: tweaked the Tailwind configuration to match the settings from the Design system
- [web-client](./web-client) FIX: expanded the unit test settings to be able to run the Vitest
- [web-client](./web-client) FIX: updated the configs to resolve imports "@/"

## [0.2.0] - 2024-05-30

- [web-client](./web-client) FEATURE: initialized the Storybook

## [0.1.0] - 2024-05-29

- [web-client](./web-client) FEATURE: initialized the React project and add a basic structure
