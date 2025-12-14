# Content Editing Guide

This guide will help you edit and update the content on your portfolio website without touching any HTML, CSS, or JavaScript code.

## Overview

All website content is stored in a single file: **`content.json`**

This file contains:
- Your profile information
- All case studies
- Experience timeline
- "How I Work" philosophy
- Tech stack/tools

## How to Edit Content

### 1. Basic Profile Information

Open `content.json` and find the `"profile"` section at the top:

```json
"profile": {
  "name": "Theo Yeh",
  "title": "Staff Product Manager",
  "location": "San Francisco Bay Area",
  "email": "PLACEHOLDER_EMAIL",
  "linkedin": "PLACEHOLDER_LINKEDIN",
  "resumePdf": "PLACEHOLDER_RESUME.pdf"
}
```

**To update:**
- Replace `PLACEHOLDER_EMAIL` with your actual email
- Replace `PLACEHOLDER_LINKEDIN` with your LinkedIn URL
- Replace `PLACEHOLDER_RESUME.pdf` with the filename of your resume PDF (place the PDF file in the same folder as `index.html`)

### 2. Hero Metrics (Homepage)

Find the `"heroMetrics"` array in the `"profile"` section:

```json
"heroMetrics": [
  {
    "value": "$25M",
    "label": "Incremental GMV from promotional product"
  },
  {
    "value": "20%",
    "label": "YoY company-wide revenue growth"
  }
]
```

**To update:**
- Change the `"value"` to your metric (e.g., "$10M", "95%", "500+")
- Change the `"label"` to describe the metric
- Add or remove metrics by copying/deleting entire `{ }` blocks (remember to add commas between blocks)

### 3. Case Studies

Find the `"caseStudies"` array. Each case study looks like this:

```json
{
  "id": "roo-promotional-product",
  "title": "Roo Promotional Product & Lifecycle Motion",
  "company": "Roo",
  "role": "Senior PM → Staff PM",
  "timeframe": "2023-2025",
  "summary": "Built and launched...",
  "keyOutcomes": [
    "$25M incremental GMV",
    "20% YoY company-wide revenue growth"
  ],
  "context": "Roo is a Series A marketplace...",
  "problem": "Veterinarian retention was declining...",
  "myRole": "Led product strategy...",
  "whatIDid": [
    "Designed and launched Roo's first promotional product...",
    "Built self-service tools..."
  ],
  "outcomes": [
    {
      "metric": "$25M incremental GMV",
      "description": "Attributed to promotional product"
    }
  ],
  "learnings": [
    "Promotional products need careful economic modeling..."
  ]
}
```

**To edit a case study:**
1. Find the case study by its `"id"`
2. Update any text fields
3. Add/remove items in arrays (like `"whatIDid"`, `"outcomes"`, `"learnings"`)

**To add a new case study:**
1. Copy an entire case study block (from `{` to `}`)
2. Paste it after the last case study (don't forget to add a comma before it)
3. Change the `"id"` to something unique (use lowercase and hyphens, e.g., `"new-project-2024"`)
4. Update all fields with your new content

**To remove a case study:**
1. Delete the entire block (from `{` to `}`)
2. Make sure to remove any extra commas

### 4. Experience Timeline

Find the `"experience"` array. Each company looks like this:

```json
{
  "company": "Roo",
  "logo": "roo.png",
  "roles": [
    {
      "title": "Staff Product Manager",
      "timeframe": "Apr 2025 – Present",
      "location": "San Francisco Bay Area",
      "description": "Leading marketplace optimization...",
      "relatedCaseStudies": ["roo-promotional-product"]
    }
  ]
}
```

**To update:**
- Edit company names, role titles, timeframes, descriptions
- Add new roles by copying a role block and pasting it in the `"roles"` array
- Link to case studies by adding their `"id"` to the `"relatedCaseStudies"` array

### 5. "How I Work" Philosophy

Find the `"howIWork"` section:

```json
"howIWork": {
  "sections": [
    {
      "title": "Discovery & Strategy",
      "icon": "🔍",
      "description": "I specialize in building...",
      "principles": [
        "Marketplaces: I've built and optimized...",
        "0–1 products: I thrive in ambiguous..."
      ]
    }
  ]
}
```

**To update:**
- Edit titles, descriptions, and principles
- Change the emoji icons (copy/paste from [Emojipedia](https://emojipedia.org/))
- Add/remove principles in the array

### 6. Tech Stack

Find the `"techStack"` section:

```json
"techStack": {
  "categories": [
    {
      "name": "Product & Collaboration",
      "tools": [
        {
          "name": "Figma",
          "description": "Design and prototyping"
        }
      ]
    }
  ]
}
```

**To update:**
- Add/remove tool categories
- Add/remove tools within each category
- Update tool names and descriptions

## Important JSON Rules

1. **Commas:** Items in arrays and objects must be separated by commas, BUT the last item should NOT have a trailing comma

   ✅ Good:
   ```json
   ["item1", "item2", "item3"]
   ```

   ❌ Bad:
   ```json
   ["item1", "item2", "item3",]
   ```

2. **Quotes:** Always use double quotes `"` for strings, never single quotes `'`

3. **Special Characters:** If your text contains quotes, use `\"` instead:
   ```json
   "She said \"hello\" to me"
   ```

4. **Line Breaks:** To add a line break in your text, use actual line breaks in the JSON (it will work fine)

5. **Validation:** After editing, you can validate your JSON at [jsonlint.com](https://jsonlint.com/) to catch any syntax errors

## Testing Your Changes

1. Save `content.json`
2. Open your website in a browser (or refresh if already open)
3. Check that all changes appear correctly
4. If something doesn't show up, check the browser console (F12) for errors

## Troubleshooting

**Problem:** Website shows blank or broken content

**Solution:**
1. Open `content.json` in a text editor
2. Copy all the content
3. Go to [jsonlint.com](https://jsonlint.com/)
4. Paste your content and click "Validate JSON"
5. Fix any errors it highlights (usually missing/extra commas or quotes)

**Problem:** Case study doesn't appear

**Solution:**
- Make sure the `"id"` is unique
- Check that there are no syntax errors in the case study block
- Verify all required fields are present

## File Structure

```
profile-site/
├── index.html              # Homepage
├── projects.html           # Case studies list
├── case-study.html         # Individual case study template
├── experience.html         # Experience timeline
├── how-i-work.html         # Philosophy page
├── tech-stack.html         # Tech stack page
├── content.json            # ⭐ EDIT THIS FILE FOR CONTENT
├── content-loader.js       # Loads content.json (don't edit)
├── styles.css              # Styling (only edit if changing design)
├── script.js               # JavaScript for contact form
└── server.js               # Backend server
```

## Adding Images

To add company logos or other images:

1. Place the image file in the same folder as `index.html`
2. In `content.json`, reference the filename:
   ```json
   "logo": "company-logo.png"
   ```

## Need Help?

If you encounter issues:
1. Validate your JSON at [jsonlint.com](https://jsonlint.com/)
2. Check the browser console (F12 → Console tab) for error messages
3. Make sure you saved the file after editing
4. Try hard-refreshing the browser (Ctrl+Shift+R or Cmd+Shift+R)

---

**Remember:** You only need to edit `content.json` to update all content across the entire website. No HTML, CSS, or JavaScript knowledge required!
