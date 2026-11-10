# Competition context: Sustainova 2026

This file explains the event this project is first being presented at. It is background for the agent. It is not a spec. The project is meant to outlive the event.

1. Event: SUSTAINOVA 2026 Ideathon, theme "Innovation for a Sustainable Future - 17 SDGs". Organised by the SPECTRA Club, Dept. of Computer Science and Engineering, Acropolis Institute of Technology and Research (AITR), Indore.

2. Our domain: Biodiversity and Forest Conservation (domain 15). Relevant SDG: SDG 15, Life on Land (protect forests, wildlife and biodiversity). SDG 16 (justice, accountable institutions) and SDG 17 (partnerships) also apply because the output is meant to be handed to enforcement bodies.

3. Our problem: illegal wildlife trade now happens largely through online listings on marketplaces and social platforms. Sellers use coded and changing terms, so keyword filters stop working quickly. We are building a detection system that flags such listings.

4. Our team: 4 members. The event allows up to 5.

5. Event format: Round 1 is online. It needs a PPT in the prescribed format and a video of at most 2 minutes. Deadline for both is 18 November 2026 (window opens 4 November). Both are compulsory.

6. Round 2 is offline, on 26 November 2026, for shortlisted teams. Teams present to judges and then face Q&A. A working prototype is optional but allowed and helps. Participation fee is Rs 250 per team, only if shortlisted. Venue is announced later.

7. Required PPT sections, in order: team description and domain; problem statement; proposed solution and innovation; tech stack and system architecture; feasibility, viability and future roadmap; SDG alignment and sustainability impact.

8. Judging criteria: innovation and creativity; SDG awareness and relevance; problem-solving (genuine problem, real understanding of its challenges); technical feasibility (practical, can be developed further); entrepreneurial mindset and social impact (can it become a real project or startup with lasting benefit); presentation and handling of Q&A.

9. The organisers say explicitly that a team should not just say "build an app". We must show that we understand the problem, how the solution works in practice, and what change it creates.

10. How to use this event in our work: the competition is a deadline and a first audience, nothing more. Do not cut scope, fake results or hardcode demos to fit a 2-minute video. Build the real thing and let the demo be an honest slice of it.

11. Real-world goal: the system should be usable by people who actually fight wildlife crime, such as forest departments, wildlife crime control bureaus, NGOs and platform trust-and-safety teams. Design choices should be judged by whether they would hold up in that setting.

12. What that means in practice: prefer measured, reproducible evaluation over impressive-looking numbers. Report precision and recall on held-out data, and be clear about where the model fails. False positives waste investigators' time and can wrongly accuse legitimate sellers, so keep a human review step before any report is made. Keep outputs explainable (why a listing was flagged). Plan for coded terms drifting over time, so retraining and new-term discovery should be part of the design, not an afterthought.

13. Data and ethics: use only public, lawfully accessible data and respect platform terms. Do not store personal data about sellers beyond what a report needs. Do not build anything that publishes accusations automatically.

14. Reach: India first (Indore context, Indian species and languages including Hindi and Hinglish listings), but keep the design language-agnostic so it can extend elsewhere. The team's wider goal is free-to-use tools for communities that lack resources, so avoid designs that need expensive infrastructure.

15. Constraints to keep in mind: small student team, limited compute (a laptop with a 4GB GPU is the main dev machine), and about two weeks before the Round 1 deadline. Prefer small, efficient models and free-tier tooling. Prioritise a working end-to-end pipeline over model size.

16. Source documents, kept outside the repo in the team Drive folder: SUSTAINOVA_2026_Ideathon_Guide.pdf and "0 PPT Format-Sustainova" (pptx and pdf). If any detail here conflicts with those files, the files win.

17. When unsure whether a decision serves the competition or the real project, choose the real project, as long as the Round 1 deliverables still get submitted on time.
