# 🚀 Git Push & Run Guide

## 📤 Pushing Changes to GitHub

### Step 1: Check Current Status
```bash
# Check what files have changed
git status

# See what changes were made
git diff
```

### Step 2: Stage Changes
```bash
# Stage all changes
git add .

# Or stage specific files
git add path/to/file
```

### Step 3: Commit Changes
```bash
# Commit with a descriptive message
git commit -m "feat: add new feature description"

# Or use a more detailed commit message
git commit -m "feat: implement product search functionality

- Add search bar to products page
- Implement search filtering
- Add search results display
"
```

### Step 4: Push to GitHub
```bash
# Push to current branch
git push

# Or push to a specific branch
git push origin branch-name

# If branch doesn't exist remotely, create it
git push -u origin branch-name
```

### Complete Workflow Example
```bash
# 1. Check status
git status

# 2. Stage changes
git add .

# 3. Commit
git commit -m "feat: update product listing page"

# 4. Push
git push
```

## 🏃 Running the Application

### Option 1: Run All Services (Recommended)
```bash
# Start all services at once
pnpm dev
```

This will start:
- Web App (http://localhost:3000)
- API Gateway (http://localhost:3001)
- All microservices

### Option 2: Run Services Individually

**Terminal 1 - Web App:**
```bash
cd apps/web
pnpm dev
```

**Terminal 2 - API Gateway:**
```bash
cd services/api-gateway
pnpm dev
```

**Terminal 3 - Marketplace Service:**
```bash
cd services/marketplace
pnpm dev
```

**Terminal 4 - Orders Service:**
```bash
cd services/orders
pnpm dev
```

**Terminal 5 - Wallet Service:**
```bash
cd services/wallet
pnpm dev
```

**Terminal 6 - Auth Service:**
```bash
cd services/auth
pnpm dev
```

**Terminal 7 - Logistics Service:**
```bash
cd services/logistics
pnpm dev
```

## 🔄 Complete Workflow: Make Changes → Push → Run

### 1. Make Changes
- Edit files in VS Code
- Save your changes

### 2. Stage and Commit
```bash
git add .
git commit -m "your commit message"
```

### 3. Push to GitHub
```bash
git push
```

### 4. Run Application
```bash
pnpm dev
```

### 5. Open in Browser
- Open http://localhost:3000

## 📋 Quick Reference Commands

### Git Commands
```bash
# Check status
git status

# Stage all changes
git add .

# Commit changes
git commit -m "message"

# Push to GitHub
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature-name

# Switch branch
git checkout branch-name

# View branches
git branch

# View commit history
git log
```

### Run Commands
```bash
# Start all services
pnpm dev

# Build all services
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Type check
pnpm type-check
```

## 🎯 Common Workflows

### Daily Development Workflow
```bash
# 1. Pull latest changes
git pull

# 2. Make your changes in VS Code
# ... edit files ...

# 3. Stage and commit
git add .
git commit -m "feat: add new feature"

# 4. Push to GitHub
git push

# 5. Run application
pnpm dev

# 6. Test your changes
# Open http://localhost:3000
```

### Feature Branch Workflow
```bash
# 1. Create feature branch
git checkout -b feature/product-search

# 2. Make changes
# ... edit files ...

# 3. Stage and commit
git add .
git commit -m "feat: add product search"

# 4. Push branch
git push -u origin feature/product-search

# 5. Run and test
pnpm dev

# 6. Create Pull Request on GitHub
# (Then merge to main branch)
```

### Hotfix Workflow
```bash
# 1. Create hotfix branch from main
git checkout main
git pull
git checkout -b hotfix/fix-bug

# 2. Fix the bug
# ... edit files ...

# 3. Commit and push
git add .
git commit -m "fix: resolve critical bug"
git push -u origin hotfix/fix-bug

# 4. Test fix
pnpm dev

# 5. Merge to main and deploy
```

## 🔍 VS Code Integration

### Using VS Code Git Panel

1. **Open Source Control Panel**
   - Click the Source Control icon (📁) in the sidebar
   - Or press `Ctrl+Shift+G` (Windows) / `Cmd+Shift+G` (Mac)

2. **Stage Changes**
   - Click the `+` icon next to files to stage them
   - Or click `+` next to "Changes" to stage all

3. **Commit**
   - Type commit message in the text box
   - Click the checkmark (✓) or press `Ctrl+Enter`

4. **Push**
   - Click the "..." menu (three dots)
   - Select "Push"
   - Or use the sync icon (⇄)

### VS Code Git Extensions (Optional)

- **GitLens**: Enhanced Git capabilities
- **Git History**: View file history
- **Git Graph**: Visualize Git branches

## 🚨 Troubleshooting

### Git Issues

**Issue: "Your branch is ahead of origin"**
```bash
# Push your changes
git push
```

**Issue: "Your branch is behind origin"**
```bash
# Pull latest changes first
git pull

# Resolve any conflicts, then push
git push
```

**Issue: "Merge conflicts"**
```bash
# 1. Resolve conflicts in VS Code
# 2. Stage resolved files
git add .

# 3. Complete merge
git commit -m "resolve merge conflicts"

# 4. Push
git push
```

**Issue: "Nothing to commit"**
- Make sure you've saved your files
- Check if changes are already committed
- Verify you're in the right directory

### Run Issues

**Issue: "Port already in use"**
```bash
# Windows: Find process using port
netstat -ano | findstr :3000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in .env.local
PORT=3001
```

**Issue: "Module not found"**
```bash
# Reinstall dependencies
pnpm install

# Clear cache and reinstall
rm -rf node_modules
pnpm install
```

**Issue: "Services not starting"**
```bash
# Check if .env.local exists
# Verify environment variables
# Check service logs in terminal
```

## 📝 Commit Message Guidelines

### Format
```
type: short description

Longer description if needed
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```bash
git commit -m "feat: add product search functionality"
git commit -m "fix: resolve cart calculation bug"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor: improve API Gateway routing"
```

## 🎓 Best Practices

1. **Commit Often**: Make small, focused commits
2. **Write Clear Messages**: Describe what and why, not how
3. **Test Before Pushing**: Run the app and test your changes
4. **Pull Before Push**: Always pull latest changes first
5. **Use Branches**: Create branches for features and fixes
6. **Review Changes**: Check `git diff` before committing

## 🔗 Quick Links

- **GitHub Repository**: Your repo URL
- **Web App**: http://localhost:3000
- **API Gateway**: http://localhost:3001
- **API Docs**: http://localhost:3001/docs

## 📚 Additional Resources

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com
- **VS Code Git**: https://code.visualstudio.com/docs/editor/versioncontrol

---

**Happy Coding! 🚀**

