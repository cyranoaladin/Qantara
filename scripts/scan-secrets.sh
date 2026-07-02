#!/usr/bin/env bash
set -euo pipefail

allowed_env_file_pattern='^\.env\.(example|vercel\.example)$'
tracked_env_files="$(git ls-files | grep -E '(^|/)\.env(\.|$)' || true)"

if [[ -n "${tracked_env_files}" ]]; then
  while IFS= read -r file; do
    [[ -z "${file}" ]] && continue

    if [[ ! "${file}" =~ ${allowed_env_file_pattern} ]]; then
      echo "A real environment file is tracked: ${file}"
      exit 1
    fi
  done <<< "${tracked_env_files}"
fi

password_url_pattern='postgresql:'
password_url_pattern="${password_url_pattern}"'//[^"'\'' ]+:[^"'\'' ]+@'
openai_key_pattern='s''k-[A-Za-z0-9]{20,}'
github_classic_pattern='g''hp_[A-Za-z0-9]{20,}'
github_fine_grained_pattern='github''_pat_[A-Za-z0-9_]{20,}'
resend_key_pattern='r''e_[A-Za-z0-9_=-]{24,}'
secret_key_pattern="(${openai_key_pattern}|${github_classic_pattern}|${github_fine_grained_pattern}|${resend_key_pattern})"

if git grep -nE "(${password_url_pattern}|${secret_key_pattern})" -- \
  ':!README.md' \
  ':!.env.example' \
  ':!docs/**'; then
  echo "Potential hardcoded credential found."
  exit 1
fi

resend_var='RESEND_API''_KEY'
admin_var='ADMIN''_TOKEN'
assigned_secret_pattern="(${resend_var}|${admin_var})[[:space:]]*=[[:space:]]*[\"']?[A-Za-z0-9_+=/-]{16,}"

if git grep -nE "${assigned_secret_pattern}" -- \
  ':!README.md' \
  ':!.env.example' \
  ':!docs/**'; then
  echo "Potential assigned secret found."
  exit 1
fi

echo "Secret scan passed."
