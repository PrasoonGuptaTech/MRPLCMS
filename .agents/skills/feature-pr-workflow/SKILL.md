---
name: feature-pr-workflow
description: Deliver every MRPLCMS repository implementation or documentation change through a dedicated Git branch and a pull request targeting main. Use whenever a task will modify tracked repository files; do not use for read-only investigation or explanation.
---

# Feature PR Workflow

Keep `main` free of direct implementation commits. Complete each repository
change through the following workflow while preserving unrelated user work.

## Start the change

1. Inspect the working tree, current branch, remotes, and relevant repository
   instructions before editing.
2. If unrelated uncommitted changes would make switching or branching unsafe,
   stop and ask the user how to proceed. Never discard, overwrite, or include
   unrelated changes.
3. Create a new branch for the task before modifying files. Branch from the
   current local `main` unless the user specifies another base. Use a concise
   `codex/<change-name>` branch name unless the user requests a different name.
4. Do not rewrite, reset, or force-update `main`. Do not force-push.

## Implement and validate

1. Make only changes required by the task and follow the architecture and
   conventions documented in this repository.
2. Run validation proportional to the change. For code changes, prefer the
   repository's complete `npm run validate` gate before delivery. For isolated
   documentation changes, formatting and `git diff --check` are sufficient
   unless broader validation is warranted.
3. Review the final diff and working tree. Stage only files belonging to the
   task.

## Deliver through a pull request

1. Create a focused Conventional Commit describing the completed change.
2. Push the feature branch to `origin` without force.
3. Create a pull request targeting `main`. Give it a concise title and include:
   - a summary of the behavior or documentation changed;
   - validation performed and its result;
   - relevant operational notes, limitations, or follow-up work.
4. Verify or report the pull request URL. Leave the pull request unmerged unless
   the user explicitly asks to merge it.

If authentication, permissions, branch protection, missing GitHub tooling, or a
remote conflict prevents delivery, keep the local commit intact and report the
exact blocker and the next required action. Do not bypass repository controls.
