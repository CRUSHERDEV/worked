# ⚡ Quick Commands Reference

## 🚀 Run Application

### Start All Services
```bash
pnpm dev
```

### Start Individual Services
```bash
# Web App
cd apps/web && pnpm dev

# API Gateway
cd services/api-gateway && pnpm dev

# Marketplace
cd services/marketplace && pnpm dev
```

## 📤 Git Commands

### Basic Workflow
```bash
# Check status
git status

# Stage all changes
git add .

# Commit
git commit -m "your message"

# Push
git push
```

### One-Liner (Stage + Commit + Push)
```bash
git add . && git commit -m "your message" && git push
```

## 🔍 Check Status

### Git Status
```bash
git status
```

### Check Running Services
```bash
# Windows PowerShell
netstat -ano | findstr :3000
netstat -ano | findstr :3001
```

### Check Logs
```bash
# View git log
git log --oneline

# View recent commits
git log -5
```

## 🛠️ Common Tasks

### Install Dependencies
```bash
pnpm install
```

### Build Project
```bash
pnpm build
```

### Run Tests
```bash
pnpm test
```

### Lint Code
```bash
pnpm lint
```

## 🌐 Open URLs

### Application URLs
- **Web App**: http://localhost:3000
- **API Gateway**: http://localhost:3001
- **API Docs**: http://localhost:3001/docs

### Open in Browser (Windows)
```bash
# Web App
start http://localhost:3000

# API Gateway
start http://localhost:3001
```

## 🔄 Reset/Undo

### Undo Unstaged Changes
```bash
git checkout -- .
```

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Discard Changes)
```bash
git reset --hard HEAD~1
```

## 📋 Branch Management

### Create Branch
```bash
git checkout -b feature-name
```

### Switch Branch
```bash
git checkout branch-name
```

### List Branches
```bash
git branch
```

### Delete Branch
```bash
git branch -d branch-name
```

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Find process
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Reinstall Dependencies
```bash
rm -rf node_modules
pnpm install
```

### Clear Cache
```bash
pnpm store prune
```

## 📝 VS Code Shortcuts

### Git in VS Code
- `Ctrl+Shift+G`: Open Source Control
- `Ctrl+Enter`: Commit
- `Ctrl+Shift+P` → "Git: Push": Push changes

### Terminal in VS Code
- `` Ctrl+` ``: Toggle Terminal
- `Ctrl+Shift+` ``: New Terminal

## 🎯 Daily Workflow

```bash
# 1. Pull latest
git pull

# 2. Make changes in VS Code
# ... edit files ...

# 3. Stage, commit, push
git add . && git commit -m "your message" && git push

# 4. Run app
pnpm dev

# 5. Open browser
start http://localhost:3000
```

---

**Copy and paste these commands as needed!** 🚀

