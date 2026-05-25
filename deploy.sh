#!/bin/bash
npm run build && npx wrangler pages deploy out --project-name=depression-personality-test --commit-dirty=true
