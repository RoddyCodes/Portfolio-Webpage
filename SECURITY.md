# Security Checklist

## Before Every Commit
- [ ] No API keys, tokens, or passwords in code
- [ ] No personal contact information (phone, address, etc.)
- [ ] No private email addresses (use public ones only)
- [ ] No internal company information
- [ ] No database connection strings
- [ ] Check for accidentally committed `.env` files

## Files to Review Carefully
- [ ] `package.json` - no sensitive scripts or metadata
- [ ] HTML files - no hidden sensitive comments
- [ ] JavaScript files - no hardcoded credentials
- [ ] CSS files - no sensitive background image paths
- [ ] Blog posts - no private/confidential information

## Safe to Commit
✅ Public portfolio information
✅ Professional experience (sanitized)
✅ Public project descriptions
✅ Technical skills and education
✅ Open source code
✅ Public social media links (GitHub, LinkedIn)
✅ Professional headshot/photos

## Never Commit
❌ Personal addresses or phone numbers
❌ Private email addresses
❌ API keys or tokens
❌ Database credentials
❌ Private certificates/keys
❌ Internal company details
❌ Salary or compensation information
❌ Personal family photos
❌ Private notes or drafts

## Emergency: If Sensitive Data Was Committed
1. **DO NOT** just delete the file - it's still in Git history
2. Use `git filter-branch` or BFG Repo-Cleaner to remove from history
3. Force push to overwrite remote history
4. Rotate any compromised credentials immediately
5. Consider making repository private temporarily

## Regular Security Practices
- Review all changes before `git add`
- Use `git diff --cached` before committing
- Set up branch protection rules
- Enable security alerts on GitHub
- Regular dependency updates for security patches