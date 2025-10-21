#!/bin/bash

echo "=========================================="
echo "Infinititech Partners - Deployment Setup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}This script will help you prepare your code for deployment${NC}"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${GREEN}Initializing Git repository...${NC}"
    git init
    echo ""
fi

# Add all files
echo -e "${GREEN}Adding all files to Git...${NC}"
git add .
echo ""

# Commit
echo -e "${GREEN}Creating commit...${NC}"
git commit -m "Ready for deployment - HRMS integration complete"
echo ""

# Ask for GitHub repository URL
echo -e "${YELLOW}Please enter your GitHub repository URL:${NC}"
echo "Example: https://github.com/YOUR_USERNAME/infinititech-website.git"
read -p "Repository URL: " repo_url

if [ ! -z "$repo_url" ]; then
    # Check if remote already exists
    if git remote | grep -q "origin"; then
        echo -e "${YELLOW}Remote 'origin' already exists. Updating...${NC}"
        git remote set-url origin "$repo_url"
    else
        echo -e "${GREEN}Adding remote repository...${NC}"
        git remote add origin "$repo_url"
    fi
    echo ""

    # Set main branch
    echo -e "${GREEN}Setting main branch...${NC}"
    git branch -M main
    echo ""

    # Push to GitHub
    echo -e "${GREEN}Pushing to GitHub...${NC}"
    echo -e "${YELLOW}Note: You may be asked for your GitHub credentials${NC}"
    git push -u origin main
    echo ""

    echo -e "${GREEN}=========================================="
    echo "✅ Success!"
    echo "=========================================="
    echo ""
    echo "Your code has been pushed to GitHub!"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://vercel.com/signup"
    echo "2. Sign up with your GitHub account"
    echo "3. Import your repository"
    echo "4. Follow the deployment guide in STEP_BY_STEP_DEPLOYMENT.md"
    echo ""
    echo "For detailed instructions, see:"
    echo "📄 STEP_BY_STEP_DEPLOYMENT.md"
    echo ""
else
    echo -e "${YELLOW}No repository URL provided. Skipping push to GitHub.${NC}"
    echo ""
    echo "To push manually later, run:"
    echo "git remote add origin YOUR_REPO_URL"
    echo "git branch -M main"
    echo "git push -u origin main"
fi
