#!/usr/bin/env bash
set -euo pipefail

if command -v zed >/dev/null 2>&1; then
  zed validate --require-lock
  zed install --frozen
fi

if command -v pnpm >/dev/null 2>&1; then
  pnpm run typecheck
  pnpm run build
  pnpm run test:site
elif command -v corepack >/dev/null 2>&1; then
  corepack pnpm run typecheck
  corepack pnpm run build
  corepack pnpm run test:site
else
  printf 'pnpm or corepack is required\n' >&2
  exit 1
fi
