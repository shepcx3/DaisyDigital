# Team corner setup (Thursday checklist)

The team corner is the private page where the girls change their status:
**https://shepcx3.github.io/DaisyDigital/login/**

It runs on Firebase (Google's free plan). Until it's connected, the site keeps showing the
statuses written in `content/site.ts`, so nothing breaks in the meantime.

Takes about 20 minutes. Do steps 1–7 on **Erica's** laptop, signed in to the business Google account.
Nobody needs to share a password with Shep.

> If Firebase ever asks for a credit card or to "upgrade to Blaze", **stop**. Everything here
> is on the free "Spark" plan and never needs a card.

---

## 1. Make the project
1. Go to **console.firebase.google.com** → **Create a project**.
2. Name: `daisy-digital`. Accept the terms.
3. Turn **off** Google Analytics (not needed) → **Create project**.

## 2. Turn on sign-in
1. Left menu: **Build → Authentication → Get started**.
2. **Sign-in method** tab:
   - **Google** → Enable → pick the support email → Save.
   - **Email/Password** → Enable, and also turn on **Email link (passwordless sign-in)** → Save.
3. **Settings** tab → **Authorized domains** → **Add domain** → `shepcx3.github.io`.
   (Add `daisydigital.ca` too once the real domain is live.)

## 3. Make the database
1. Left menu: **Build → Firestore Database → Create database**.
2. Location: **northamerica-northeast1 (Montréal)**. This can't be changed later.
3. Start in **production mode** → Create.

## 4. Paste the security rules
1. Firestore → **Rules** tab.
2. Delete what's there, paste everything from `firestore.rules` in this repo → **Publish**.

## 5. Make the team list (who can edit what)
1. Firestore → **Data** tab → **Start collection** → Collection ID: `config` → Next.
2. Document ID: `access`.
3. Add a field: name `admins`, type **array**, add Erica's and Bri's login emails (all lowercase).
   Admins can change everyone's status.
4. Add a field: name `members`, type **map**, with one entry per other girl (all lowercase), e.g.
   `philie` → `philie@example.com`, `jany` → `jany@example.com`. They can only change their own.
5. Save.

(If Erica and Bri want everyone to edit only their own, put Erica and Bri in `members` as
`erica` and `bri` instead, and leave `admins` empty.)

## 6. Get the website's connection codes
1. Gear icon (top left) → **Project settings** → **General** → scroll to **Your apps** → the **`</>`** (web) icon.
2. Nickname: `website`. Leave "Firebase Hosting" **unticked** → **Register app**.
3. You'll see a block with `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`.
   Copy them (a photo or a note is fine). They're not secret; they only identify the project.

## 7. (Optional) let Shep help later
Gear → **Users and permissions** → **Add member** → Shep's email → role **Editor**.
That way Shep can fix things later without logging in as anyone.

---

## 8. Shep: connect the website (on Shep's laptop)
1. GitHub → the **DaisyDigital** repo → **Settings → Secrets and variables → Actions → Variables** tab.
2. **New repository variable** six times:

   | Name | Value |
   |---|---|
   | `FIREBASE_API_KEY` | apiKey |
   | `FIREBASE_AUTH_DOMAIN` | authDomain |
   | `FIREBASE_PROJECT_ID` | projectId |
   | `FIREBASE_STORAGE_BUCKET` | storageBucket |
   | `FIREBASE_MESSAGING_SENDER_ID` | messagingSenderId |
   | `FIREBASE_APP_ID` | appId |

3. **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**. Wait for the green check.

## 9. Try it together
1. Each girl opens **/login/** on her phone, taps **sign in with google** (or gets an email link).
2. She picks a status light, types a status, taps **save**.
3. Open the home page or **/team/** and refresh: the new status shows up.

If someone sees "this email isn't on the team list yet", her email in step 5 doesn't match
the one she signed in with (check spelling and lowercase).

## Testing on localhost (Shep)
Put the same six values in a file called `.env.local` in the project folder (it's never committed):

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```
