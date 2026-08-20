# Agent rules

- Keep the site statically generated with Astro. Do not introduce Jekyll, Hugo, a server runtime, or client-side tracking.
- Treat generated code as untrusted. A `200..=302` response is an eligibility signal for a feature branch and draft pull request, never proof of safety and never permission to merge.
- Describe roadmap items as targets or planned work until the linked implementation and conformance tests exist.
- Keep arbitrary worker execution outside the control-plane host and disabled unless an external sandbox policy authorizes it.
- Use Zed for project-owned runtimes and fleet dependencies; keep `.zpkg.toml`, `.zpkg.lock`, and `.zed/environment.lock.toml` committed.
- Keep GitHub Actions immutable by pinning third-party actions and release downloads to reviewed digests.
