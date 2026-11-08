// SAMPLE DATA. The tools below are invented placeholders so every page has content.
// Replace with real, verified listings (or the database) before launch.
import type { Industry, Problem, Tool } from "./types";

export const industries: Industry[] = [
  {
    name: "Restaurants & Cafes",
    short: "Restaurants",
    slug: "restaurants-cafes",
    intro_text:
      "Most restaurants lose money on missed phone calls and wasted stock, not on bad food. Hostly is our top pick: it answers the phone and takes bookings when your hands are full. Menuwise is the cheapest way to track food cost, and GlossPost handles social posts for free.",
    picks: { best_overall: "hostly", best_budget: "menuwise", best_free: "glosspost" },
    faq: [
      {
        q: "What is the best AI tool for a small restaurant?",
        a: "For most restaurants, an AI phone and booking assistant like Hostly pays back first. Missed calls are missed tables. Start there, then add stock tracking.",
      },
      {
        q: "Can AI answer my restaurant's phone?",
        a: "Yes, for routine calls: opening hours, bookings, directions, dietary questions. It hands off to a person when a caller asks for something it can't handle. Expect a few awkward calls in the first week while you tune it.",
      },
      {
        q: "How much do these tools cost for one location?",
        a: "Between $0 and $79 a month for the tools listed here. Most charge per location, not per seat, so a single cafe usually stays under $100 a month in total.",
      },
      {
        q: "Do I need a technical person to set them up?",
        a: "No. The tools in this list set up in under an hour and don't need code. Phone tools ask you to forward your number, which your phone provider can do in one call.",
      },
      {
        q: "Will AI replace my front-of-house staff?",
        a: "No. It covers the phone and the paperwork so staff can focus on guests. None of these tools seat people or carry plates.",
      },
    ],
  },
  {
    name: "Salons & Barbershops",
    short: "Salons",
    slug: "salons-barbershops",
    intro_text:
      "An empty chair is the most expensive thing in a salon. ChairFill is our top pick because it texts past clients to fill last-minute gaps. ReviewRelay is the cheap upgrade that gets more five-star reviews, and GlossPost is the best free option for posting your work.",
    picks: { best_overall: "chairfill", best_budget: "reviewrelay", best_free: "glosspost" },
    faq: [
      {
        q: "What is the best AI tool for a salon?",
        a: "ChairFill, if empty slots are your problem. It sends gap-filling texts to clients who are due for a visit. If your calendar is already full, start with ReviewRelay instead.",
      },
      {
        q: "Can AI manage my booking calendar?",
        a: "It can fill and reshuffle it, but your booking software stays in charge. ChairFill connects to common booking systems rather than replacing them.",
      },
      {
        q: "Is it safe to text clients automatically?",
        a: "Only text clients who have agreed to messages. The tools here include opt-out handling, but consent is your responsibility. Check your local rules on marketing texts.",
      },
      {
        q: "Are there free AI tools for barbershops?",
        a: "Yes. GlossPost has a free plan for social posts, and Ledgerly has one for invoicing. Free plans usually limit volume, not features.",
      },
      {
        q: "How do I get more Google reviews without being pushy?",
        a: "Ask right after the appointment, when the client is happiest. ReviewRelay sends one polite request by text and one reminder. That's it.",
      },
    ],
  },
  {
    name: "Medical & Dental Clinics",
    short: "Clinics",
    slug: "medical-dental-clinics",
    intro_text:
      "Clinics spend hours on notes and no-shows. ChartNote is our top pick: it turns a recorded visit into a draft note you review and sign. ReviewRelay is the budget pick for reputation, and Ledgerly is the best free option for billing paperwork.",
    picks: { best_overall: "chartnote", best_budget: "reviewrelay", best_free: "ledgerly" },
    faq: [
      {
        q: "Is AI allowed to handle patient information?",
        a: "Only if the vendor signs a business associate agreement (BAA) or the local equivalent. ChartNote offers one. Ask for it in writing before you record a single visit.",
      },
      {
        q: "What is the best AI tool for a dental clinic?",
        a: "ChartNote for notes, ChairFill for reminders and recall texts. Together they cut the two biggest time sinks: charting and no-shows.",
      },
      {
        q: "Does AI make clinical decisions?",
        a: "No tool on this list does, and none should. They draft paperwork and send messages. A clinician reviews everything.",
      },
      {
        q: "How accurate are AI visit notes?",
        a: "Good enough to edit, not good enough to sign unread. Expect to fix names, doses, and anything said off-topic.",
      },
      {
        q: "What does it cost for a small practice?",
        a: "From $29 to $99 a month per provider for the paid tools here. Ledgerly has a free plan for the billing side.",
      },
    ],
  },
  {
    name: "Auto Repair",
    short: "Auto repair",
    slug: "auto-repair",
    intro_text:
      "Mechanics lose evenings to estimates and phone tag. BayWrite is our top pick: it turns a few spoken notes into a clean estimate and invoice. ReviewRelay is the budget pick, and ReplyDesk is the best free option for answering customer texts.",
    picks: { best_overall: "baywrite", best_budget: "reviewrelay", best_free: "replydesk" },
    faq: [
      {
        q: "What is the best AI tool for an auto repair shop?",
        a: "BayWrite. Writing estimates is the task that eats the most unpaid hours, and it's the one this tool does best.",
      },
      {
        q: "Can AI diagnose cars?",
        a: "Not the tools here. They handle the office side: estimates, invoices, texts, reviews. Diagnosis is still your job.",
      },
      {
        q: "Will customers mind getting texts from software?",
        a: "Most prefer a text to a voicemail. Keep messages short and sign them with the shop's name. ReplyDesk drafts replies you can approve first.",
      },
      {
        q: "Does it work with my shop management software?",
        a: "BayWrite exports to common accounting tools. Check the integration list on its page before you buy; shop systems vary a lot.",
      },
      {
        q: "Is there a free option?",
        a: "ReplyDesk and Ledgerly both have free plans. Neither is time-limited.",
      },
    ],
  },
  {
    name: "Real Estate",
    short: "Real estate",
    slug: "real-estate",
    intro_text:
      "Agents write the same listing copy and answer the same questions all day. ListLine is our top pick: it drafts listings and ads from your property notes. ReviewRelay is the budget pick for testimonials, and ReplyDesk is the best free option for lead replies.",
    picks: { best_overall: "listline", best_budget: "reviewrelay", best_free: "replydesk" },
    faq: [
      {
        q: "What is the best AI tool for realtors?",
        a: "ListLine for listing copy and ads. It saves the most time per week for solo agents.",
      },
      {
        q: "Can AI write listing descriptions legally?",
        a: "It can draft them. You are still responsible for accuracy and fair housing rules, so read every line before publishing.",
      },
      {
        q: "Will AI answer buyer inquiries for me?",
        a: "ReplyDesk drafts replies to portal and website leads. Fast replies win leads, but have a person take over once a buyer is serious.",
      },
      {
        q: "How much should I spend?",
        a: "One tool at $39 a month is enough to start. Add a second only when the first has paid for itself.",
      },
      {
        q: "Can I use these for rentals?",
        a: "Yes. The same listing and reply tools work for property managers.",
      },
    ],
  },
  {
    name: "Ecommerce Stores",
    short: "Ecommerce",
    slug: "ecommerce-stores",
    intro_text:
      "Small online stores run into stock mistakes and slow replies first. ShelfSense is our top pick: it forecasts what to reorder from your sales. GlossPost is the budget pick for product posts, and ReplyDesk is the best free option for support emails.",
    picks: { best_overall: "shelfsense", best_budget: "glosspost", best_free: "replydesk" },
    faq: [
      {
        q: "What is the best AI tool for a small online store?",
        a: "ShelfSense, if you carry stock. Overstock ties up cash and stockouts lose sales; it helps with both.",
      },
      {
        q: "Does it work with Shopify and WooCommerce?",
        a: "ShelfSense connects to both. Check the tool page for the full list before you commit.",
      },
      {
        q: "Can AI answer customer emails?",
        a: "Yes, for order status, returns, and shipping questions. ReplyDesk drafts answers from your store policies and you approve them.",
      },
      {
        q: "Is it worth it for a store with 50 products?",
        a: "Probably not for forecasting. Use the free plans first: GlossPost and ReplyDesk cost nothing.",
      },
      {
        q: "Will AI product descriptions hurt my search ranking?",
        a: "Generic copy won't help. Edit every draft so it says something only your product can say.",
      },
    ],
  },
];

export const problems: Problem[] = [
  {
    name: "Bookings",
    slug: "bookings",
    intro_text:
      "Every missed call or unanswered message is a booking you didn't get. These tools take reservations and appointments, fill gaps, and cut no-shows.",
  },
  {
    name: "Reviews",
    slug: "reviews",
    intro_text:
      "Most happy customers never leave a review unless someone asks. These tools ask at the right moment and help you answer what comes back.",
  },
  {
    name: "Social media",
    slug: "social-media",
    intro_text:
      "Posting is easy to skip when you are busy. These tools draft and schedule posts from photos and notes you already have.",
  },
  {
    name: "Marketing & ads",
    slug: "marketing-ads",
    intro_text:
      "You do not need an agency to write a decent ad. These tools draft copy, emails and listings that you can edit and send.",
  },
  {
    name: "Accounting & invoicing",
    slug: "accounting-invoicing",
    intro_text:
      "Late invoices mean late money. These tools write invoices, chase payments and sort receipts so the books are ready at tax time.",
  },
  {
    name: "Customer messaging",
    slug: "customer-messaging",
    intro_text:
      "Customers want a quick answer by text or email. These tools draft replies, answer common questions and hand tricky ones to you.",
  },
  {
    name: "Staff & scheduling",
    slug: "staff-scheduling",
    intro_text:
      "Rotas take longer than they should. These tools build shift schedules around availability, labour cost and busy periods.",
  },
  {
    name: "Inventory",
    slug: "inventory",
    intro_text:
      "Too much stock ties up cash; too little loses sales. These tools track what you hold and predict what to reorder.",
  },
  {
    name: "Website",
    slug: "website",
    intro_text:
      "A basic site that loads fast and lists your hours and prices beats no site. These tools build and maintain one with little effort.",
  },
  {
    name: "Documents",
    slug: "documents",
    intro_text:
      "Notes, estimates and forms pile up. These tools turn speech and rough input into clean paperwork you can review and file.",
  },
];

export const tools: Tool[] = [
  {
    name: "Hostly",
    slug: "hostly",
    website_url: "https://example.com/hostly",
    affiliate_url: "https://example.com/hostly?ref=bestaistack",
    tagline: "Answers the restaurant phone and takes bookings.",
    description:
      "Hostly picks up calls when your team is busy. It answers questions about hours, menu and parking, and writes bookings straight into your table book. Calls it can't handle go to your mobile.",
    limitations:
      "Struggles with heavy accents and noisy kitchens in the background. Large party and event enquiries still need a person. Priced per location.",
    industries: ["restaurants-cafes"],
    problems: ["bookings", "customer-messaging"],
    pricing_model: "subscription",
    starting_price_usd: 79,
    has_free_plan: false,
    logo_url: null,
    featured: true,
    status: "published",
    created_at: "2026-09-12",
    updated_at: "2026-11-03",
  },
  {
    name: "Menuwise",
    slug: "menuwise",
    website_url: "https://example.com/menuwise",
    affiliate_url: null,
    tagline: "Tracks food cost and builds staff rotas.",
    description:
      "Menuwise reads your supplier invoices, works out the cost of each dish, and flags items that are losing money. The same account builds weekly staff rotas from availability and expected covers.",
    limitations:
      "Invoice scanning works best with printed supplier invoices. Handwritten delivery notes are often misread.",
    industries: ["restaurants-cafes"],
    problems: ["inventory", "staff-scheduling"],
    pricing_model: "freemium",
    starting_price_usd: 29,
    has_free_plan: true,
    logo_url: null,
    featured: true,
    status: "published",
    created_at: "2026-08-20",
    updated_at: "2026-10-28",
  },
  {
    name: "ChairFill",
    slug: "chairfill",
    website_url: "https://example.com/chairfill",
    affiliate_url: "https://example.com/chairfill?ref=bestaistack",
    tagline: "Texts past clients to fill empty appointment slots.",
    description:
      "ChairFill watches your calendar. When a slot opens up, it texts clients who are due for a visit and lets them book in one tap. It also sends reminders to cut no-shows.",
    limitations:
      "You need client phone numbers with consent to text. It connects to a few popular booking systems only, so check yours is on the list.",
    industries: ["salons-barbershops", "medical-dental-clinics"],
    problems: ["bookings", "customer-messaging"],
    pricing_model: "subscription",
    starting_price_usd: 49,
    has_free_plan: false,
    logo_url: null,
    featured: true,
    status: "published",
    created_at: "2026-10-02",
    updated_at: "2026-11-05",
  },
  {
    name: "GlossPost",
    slug: "glosspost",
    website_url: "https://example.com/glosspost",
    affiliate_url: null,
    tagline: "Turns your photos into scheduled social posts.",
    description:
      "Upload a few photos and a line about each one. GlossPost writes captions in your voice, picks hashtags and schedules posts for the week. Good for salons, cafes and small shops.",
    limitations:
      "Free plan allows 10 posts a month and one account. Captions sound similar after a while, so rewrite a few yourself.",
    industries: ["salons-barbershops", "restaurants-cafes", "ecommerce-stores"],
    problems: ["social-media", "marketing-ads"],
    pricing_model: "freemium",
    starting_price_usd: 19,
    has_free_plan: true,
    logo_url: null,
    featured: false,
    status: "published",
    created_at: "2026-07-14",
    updated_at: "2026-10-15",
  },
  {
    name: "ChartNote",
    slug: "chartnote",
    website_url: "https://example.com/chartnote",
    affiliate_url: "https://example.com/chartnote?ref=bestaistack",
    tagline: "Turns a recorded visit into a draft clinical note.",
    description:
      "Record the appointment, and ChartNote produces a structured draft note for you to review, edit and sign. It signs a business associate agreement and stores audio for 30 days at most.",
    limitations:
      "Always check drug names, doses and dates. It does not integrate with every records system, so some practices copy and paste the note.",
    industries: ["medical-dental-clinics"],
    problems: ["documents"],
    pricing_model: "subscription",
    starting_price_usd: 99,
    has_free_plan: false,
    logo_url: null,
    featured: true,
    status: "published",
    created_at: "2026-10-19",
    updated_at: "2026-11-06",
  },
  {
    name: "BayWrite",
    slug: "baywrite",
    website_url: "https://example.com/baywrite",
    affiliate_url: null,
    tagline: "Speak a few notes, get a clean estimate and invoice.",
    description:
      "Talk through the job on your phone. BayWrite turns it into an itemised estimate with parts and labour, gets customer approval by text, then converts it to an invoice when the job is done.",
    limitations:
      "Parts prices come from the catalogues you connect. Without one, you'll type prices in yourself. No built-in payment processing yet.",
    industries: ["auto-repair"],
    problems: ["accounting-invoicing", "documents"],
    pricing_model: "subscription",
    starting_price_usd: 59,
    has_free_plan: false,
    logo_url: null,
    featured: false,
    status: "published",
    created_at: "2026-09-02",
    updated_at: "2026-10-21",
  },
  {
    name: "ListLine",
    slug: "listline",
    website_url: "https://example.com/listline",
    affiliate_url: "https://example.com/listline?ref=bestaistack",
    tagline: "Drafts listings, ads and a one-page site per property.",
    description:
      "Enter the property details and a few notes. ListLine drafts the listing text, social ad copy and a simple one-page property site. You edit, then publish.",
    limitations:
      "It does not check fair housing language. Read every draft yourself. Photo editing is basic.",
    industries: ["real-estate"],
    problems: ["marketing-ads", "website", "documents"],
    pricing_model: "subscription",
    starting_price_usd: 39,
    has_free_plan: false,
    logo_url: null,
    featured: false,
    status: "published",
    created_at: "2026-08-05",
    updated_at: "2026-10-09",
  },
  {
    name: "ShelfSense",
    slug: "shelfsense",
    website_url: "https://example.com/shelfsense",
    affiliate_url: null,
    tagline: "Predicts what to reorder from your sales history.",
    description:
      "ShelfSense connects to your store, learns your sales pattern, and tells you what to reorder and when. It accounts for seasons, supplier lead times and minimum order sizes.",
    limitations:
      "Needs at least six months of sales data to be useful. Free plan covers 50 products.",
    industries: ["ecommerce-stores"],
    problems: ["inventory"],
    pricing_model: "freemium",
    starting_price_usd: 25,
    has_free_plan: true,
    logo_url: null,
    featured: false,
    status: "published",
    created_at: "2026-06-18",
    updated_at: "2026-10-30",
  },
  {
    name: "Ledgerly",
    slug: "ledgerly",
    website_url: "https://example.com/ledgerly",
    affiliate_url: null,
    tagline: "Invoices, receipts and payment reminders on autopilot.",
    description:
      "Ledgerly writes invoices from a short description, sorts receipts into categories and sends polite payment reminders. The free plan covers up to 5 invoices a month.",
    limitations:
      "It's not a full accounting package. Hand the exported records to your accountant at tax time.",
    industries: [
      "restaurants-cafes",
      "salons-barbershops",
      "medical-dental-clinics",
      "auto-repair",
      "real-estate",
      "ecommerce-stores",
    ],
    problems: ["accounting-invoicing"],
    pricing_model: "freemium",
    starting_price_usd: 15,
    has_free_plan: true,
    logo_url: null,
    featured: false,
    status: "published",
    created_at: "2026-05-27",
    updated_at: "2026-09-30",
  },
  {
    name: "ReviewRelay",
    slug: "reviewrelay",
    website_url: "https://example.com/reviewrelay",
    affiliate_url: "https://example.com/reviewrelay?ref=bestaistack",
    tagline: "Asks happy customers for Google reviews, by text.",
    description:
      "ReviewRelay sends one polite request after each visit and one reminder. It drafts replies to the reviews you get, which you approve before they post.",
    limitations:
      "It can't remove bad reviews, and it won't send requests to anyone without a phone number on file. Review-gating is not supported, on purpose.",
    industries: [
      "restaurants-cafes",
      "salons-barbershops",
      "medical-dental-clinics",
      "auto-repair",
      "real-estate",
    ],
    problems: ["reviews"],
    pricing_model: "subscription",
    starting_price_usd: 29,
    has_free_plan: false,
    logo_url: null,
    featured: false,
    status: "published",
    created_at: "2026-07-30",
    updated_at: "2026-10-12",
  },
  {
    name: "ReplyDesk",
    slug: "replydesk",
    website_url: "https://example.com/replydesk",
    affiliate_url: null,
    tagline: "Drafts replies to customer texts and emails.",
    description:
      "ReplyDesk learns from your past answers and your policy pages, then drafts replies to new messages. You approve with one tap. It can also book simple appointments.",
    limitations:
      "Free plan covers 100 messages a month. Replies to angry customers need your own words.",
    industries: ["auto-repair", "real-estate", "ecommerce-stores"],
    problems: ["customer-messaging", "bookings"],
    pricing_model: "freemium",
    starting_price_usd: 20,
    has_free_plan: true,
    logo_url: null,
    featured: false,
    status: "published",
    created_at: "2026-10-24",
    updated_at: "2026-11-02",
  },
  {
    name: "Sitewell",
    slug: "sitewell",
    website_url: "https://example.com/sitewell",
    affiliate_url: null,
    tagline: "Builds a simple local business website in an afternoon.",
    description:
      "Answer ten questions about your business and Sitewell builds a fast site with your hours, prices, map and a contact form. One payment covers the build; hosting is separate.",
    limitations:
      "Not suitable if you need online ordering or a shop. Design choices are limited on purpose.",
    industries: [
      "salons-barbershops",
      "auto-repair",
      "restaurants-cafes",
      "medical-dental-clinics",
    ],
    problems: ["website"],
    pricing_model: "one-time",
    starting_price_usd: 149,
    has_free_plan: false,
    logo_url: null,
    featured: false,
    status: "published",
    created_at: "2026-10-30",
    updated_at: "2026-11-04",
  },
];
