# TriviaTrek Commit Message Examples

This document provides atomic commit message examples following conventional commits format.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, missing semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process, dependencies, or tooling

---

## Example Commits

### 1. Feature: Add Quiz Timer Component
```
feat(components): add Timer component with countdown functionality

- Implement useEffect-based countdown timer
- Add aria-live region for accessibility
- Display time in mm:ss format
- Call onExpire callback when time reaches zero
- Clean up interval on component unmount

Closes #42
```

### 2. Fix: Prevent Timer Memory Leak
```
fix(components): clear interval on Timer unmount

Previously, the interval was not being cleared when the Timer component
unmounted, causing memory leaks in long-running applications.

- Add cleanup function to useEffect
- Verify interval is cleared before component removal
- Add test for cleanup behavior

Closes #58
```

### 3. Feature: Admin CRUD Operations
```
feat(pages): implement Admin panel with quiz management

- Add Admin page with quiz listing
- Implement create, read, update, delete operations
- Add form validation for quiz data
- Show success/error toast notifications
- Add delete confirmation dialog

Closes #15
```

### 4. Refactor: Extract API Client Logic
```
refactor(lib): create reusable API client with interceptors

- Extract axios configuration to separate module
- Add request/response interceptors
- Implement exponential backoff retry logic
- Add typed get/post/put/delete helpers
- Improve error handling consistency

This improves code reusability and maintainability across the application.
```

### 5. Test: Add QuestionCard Component Tests
```
test(components): add comprehensive tests for QuestionCard

- Test option click handling
- Test keyboard navigation (Enter, Space)
- Test selected state rendering
- Test disabled state
- Test accessibility attributes (aria-checked, role)

Closes #72
```

### 6. Docs: Update README with API Examples
```
docs: add cURL examples for API endpoints

- Add GET /quizzes example
- Add POST /quizzes example with full quiz object
- Add POST /results example
- Include response format documentation

Closes #33
```

### 7. Style: Format Code with Prettier
```
style: run prettier formatting across codebase

- Format all TypeScript files
- Fix line length violations
- Standardize quote usage
- Align with project style guide
```

### 8. Perf: Optimize Quiz List Rendering
```
perf(pages): memoize QuizList component to prevent re-renders

- Wrap QuizList with React.memo
- Memoize quiz card components
- Reduce unnecessary re-renders on parent updates
- Benchmark shows 40% improvement in render time

Closes #91
```

### 9. Chore: Update Dependencies
```
chore(deps): update React to 18.2.0 and Vite to 5.0.8

- Update react and react-dom to latest stable
- Update vite and build tools
- Update type definitions
- Verify all tests pass with new versions

No breaking changes.
```

### 10. Fix: Handle Undefined Quiz in PlayQuiz
```
fix(pages): add guard against undefined quiz in PlayQuiz

Previously, if quiz fetch failed, the component would crash when trying
to access quiz properties. Now it shows an error state with retry option.

- Add null check before accessing quiz data
- Show error message with retry button
- Add loading state during fetch
- Improve error handling in API calls

Closes #67
```

---

## Best Practices

### Do's ✅
- Use imperative mood ("add" not "added" or "adds")
- Keep subject line under 50 characters
- Capitalize the subject line
- Reference issues in footer (Closes #123)
- Explain what and why, not how
- Make commits atomic and focused
- Test before committing

### Don'ts ❌
- Don't mix multiple features in one commit
- Don't use vague messages like "fix stuff"
- Don't commit without testing
- Don't include unrelated changes
- Don't use past tense in subject
- Don't exceed 72 characters per line in body

---

## Commit Workflow

```bash
# 1. Make changes
git add .

# 2. Commit with message
git commit -m "feat(components): add new feature"

# 3. For longer messages, use editor
git commit  # Opens editor for full format

# 4. Push to branch
git push origin feature/my-feature

# 5. Create Pull Request
# Reference commit in PR description
```

---

## Squashing Commits

When merging feature branches, squash related commits:

```bash
git rebase -i HEAD~3  # Squash last 3 commits
git push origin feature/my-feature --force
```

---

## Viewing Commit History

```bash
# View formatted log
git log --oneline --graph --all

# View commits by type
git log --grep="^feat" --oneline

# View commits for a file
git log --oneline -- src/components/Timer.tsx
```

---

## Integration with CI/CD

Commit messages are used to:
- Generate changelog automatically
- Determine version bumps (semantic versioning)
- Trigger specific CI/CD workflows
- Document changes for releases

---

**Last Updated**: January 2024
