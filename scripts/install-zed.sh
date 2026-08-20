#!/usr/bin/env bash
set -euo pipefail

version="0.2.3"
platform=""
sha256=""

case "$(uname -s)-$(uname -m)" in
  Linux-x86_64)
    platform="x86_64-unknown-linux-gnu"
    sha256="b8f81a8e4943cbaeb47153386819a911dcf02666a8709c5bd013e4f35b1ba1b9"
    ;;
  Linux-aarch64|Linux-arm64)
    platform="aarch64-unknown-linux-gnu"
    sha256="0c18a5f9b14347eef5bcd10d1842d91472d944d204ecb566c0fbbf96c9c45f71"
    ;;
  Darwin-arm64)
    platform="aarch64-apple-darwin"
    sha256="46052288d8a5ca178e7f942aeb03197022416ce13c3ac4ebd0fea66963977e62"
    ;;
  *)
    printf 'unsupported Zed bootstrap platform: %s\n' "$(uname -s)-$(uname -m)" >&2
    exit 1
    ;;
esac

archive="zed-${platform}.tar.gz"
url="https://github.com/zed-pkg/zed-cli/releases/download/v${version}/${archive}"
install_dir="${ZED_INSTALL_DIR:-.zed/bin}"
temporary_dir="$(mktemp -d "${TMPDIR:-/tmp}/praxonne-zed.XXXXXX")"
trap 'rm -rf -- "$temporary_dir"' EXIT

curl --fail --location --silent --show-error \
  --proto '=https' --tlsv1.2 --retry 3 \
  --output "${temporary_dir}/${archive}" "${url}"
printf '%s  %s\n' "${sha256}" "${temporary_dir}/${archive}" | shasum -a 256 --check
tar -xzf "${temporary_dir}/${archive}" -C "${temporary_dir}"
mkdir -p "${install_dir}"
install -m 0755 "${temporary_dir}/zed" "${install_dir}/zed"
"${install_dir}/zed" --version
