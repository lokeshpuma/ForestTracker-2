# ForesTracker-2

A comprehensive forest and environmental monitoring application built with Next.js and React. ForesTracker-2 helps track forests, wildlife, water bodies, resources, and officers to manage environmental data effectively.

## Features

- **Forest Management**: Track and manage forest areas with detailed information
- **Animal Tracking**: Monitor wildlife populations and track animal movements
- **Water Body Monitoring**: Track water quality and maintain water resource data
- **Resource Management**: Manage forest resources and track resource utilization
- **Officer Management**: Manage forest officers and their assignments
- **Dashboard**: Real-time analytics and visualization of environmental data
- **User Authentication**: Secure login and registration for authorized users
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend Framework**: Next.js 15.2.4
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Component Library**: Radix UI
- **Form Management**: React Hook Form
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: Next Themes

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lokeshpuma/ForesTracker-2.git
cd ForesTracker-2
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                 # Next.js app directory with pages
│   ├── animals/        # Animal tracking page
│   ├── forests/        # Forest management page
│   ├── login/          # Login page
│   ├── officers/       # Officer management page
│   ├── register/       # Registration page
│   ├── resources/      # Resource management page
│   ├── settings/       # Settings page
│   └── water-bodies/   # Water body monitoring page
├── components/         # Reusable React components
│   ├── ui/            # UI component library
│   └── [feature].tsx  # Feature-specific components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and types
├── public/            # Static assets
└── styles/            # Global styles
```

## Available Pages

- **Dashboard** (`/`): Main landing page with overview
- **Animals** (`/animals`): Animal tracking and management
- **Forests** (`/forests`): Forest area management
- **Water Bodies** (`/water-bodies`): Water resource monitoring
- **Resources** (`/resources`): Resource management
- **Officers** (`/officers`): Officer management
- **Settings** (`/settings`): User settings
- **Login** (`/login`): User authentication
- **Register** (`/register`): New user registration

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm deploy` - Deploy to GitHub Pages

## Building for Production

```bash
pnpm build
pnpm start
```

## Deployment

This project is configured to deploy to GitHub Pages. The build output is exported as static HTML.

To deploy:

1. Install gh-pages:
```bash
pnpm add -D gh-pages
```

2. Deploy:
```bash
pnpm deploy
```

This will build the project and push the static files to the `gh-pages` branch.

## Configuration

- **Base Path**: The app is configured with a base path of `/ForesTracker-2` for GitHub Pages deployment
- **Static Export**: Uses `output: 'export'` for static site generation
- **Image Optimization**: Disabled for static deployment

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue on the GitHub repository.

---

**Made with ❤️ for environmental monitoring and forest conservation**
# ForestTracker-2
