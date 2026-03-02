# URL Query Stripper

A simple, focused utility that strips query strings from URLs and opens the cleaned URL in a new tab.

## Features

- **URL Input Field**: Paste or type URLs with real-time validation
- **Strip & Navigate**: Remove query parameters and open in a new tab
- **All-in-One**: Read from clipboard, validate, strip, and navigate in one click
- **URL Preview**: See the cleaned URL before navigation
- **Keyboard Support**: Press Enter to quickly strip and open

## Usage

1. **Manual Method**:
   - Paste a URL into the text field
   - Click "Strip & Open" or press Enter
   - The cleaned URL opens in a new tab

2. **All-in-One Method**:
   - Copy a URL to your clipboard
   - Click "All-in-One"
   - URL is automatically pasted, stripped, and opened

## Deployment to GitHub Pages

### Prerequisites
- A GitHub account
- Node.js and npm installed locally

### Setup Instructions

1. **Create a new GitHub repository** for this project

2. **Update the base path** in `vite.config.ts`:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
   ```
   Replace `your-repo-name` with your actual repository name.

3. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment":
     - **Source**: Select "GitHub Actions"
   - The GitHub Actions workflow will automatically deploy your app

5. **Access your app**:
   - After the deployment completes (check the "Actions" tab)
   - Your app will be available at: `https://your-username.github.io/your-repo-name/`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# The built files will be in the 'dist' directory
# You can deploy this directory to any static hosting service
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run Playwright e2e tests
npm run test:e2e
```

## Tech Stack

- **React** + **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **Phosphor Icons** for iconography
- **Sonner** for toast notifications

## License

MIT
