# FitStreak Style

Build a comprehensive, multi-page social media web application called "FitStreak" designed for fashion enthusiasts to share daily outfits and maintain gamified engagement streaks. Ensure the application is built using React, Tailwind CSS, and Lucide React icons.

1. Global Design System & Theme

Color Palette: Strictly use a Dark Mode aesthetic. The main background should be a very deep blue/black (e.g., bg-slate-950 or #0b0e17). Panels and cards should be slightly lighter for elevation (bg-slate-900). The primary brand and accent color is a vibrant, neon hot pink/magenta (e.g., #fb2c67). Use white for primary text and light slate gray for secondary text/subtitles.

Typography: Use a clean, modern sans-serif font (like Inter).

UI Elements: Cards and buttons should have rounded corners (rounded-xl or rounded-2xl). Inputs should have dark backgrounds with subtle borders that glow pink on focus.

Iconography: Heavily utilize fire/flame icons to represent the "streak" mechanic throughout the app.

2. Layout Structure (Authenticated State)

Left Sidebar (Persistent): Include the brand logo (pink jacket icon + "FitStreak"). A vertical navigation menu: Home, Explore, Post Outfit (highlighted as a pink button), Notifications (with a pink unread badge), Friends, Messages, Profile, Settings. Below the nav, include a "Your Streak" widget showing a circular progress ring, a large number (e.g., 12 days), a Monday-Sunday checkmark row, and a pink "View Streak" button. Below that, a "Recent Badges" section (hexagon/shield icons) and a Dark Mode toggle at the very bottom.

Bottom Navigation (Mobile): For smaller screens, include a fixed bottom bar with Home, Explore, a large pink central "+" button, Friends, and Profile.

3. Page 1: Authentication (Login & Sign Up)

Layout: Split-screen desktop design.

Left Panel (Brand): Dark background. Large headline "Show your fit. Keep your streak." Three feature bullet points with icons (Build Streaks, Connect, Climb Leaderboards). Add decorative floating polaroid-style images of people in streetwear, adorned with floating pink "streak" badges. A quote by Rachel Zoe at the bottom.

Right Panel (Auth Form): Centered card layout.

Login View: "Welcome back!" header, Email/Username input, Password input (with an eye icon to toggle visibility), "Forgot password?" link, a large solid pink "Log In" button. Below, "Or continue with" social buttons (Google, Apple, Facebook) styled as outlined dark buttons with respective icons.

Sign Up View: "Create your account" header. A circular profile picture upload area at the top. Inputs for Username, Email, Password, and Confirm Password. Add a dynamic "Password strength" colored bar indicator. Include a Terms of Service checkbox, a large pink "Sign Up" button, and the social signup buttons.

4. Page 2: Home Feed Dashboard

Top Bar: Global search input, a small fire icon with the user's current streak, notification bell, and user avatar dropdown.

Main Feed (Center):

Composer: A card at the top to "Share your outfit today" with an "Add Photo" pink square, text input, and a "Post" button.

Feed Stream: A toggle filter (All, Friends, Following). Post cards featuring: User avatar and name, time posted, a large vertical outfit image, post title, hashtags (e.g., #streetwear), like/comment counts, and a small pink fire badge indicating the poster's current streak.

Right Sidebar:

Your Streak: A compact version of the streak tracker with the fire icon, day count, and Mon-Sun checkboxes.

Top Friends: A ranked list of friends (Avatars + Names) and their current fire streak numbers.

Leaderboard: A ranked list showing weekly XP points.

5. Page 3: User Profile

Header Profile Section: User avatar with an edit icon, Name with a verified tick, handle, bio, location, and join date. A dark, stylized banner background with graffiti-style text ("KEEP YOUR STREAK").

Stats Row: Clean text metrics for Posts, Followers, Following, and Likes Received. Buttons for "Edit Profile" and "Share".

Highlight Cards: A 4-column grid of dark cards showing: Current Streak (with flame icon), Longest Streak (with trophy icon), Total Outfits (with jacket icon), and Total Likes (with heart icon).

Content Tabs: Tabs for Outfits, Saved, Liked, and Tagged.

Content Grid: A masonry or standard 3-column grid of user posts, identical in styling to the home feed cards but more compact.

6. Page 4: Create Post (Upload Flow)

Layout: Two-column split inside the main content area with a "Create Post" back-arrow header.

Left Column (Media): Tabs for Photo / Video. A large vertical media preview area showing the selected image. Below it, a dashed-border dropzone "Tap to upload". A "Tips for great posts" informational card at the bottom.

Right Column (Metadata & Settings):

Caption text area (0/220 characters).

Tags input area with suggested pill-shaped tags below it (#streetwear, #allblack).

Location selector.

Outfit Category selection (Three large square buttons: Streetwear, Casual, Formal).

"Who can see this?" dropdown (default: Everyone).

"Advanced Options" accordion containing toggle switches for Allow Comments, Allow Likes, and Save to gallery.

Bottom actions: A massive pink "Post Outfit" button and a dark outlined "Save as Draft" button.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d320c856-0254-4cbc-938b-b78e6b377de3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
