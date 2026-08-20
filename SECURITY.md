# Security policy

Please report suspected vulnerabilities through the repository's private
GitHub Security Advisory form. Do not open a public issue for an unpatched
vulnerability and do not include credentials, customer traffic, or generated
source bundles in a report.

Praxonne treats every generated bundle as untrusted. HTTP status `200..=302`
only makes a successful candidate eligible for a feature branch and draft pull
request. It does not authorize a merge, deployment, or broader access.

This marketing repository contains no runtime service and accepts no secrets.
If a workflow ever requests a long-lived provider or GitHub token, treat that
as a security regression.
