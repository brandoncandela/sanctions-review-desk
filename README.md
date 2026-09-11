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

Built with AI assistance. The portfolio value is the investigation structure, explicit evidence gaps and reviewable reasoning; effectiveness has not been validated in a production compliance team.

## Corrections and reviewer handoff

Returned submissions now include an analyst response. A response is required before resubmission and stays with the earlier review. QC displays changed assessment fields and a before/after comparison of the current draft. Exported Markdown reports include the actual pinned synthetic evidence, selected information requests, submitted assessments, findings and responses. Existing version 1 files remain supported; older returned cases can have a response added after opening.

## Evidence request tracker

Selected information requests have a status and response/rationale field. Track not sent, requested, received but unverified, reviewed sufficient, or reviewed insufficient. The tracker does not send requests or authenticate documents. Reviewed entries require a rationale before QC submission; incomplete drafts can still be saved and reopened. Tracker updates appear in reports and submission comparisons.

## Custom cases and evidence-backed comparisons

Create an individual or business case with party identifiers, a review trigger, optional shipment context, manually recorded screening source, entry reference and screening date. Record two source notes: party information and the screening record. This does not retrieve a list or confirm a designation. Use public or fictional information in this prototype.

Each comparison now supports a reason and an evidence reference. New custom cases require these before QC submission. Reports retain both pinned evidence and source notes cited by comparisons. Intake facts are fixed after creation to keep the context of submitted reviews stable; create a new case to correct intake facts.

Version 2 portable files carry custom definitions alongside assessments and QC history. Older version 1 training-case files remain supported. Unknown case IDs, duplicate custom IDs, invalid dates, missing screening provenance and dangling evidence references are rejected. Maximum 20 custom cases and 2 MB per workspace export. Case files remain local downloads; no hosted case database or verified user roles are provided.
