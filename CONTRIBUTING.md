# Contributing to GLSL Generator

Thank you for your interest in contributing to **GLSL Generator**!

GLSL Generator is a TypeScript library for programmatically generating GLSL shader source code for WebGL.

## Architecture

Before making substantial changes to the library, please review the [Architecture](ARCHITECTURE.md) document. It describes the `Builder → Compiler → Runtime/GLSL` architecture and the relationships between the core components.

## Progress

Not all features are implemented yet. See [TODO.md](./TODO.md) for the full checklist of what's done and what's remaining.

## Contribution Workflow

All contributions should be made through a **fork and pull request**.

### 1. Fork the Repository

Fork the repository to your own GitHub account:

<https://github.com/erfan114/shader-generator>

Then clone your fork locally:

```bash
git clone https://github.com/<your-username>/shader-generator.git
cd shader-generator
npm install
```

### 2. Create a New Branch

Create a new branch for your change. Please don't make changes directly on your `main` branch.

```bash
git checkout -b feature/my-change
```

Use a descriptive branch name, for example:

```text
feature/add-vector-support
fix/glsl3-compiler
docs/improve-readme
test/compiler-regression
```

### 3. Make Your Changes

Implement your change and add or update tests where appropriate.

For shader-generation changes, consider both supported GLSL targets:

- GLSL ES 1.00
- GLSL ES 3.00

### 4. Run the Checks

Before pushing your branch, make sure the project passes its checks:

```bash
npm run typecheck
npm test
npm run build
```

Please fix any failures before opening a pull request.

### 5. Commit Your Changes

Create a clear commit describing your change:

```bash
git add .
git commit -m "Add GLSL 3 vector support"
```

Avoid vague commit messages such as `update`, `changes`, or `fix stuff`.

### 6. Push Your Branch

Push your branch to your fork:

```bash
git push -u origin feature/my-change
```

### 7. Open a Pull Request

Go to your fork on GitHub and open a **Pull Request** from your branch to the project's `main` branch:

```text
your-username:feature/my-change
        ↓
erfan114:main
```

In the pull request description, explain:

- What you changed.
- Why the change is needed.
- How you tested it.
- Any relevant GLSL ES 1.00 / GLSL ES 3.00 considerations.

Keep pull requests focused on one logical change and avoid unrelated modifications.

### Pull Request Checklist

- [ ] The repository was forked before making changes.
- [ ] Changes were made on a separate branch.
- [ ] The branch has a descriptive name.
- [ ] Relevant tests have been added or updated.
- [ ] `npm run typecheck` passes.
- [ ] `npm test` passes.
- [ ] `npm run build` passes.
- [ ] Public API changes are documented.
- [ ] GLSL ES 1.00 behavior has been considered.
- [ ] GLSL ES 3.00 behavior has been considered.
- [ ] No unrelated changes are included.
- [ ] The pull request clearly explains the change.

## Reporting Bugs

When reporting a bug, provide:

- A clear description of the problem.
- Expected behavior.
- Actual behavior.
- A minimal reproduction, if possible.
- The relevant GLSL target.
- Generated GLSL source, when applicable.
- Relevant error messages.

## Proposing Features

For substantial features or public API changes, please open an issue first to discuss the proposed design before implementing it.

Include:

- The problem the feature solves.
- The proposed API.
- Expected behavior for GLSL ES 1.00 and GLSL ES 3.00.
- Any compiler or compatibility considerations.
- Examples of intended usage.

## Code of Conduct

Please follow the project's [Code of Conduct](CODE_OF_CONDUCT.md) when participating in the project.

Thank you for contributing to GLSL Generator!
