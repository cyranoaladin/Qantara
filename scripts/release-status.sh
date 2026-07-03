#!/usr/bin/env bash
set -euo pipefail

repo="${GITHUB_REPOSITORY:-cyranoaladin/Qantara}"

section() {
  printf '\n== %s ==\n' "$1"
}

has_authenticated_gh() {
  command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1
}

section "Git"
git status --short --branch
git log -1 --oneline --decorate

if has_authenticated_gh; then
  section "Open pull requests"
  gh pr list --repo "$repo" --state open --limit 30

  section "Open issues"
  gh issue list --repo "$repo" --state open --limit 30

  section "Recent main push runs"
  gh run list --repo "$repo" --branch main --event push --limit 8

  section "Main branch protection"
  gh api "repos/${repo}/branches/main/protection" --jq '{
    strict: .required_status_checks.strict,
    contexts: .required_status_checks.contexts,
    enforce_admins: .enforce_admins.enabled,
    conversation_resolution: .required_conversation_resolution.enabled,
    force_pushes: .allow_force_pushes.enabled,
    deletions: .allow_deletions.enabled
  }' || true
else
  section "GitHub"
  echo "GitHub CLI is unavailable or unauthenticated; skipping remote status."
fi

section "Environment templates"
for file in .env.example .env.vercel.example; do
  if [[ -f "$file" ]]; then
    echo "present: $file"
  else
    echo "missing: $file"
    exit 1
  fi
done

section "Secret scan and env tracking"
pnpm audit:secrets
