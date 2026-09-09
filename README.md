# Sanctions Review Desk

An independent AML portfolio work sample for sanctions alert investigation and QC. All parties, identifiers, candidate matches and documents are fictional. This is not live screening, legal advice, a sanctions determination or shipment authorization. No affiliation with Apple or any regulator.

## What you can do

- Work through three fictional cases: a California → Hong Kong → Shenzhen shipment amendment, an individual identity comparison, and a Vietnam → China shipment with a third-party payer.
- Compare identity attributes and record whether each supports, challenges or leaves the possible match unresolved.
- Inspect synthetic source records, pin evidence and select information requests.
- Distinguish sanctions questions from export-control and diversion questions.
- Write an assessment, alternatives and disposition rationale.
- Submit a preserved assessment snapshot for QC, return it for correction, or record a documentation-review outcome. Later edits do not inherit the review.
- Download and reopen all case reviews as JSON, or export a case report.

The app helps demonstrate a review process. It does not search sanctions lists, calculate ownership restrictions, classify products, screen countries, enforce independent reviewers or authorize transactions. Names and timestamps in imported files are not authenticated. Notes stay in the tab until explicitly downloaded. The prototype is intended for fictional training data, not confidential investigations.

## Run locally

Node 22.13+ and pnpm are required.

```sh
pnpm install
pnpm dev
```

Open the local URL printed by the development server. Production build: `pnpm build`.

Validation:

```sh
pnpm exec tsc --noEmit
node --experimental-strip-types --test tests/cases.test.ts
```

## Methodology and references

The fictional cases are editorial training scenarios, not examples of actual sanctions violations. Geographic routing does not establish a prohibition. Product classification, jurisdiction, parties, end use and applicable authorizations require fact-specific review.

Official guidance consulted September 9, 2026:

- [OFAC FAQ 5: assessing name matches](https://ofac.treasury.gov/faqs/5)
- [OFAC FAQ 401: ownership and the 50 Percent Rule](https://ofac.treasury.gov/faqs/401)
- [BIS freight forwarder guidance](https://www.bis.gov/learn-support/export-compliance-programs/freight-forwarder-guidance)

The acronym CAR is intentionally not used: the interview-specific meaning has not yet been established.

Built with AI assistance. The portfolio value is the investigation structure, explicit evidence gaps and reviewable reasoning; effectiveness has not been validated in a production compliance team.

## Corrections and reviewer handoff

Returned submissions now include an analyst response. A response is required before resubmission and stays with the earlier review. QC displays changed assessment fields and a before/after comparison of the current draft. Exported Markdown reports include the actual pinned synthetic evidence, selected information requests, submitted assessments, findings and responses. Existing version 1 files remain supported; older returned cases can have a response added after opening.
