# vondot - React Template

## Overview

The vondot React Template, designed as a complement to the [nestJS_template](https://github.com/vondot-GmbH/nestJS_template) backend template, is an all-encompassing solution for building SaaS applications. It encapsulates a wealth of best practices, providing a robust foundation for everything from authentication and display to a comprehensive rights system. This template, in tandem with its backend counterpart, offers all the essential elements to jumpstart any project, effectively catering to the foundational needs of modern web application development.

For an in-depth understanding and additional details on each aspect of the template, refer to our extensive documentation at [vondot docs](https://docs.vondot.dev/react.docs/overview)

## Installation

```bash
git clone https://github.com/vondot-GmbH/reactJS_template.git
cd reactJS_template
npm i
npm run dev
```

## Key Features

### Responsive Design and Styling

- **SCSS Mixins:** Enables responsive design with predefined SCSS mixins in `styles/utils.scss`.
- **Styling and Theming:** Includes global (`styles/global.scss`), root (`styles/index.scss`), and theme stylesheets (`styles/themes.scss`) for coherent styling structures.
- **SCSS Variables and Mixins:** Facilitates consistent and easy theme management.

### Generic CRUD Client and HTTP Client

- **GenericHttpClient Class:** Simplifies CRUD operations for various data types, ensuring a consistent approach to HTTP requests.
- **Global HTTP Client:** Built on the axios library, it manages requests and responses, with token management, error handling, and extensibility.

### Layouts

- **Flexible Layout Components:** Offers MainLayout, PageContainer, SizedContainer, and SplitLayout for versatile content arrangement.

```
MainLayout
+-------------------------------------------+
| TopBar1   TopBar2                         |
| +---------------------------------------+ |
| | SideBar1 | PageContainer              | |
| |          | +------------------------+ | |
| |          | | SizedContainer         | | |
| |          | +------------------------+ | |
| +---------------------------------------+ |
+-------------------------------------------+

SplitLayout (row)
+-------------------------------------------+
| +------------------+ +------------------+ |
| | LeftChild        | | RightChild       | |
| |                  | |                  | |
| +------------------+ +------------------+ |
+-------------------------------------------+

SplitLayout (column)
+-------------------------------------------+
| +---------------------------------------+ |
| | LeftChild                             | |
| +---------------------------------------+ |
| +---------------------------------------+ |
| | RightChild                            | |
| +---------------------------------------+ |
+-------------------------------------------+

```

### Localization

- **i18next Integration:** Configurable localization settings in `i18n.ts` for global audience accessibility.
- **Translation Files:** Organized JSON files for each language.
- **Component Integration:** Uses the `useTranslation` hook for easy string retrieval.

### Client Permission Handling

- **Permission Management:** Controls UI elements' visibility and interaction based on user roles and permissions.
- **Implementation Example:** Provides a practical example of permission checks in a sidebar component.

### Advanced Features

- **Schema Structure:** Utilizes validation libraries like yup for data integrity and type safety.
- **Built-in Components:** Includes predefined text, input, and loading components, as well as ListDataTable and SortableList for dynamic UI.
- **Form Implementation:** Uses react-hook-form and yup for robust form creation and validation.
- **State Management with MobX:** Employs MobX for reactive state management.
