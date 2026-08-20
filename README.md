# Praxonne marketing site

The static Astro site for `https://praxonne.github.io`. It explains Praxonne's
forward/reverse proxy architecture, child-process request lifecycle, guarded AI
generation loop, repository map, and security model.

The site intentionally has no Jekyll/Hugo layer, Flutter runtime, analytics,
third-party fonts, or client-side JavaScript. Flutter remains a product client;
adding it to this static build would increase the supply-chain surface without
improving the public site.

## Reproducible toolchain

Zed owns the project Node.js runtime. The Zed binary itself is downloaded by
`scripts/install-zed.sh` from a fixed release and verified against a committed
SHA-256 before use. Astro dependencies remain locked by the native pnpm lock.

```bash
bash scripts/install-zed.sh
export PATH="$PWD/.zed/bin:$PATH"
zed validate --require-lock
zed install --frozen
zed install --frozen --cli nodejs@24.19.0
export PATH="$PWD/.zed/tools/bin:$PATH"
corepack pnpm install --frozen-lockfile
corepack pnpm run check
```

Zed's project-owned CLI runtime catalog is currently GNU/Linux-only. On macOS,
use Node.js 24.19.0 and pnpm 11.19.0 locally while still running `zed validate`;
CI restores and verifies the locked Linux runtime.

## Deployment

GitHub Actions builds the immutable static artifact and deploys it through the
GitHub Pages OIDC workflow. The deploy job receives only `pages: write` and
`id-token: write`; the build job receives read-only repository access.
