# CI/CD Development Guide

## Overview
This project now includes a comprehensive CI/CD pipeline that automatically tests, builds, and deploys your portfolio website.

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development with Tailwind watch mode
npm run dev

# Build for production
npm run build

# Run tests and linting
npm run unit
npm test

# Serve locally for testing
npm run serve
```

### Branch Strategy
- **main**: Production branch - auto-deploys to GitHub Pages
- **develop**: Development branch - runs tests only
- **feature branches**: Create PRs to main for new features

### Pull Request Workflow
1. Create feature branch from main
2. Make your changes
3. Run `npm test` locally to ensure quality
4. Push and create PR to main
5. CI automatically runs validation
6. After approval and merge, CD automatically deploys

## CI/CD Pipeline Details

### Continuous Integration (CI)
Runs on every push and PR:
- **Unit Tests**: Jest suite (currently theme manager coverage)
- **Linting**: ESLint for JavaScript, Stylelint for CSS
- **HTML Validation**: Ensures proper HTML structure
- **Build Test**: Verifies Tailwind CSS compilation
- **Artifact Generation**: Creates preview builds for PRs

### Continuous Deployment (CD)
Runs only on main branch pushes:
- **Production Build**: Optimized Tailwind CSS with minification
- **GitHub Pages Deploy**: Automatic deployment to live site
- **Environment**: Configured with proper permissions and security

## Quality Gates

### Pre-commit Checks (Local)
```bash
npm run lint:js      # JavaScript linting
npm run lint:css     # CSS linting  
npm run validate:html # HTML validation
npm run unit         # Jest unit tests (theme manager)
npm run build        # Build verification
```

### Automated Checks (CI)
- Code quality validation
- Build success verification
- HTML structure validation
- Asset generation confirmation

## Monitoring & Feedback

### PR Comments
- Automatic success/failure comments on PRs
- Build artifact links for preview testing
- Clear feedback on what needs to be fixed

### Build Status
- GitHub Actions tab shows detailed build logs
- Email notifications on build failures
- Status badges available for README

## Troubleshooting

### Common Issues
1. **ESLint errors**: Check JavaScript syntax and unused variables
2. **Stylelint errors**: Verify CSS follows standard conventions
3. **HTML validation**: Ensure proper tag structure and attributes
4. **Unit test failures**: Run `npm run unit` with `--watch` to iterate on ThemeManager logic
5. **Build failures**: Check Tailwind CSS input/output paths

### Debug Commands
```bash
# Check specific linting issues
npm run lint:js -- --fix  # Auto-fix JS issues
npm run lint:css -- --fix # Auto-fix CSS issues

# Verbose build output
npm run build -- --verbose

# Test HTML validation on specific files
npx html-validate index.html
```

## Security & Performance

### Optimizations
- Minified CSS in production builds
- Cached dependencies in CI pipeline
- Efficient artifact uploads
- Secure deployment with proper permissions

### Best Practices
- Never commit `node_modules` or build artifacts
- Keep dependencies updated
- Use semantic versioning for releases
- Document breaking changes in PRs