# Habitat Nova 🌱✨

**"Where your habits build a world."**

This is your MVP — a fully working app. This README will get it live on the
internet with a real link, even if you've never deployed anything before.
Read it top to bottom once, then follow the numbered steps.

---

## What you're deploying

A gamified habit tracker where every habit becomes a little glowing structure
on a pastel sci-fi island. Check in, and it grows. Skip a day, and it quietly
dims — never disappears. No backend, no database, no login, no API keys.
Everything lives in the visitor's own browser.

---

## The fastest way to get a live link (no GitHub needed)

This uses your computer's Terminal (Mac) or Command Prompt (Windows) — but
you'll only ever copy-paste 3 commands. You don't need to understand them.

### Step 1 — Install Node.js (one-time, ~2 minutes)

If you're not sure whether you already have it, do this step anyway — it's
safe to run even if it's already installed.

1. Go to **https://nodejs.org**
2. Download the button that says **LTS** (the recommended version).
3. Open the downloaded file and click "Next" through the installer, accepting
   all the defaults.

### Step 2 — Open a terminal in this project folder

1. Unzip the `habitat-nova` folder somewhere easy to find, like your Desktop.
2. Open the **Terminal** app (Mac: press `Cmd + Space`, type `Terminal`,
   hit Enter) or **Command Prompt** (Windows: press the Start key, type
   `cmd`, hit Enter).
3. Type `cd ` (the letters c, d, then a space — don't press Enter yet).
4. Drag the `habitat-nova` folder from Finder/File Explorer straight into
   the terminal window. It will automatically type the folder's path for you.
5. Now press **Enter**. You're now "inside" the project folder.

### Step 3 — Install the pieces the app needs

Copy-paste this and press Enter. It'll take a minute or two:

```
npm install
```

### Step 4 — Deploy it live

Copy-paste this and press Enter:

```
npx vercel --prod
```

- The first time, it will ask you to log in — it opens your browser. If you
  don't have a Vercel account, choose **Continue with GitHub** or
  **Continue with Email** — it's free, no credit card needed.
- Come back to the terminal. It will ask a few questions — for every one,
  just press **Enter** to accept the default answer.
- After a minute, it will print a link that looks like:

  ```
  https://habitat-nova-yourname.vercel.app
  ```

**That's your live, public link.** Copy it — that's what goes in the
buildathon submission form's "Enter the live/public deployment link" field.

---

## Prefer not to use a terminal at all?

You can also do this entirely by clicking around in a browser:

1. Create a free account at **https://github.com** (if you don't have one).
2. Create a new repository (the green "New" button), and use its
   **"uploading an existing file"** link to drag in the project folder.
3. Go to **https://vercel.com**, sign up with your GitHub account.
4. Click **"Add New Project"**, pick the repository you just created, and
   click **Deploy**. Vercel recognizes this as a Next.js app automatically —
   no settings to change.
5. When it finishes, Vercel shows your live link at the top of the page.

---

## If something goes wrong

- **"command not found: npm"** → Node.js isn't installed yet, or the
  terminal needs to be restarted after installing it. Close the terminal
  window fully and reopen it, then try again from Step 2.
- **The deploy asks confusing questions** → It's always safe to press Enter
  for the default. Nothing you can pick will cost money or delete anything.
- Stuck on anything else — just paste the error message back into this chat
  and I'll walk you through it.

---

## Good to know

- Every visitor's habit data is stored **only in their own browser**
  (`localStorage`). There's no shared database — if you clear your browser
  data, your island resets to the sample island.
- The app costs nothing to host on Vercel's free tier for a project this size.
- To make changes later and re-deploy: edit the files, then run
  `npx vercel --prod` again from the same folder.

Good luck with the submission — go show them your island. 🌌
