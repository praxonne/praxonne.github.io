# Agent rules

- Keep the site statically generated with Astro. Do not introduce Jekyll, Hugo, a server runtime, or client-side tracking.
- Treat generated code as untrusted. A `200..=302` response is an eligibility signal for a feature branch and draft pull request, never proof of safety and never permission to merge.
- Describe roadmap items as targets or planned work until the linked implementation and conformance tests exist.
- Keep arbitrary worker execution outside the control-plane host and disabled unless an external sandbox policy authorizes it.
- Use Zed for project-owned runtimes and fleet dependencies; keep `.zpkg.toml`, `.zpkg.lock`, and `.zed/environment.lock.toml` committed.
- Keep GitHub Actions immutable by pinning third-party actions and release downloads to reviewed digests.

## Repository-local Git worktrees

- Create or use a Git worktree only when the human operator explicitly authorizes it for the current task. Concurrency or a dirty checkout is not permission by itself.
- Put every authorized worktree at `<repository-root>/tmp/worktrees/<name>`; from the repository root, use `./tmp/worktrees/<name>`. Never place worktrees beside repositories or organization directories.
- Keep `tmp`, `temp`, `tmp/worktrees`, and `temp/worktrees` ignored in the repository-root `.gitignore`. Do not commit files from those directories.
- Relocate or remove a worktree only when the operator explicitly requests it. Before removal, preserve and publish intended changes, verify its commit is represented on the target branch, and confirm there are no tracked, untracked, ignored-sensitive, or in-use files that must survive. Remove it with `git worktree remove <path>` without `--force`; never delete a worktree directory with `rm`.
