# Pushing this site to GitHub with Git Bash

Target repository: **https://github.com/Vishu1197/vishalchanda.github.io**
Local folder: `C:\Users\visha\Desktop\PhD\16. My_git_projects\vishalchanda.github.io`

The repo already exists with 49 commits and the old Virexa Analytics pages. The steps below keep
that history and record this rebuild as one ordinary commit that replaces the old files. Nothing is
force pushed and nothing is lost.

---

## Before you start

Open **Git Bash**, then check your identity is set. If these print nothing, set them.

```bash
git config --global user.name
git config --global user.email
```

```bash
git config --global user.name "Vishal Chanda"
git config --global user.email "vishalchanda.reva@gmail.com"
```

---

## Step 1. Go to the project folder

The folder name has a space and a dot in it, so the quotes matter.

```bash
cd "/c/Users/visha/Desktop/PhD/16. My_git_projects/vishalchanda.github.io"
```

Confirm you are in the right place. You should see `index.html` and an `assets` folder.

```bash
ls -la
```

---

## Step 2. Start a repository here

```bash
git init
git checkout -b main
```

If `git init` says the branch is already `main`, the second command will complain that the branch
exists. That is harmless, just carry on.

---

## Step 3. Connect it to your GitHub repo

```bash
git remote add origin https://github.com/Vishu1197/vishalchanda.github.io.git
git remote -v
```

The second command should print the URL twice, once for fetch and once for push.

---

## Step 4. Pull down the existing history

This downloads the 49 commits without touching any of your local files.

```bash
git fetch origin
```

---

## Step 5. Attach your new files on top of that history

```bash
git reset --soft origin/main
```

This points your branch at the existing history while leaving every file on disk exactly as it is.
Nothing is deleted from your folder.

Check what git is about to do:

```bash
git status
```

You should see the new files listed as untracked, and the old site files (`about.html`,
`contact.html`, `services.html` and so on) listed as deleted. That is correct. Those old pages are
not in your folder any more, so the commit will remove them from the repo.

---

## Step 6. Stage and commit

```bash
git add -A
git status
```

Look over the list one more time, then commit.

```bash
git commit -m "Rebuild site as VishOmics: multi page research portfolio

Replaces the Virexa Analytics pages with a six page site covering research,
publications, open source software and contact. Plain HTML, CSS and vanilla
JavaScript, with a live 3Dmol.js structure viewer on the research page."
```

---

## Step 7. Push

```bash
git push -u origin main
```

The first push will ask you to sign in. Git Credential Manager opens a browser window, you sign in
to GitHub there, and it remembers you afterwards. If you use a personal access token instead, your
username is `Vishu1197` and the token goes in the password field.

---

## Step 8. Check GitHub Pages

1. Open **https://github.com/Vishu1197/vishalchanda.github.io/settings/pages**
2. Under **Source**, it should say **Deploy from a branch**
3. Branch should be **main**, folder **/ (root)**
4. Click **Save** if you changed anything

Give it one to two minutes, then open:

**https://vishu1197.github.io/vishalchanda.github.io/**

GitHub caches aggressively, so if you still see the old site, hard refresh with `Ctrl + Shift + R`.

---

## Making changes later

Once the repository is set up, the loop is short:

```bash
cd "/c/Users/visha/Desktop/PhD/16. My_git_projects/vishalchanda.github.io"
git add -A
git commit -m "Add 2027 paper to the publication record"
git push
```

---

## If something goes wrong

**`fatal: remote origin already exists`**
The remote is already set. Point it at the right place instead of adding it again:
```bash
git remote set-url origin https://github.com/Vishu1197/vishalchanda.github.io.git
```

**`fatal: couldn't find remote ref main`**
The default branch may be called something else. Check with:
```bash
git ls-remote --heads origin
```
Then use that name in place of `main` in steps 5 and 7.

**`Updates were rejected because the remote contains work that you do not have locally`**
Step 4 or step 5 did not complete. Run them again in order, then retry the push.

**You want to undo everything and start over**
Deleting the hidden `.git` folder resets the local repository without touching your site files:
```bash
rm -rf .git
```
Then begin again at step 2.

**The site loads but has no styling**
Check that `assets/css/styles.css` actually got committed:
```bash
git ls-files assets/
```
Also confirm the `.nojekyll` file is present, since it stops GitHub from running Jekyll over the
folder.

---

## Notes on the repository name

The repo is `Vishu1197/vishalchanda.github.io`, but your GitHub username is `Vishu1197`. A repo only
becomes a user site when it is named `<username>.github.io` exactly, so this one is served as a
project site at `vishu1197.github.io/vishalchanda.github.io/`.

Every path in the site is relative, so if you later rename the repo to `Vishu1197.github.io` it will
serve from `vishu1197.github.io/` with no edits needed.
