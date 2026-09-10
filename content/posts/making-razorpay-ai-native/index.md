---
title: "Making Razorpay AI native"
date: 2026-09-09T08:00:00Z
draft: false
author: "Chetty Arun"
description: "Buying AI tools is easy. Getting an org to actually build with them is the hard part. How we've been doing that at Razorpay."
---

Most companies buy AI tools and call it transformation. I don't think that's how this works.

Access matters. Models matter. Agents matter. But if the culture still treats AI as a side project for a few engineers (and a slide in the all-hands), none of it sticks.

If you want an AI-native org, the hard part is not the stack. The hard part is getting thousands of people to build with it in their real jobs. Sales. Finance. CS. Legal. Design. HR. Until it stops feeling like a program and starts feeling like how work gets done.

That is culture change. And that's what we've been trying to do at Razorpay for the better part of a year.

Anthropic put out a useful frame recently in their [economic scenarios work](https://www.anthropic.com/institute/econ-scenarios): every job is a bundle of tasks. AI will augment some of those tasks. It will fully automate some. And new tasks will show up that didn't exist before.

I think every company has to figure that out, function by function. What does AI augment in design? What does it automate in HR? What new work appears for sales once agents take the grunt work? That can't be a central AI team's homework alone. The design head has to do it for design. The HR head for HR. Sales leadership for sales. And so on.

But leaders can only do that redesign if they (and their teams) are actually mature with AI. Not "I've seen a demo" mature. Hands-on. Building. Judging what good looks like. That's the culture work.

A big part of my last year at Razorpay was helping set that up: access for everyone, enablement on real jobs, leaders going first, and enough visible building that the org could start answering those questions for itself.

In August we ran Day0 (#FeelTheAGI), our company hackathon. More than 1,500 people registered. Hundreds of teams shipped working prototypes. Sales, finance, CS, legal, engineering, design. Same bar for everyone.

Day0 looked like an event. For me it was the exam after a year of class. Here's how we got there.

#### Give everyone access first

We didn't wait for every team to invent their own setup. Everyone got open-weight models and a custom harness we call Razorpay Cowork. The MCPs and connectors each function needed were built centrally. Sales needed CRM on day one? It was already plugged in. A new joiner opened their laptop and the harness was waiting.

Skills were maintained centrally too. If one team built something useful, everybody else could use it. One person's agent became the org's agent.

And none of this was just operational. It was democratised. We didn't ask people across the org to raise an IT ticket to try this custom harness with open models. It was available to everyone by default.

#### Teach it on their actual jobs

Most business teams had never done agentic work. Pointing them at ChatGPT and saying "go" does almost nothing.

Asking ChatGPT to draft an email or rewrite a doc is useful. It is not agentic work. Agentic work is the agent taking a goal, using your tools, chaining steps, and coming back with something done. Most people had never seen that land in their own job. So we had to break that barrier on purpose. Show them the real thing. Show what it can do when it has connectors and a workflow. And get people thinking agentically about their own mess: what would I hand an agent if I could?

So we went team by team. Hands-on. Their tools. Their mess.

For Talent Acquisition we showed agents that find and filter candidates. For sales we showed a connector to the CRM and the data lake so they could fetch customer details and analyse trends automatically on a schedule.

The point was not a generic AI masterclass. The point was: this is how *your* work changes.

#### Make building visible

We ran weekly Show & Tell sessions where anyone could present what they'd built. One week it was a MoM generator from the sales team. The next it was a PRD reviewer from a PM. Employee-led. Practical. No stage production needed.

Local teams ran their own show-and-tells too. Each team had a place to stash what they built, a day in the week to showcase it, and a Slack channel to show off work.

Champions showed up on their own. People started teaching each other. Founders started monthly sessions highlighting interesting builds they'd seen.

That's when it stopped feeling like a central program and started feeling like the org just… builds.

I wrote about an earlier version of this on [X](https://x.com/ChettyArun/status/1962479435329986791). The pattern has only gotten stronger since.

#### Leaders go first

I've written before about [hands-on leadership](https://chettyarun.com/posts/handson-leadership/). AI makes that non-negotiable.

You can't ask your org to build with AI while leaders only review decks about AI.

Last year we ran a leadership AI hackathon. Every leader from Finance to HR built something. No spectators. [Harshil wrote about it](https://x.com/harshilmathur/status/1936010231236194762).

This year at Day0 we did it again. Leaders went first. Then they mentored org teams. They sat with people before the event. They ran brainstorming sessions for folks who still had no idea. They posted problem statements and bounties on the portal. And they stayed on the floor for the three build days.

#### Hackathons as proof, not theater

I've always believed hackathons shouldn't be engineering-only. I wrote about that back in 2023 in [Hackathons for business teams](https://chettyarun.com/posts/Hackathon-for-business-teams/). Day0 was that idea at full scale.

A few things that mattered for us:

* Registration was an idea doc, not a form. An AI agent scored ideas and left comments so teams could refine before Day 1.
* Working prototypes only. Code plus a short pitch video. No slideware.
* AI judging first, then human rounds. Same bar across functions.
* Leadership bounties on top of the main prize pool. Weird, fun prizes from leaders' own budgets. So more people had a reason to build even if they weren't chasing the overall win.

The event was the last step of enablement, not the first. That's why 1,500 people could show up and actually ship.

#### In conclusion

Tools will keep changing. Models will keep getting cheaper. The orgs that win will be the ones whose people already know how to build when the next model drops.

If you're trying to make your company AI-native, start with culture. The stack follows.

Feel free to ping me on [Twitter/X](https://twitter.com/ChettyArun) if you want to nerd out on any of this.

<br>

---

Hope you enjoyed the read! If you have feedback or a different perspective, I'd love to know. Catch me on [Twitter/X](https://twitter.com/ChettyArun) or mail me at [me@chettyarun.com](mailto:me@chettyarun.com?Subject=Feedback) Thanks!

*The thoughts are Chetty Arun's, but he used [Hoid](https://chettyarun.com/posts/introducing-hoid/) - his blog writing agent - to shape and publish this post.*
