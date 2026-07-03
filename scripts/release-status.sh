#!/usr/bin/env bash
set -euo pipefail

repo="${GITHUB_REPOSITORY:-cyranoaladin/Qantara}"

section() {
  printf '\n== %s ==\n' "$1"
}

section "Git"
git status --short --branch
git log -1 --oneline --decorate

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

section "Environment templates"
for file in .env.example .env.vercel.example; do
  if [[ -f "$file" ]]; then
    echo "present: $file"
  else
    echo "missing: $file"
    exit 1
  fi
done

section "Tracked env files"
tracked_env_files="$(git ls-files | grep -E '(^|/)\.env(\.|$)' || true)"
if [[ -n "$tracked_env_files" ]]; then
  unsafe_env_files="$(printf '%s\n' "$tracked_env_files" | grep -v -E '^\.env\.(example|vercel\.example)$' || true)"
  if [[ -n "$unsafe_env_files" ]]; then
    echo "$unsafe_env_files"
    echo "Unsafe environment file tracked."
    exit 1
  fi
fi
echo "No real environment file is tracked."

section "Secret scan"
pnpm audit:secrets
