# OFAC data

This orphan branch holds `ofac-sdn.json`, the hourly copy of the official OFAC SDN and alias files. The `Refresh official OFAC data` workflow on `main` updates it, and the live demo reads it from:

https://raw.githubusercontent.com/brandoncandela/sanctions-review-desk/data/ofac-sdn.json

The search refuses a copy older than 24 hours. Keeping these commits here keeps `main` history readable.
