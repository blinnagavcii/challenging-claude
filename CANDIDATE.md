# Frontend Lead Developer — Technical Exercise

Thanks for making the time. This should take **90 minutes and no more.** We mean
that literally — if you are still going at 90 minutes, stop and submit what you
have. Running over does not score better.

## Context

You have just joined the Luminara Living storefront team. The category listing
page in this repository was built in a hurry. It works, it ships, and nobody has
reviewed it. Your first job is to tell us what you would do about it.

## Use AI

Please do. Claude, Copilot, Cursor, whatever you normally reach for. We use these
tools daily and we would rather see how you work with them than watch you pretend
you don't. What we care about is what you do with the output.

## What to submit

### 1. A prioritised review — `REVIEW.md`

What is wrong with this codebase, **ranked by business impact**, with one or two
lines on each. Include the reasoning for the ranking, not just the list. If two
issues could be fixed the same way, say so.

Length is up to you, but a focused list beats an exhaustive one. We are more
interested in the order than in the count.

### 2. One to three fixes

Pick **one to three** issues from your list and fix them properly. No more than
three — which ones you pick, and how many, is part of the exercise. One fix done
well beats three done in a hurry. Open each fix as its own merge request against
`main`, with a description a colleague could review without asking you
questions.

Tests are welcome if a fix warrants them. They are not required.

### 3. Notes on how you worked — `NOTES.md`

Short and honest:

- Which AI tools you used and roughly how.
- What they flagged that was **wrong, incomplete, or misleading** — and how you
  worked out that it was.
- Anything you decided against doing, and why.
- Anything about the repository or this brief that struck you as odd.

This is the part we read most carefully. "The model suggested X, I checked and it
does not hold because Y" tells us more than a clean diff does.

## What happens next

A 60-minute conversation. You walk us through your ranking, defend the issues you
chose to fix, and we push on the ones you left out. Bring opinions — several of
the issues in here have more than one defensible answer, and we are more
interested in how you choose than in which answer you land on.

## Ground rules

- Do not rewrite the app. A rewrite is not a review.
- Do not fix everything. We are testing triage.
- The `mock-api/` stub stands in for a service another team owns. Say what you
  would ask them for; do not redesign it.

## Submitting

Push to a GitLab repository and grant read access to `suhaim.mohamed-lw`
