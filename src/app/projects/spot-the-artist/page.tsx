'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import CameraPointCloud3D from '@/components/CameraPointCloud3D'
import Star3D from '@/components/Star3D'
import ThemeToggle from '@/components/ThemeToggle'

export default function SpotTheArtistPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] dark:bg-[#1c1336]">

      {/* Nav */}
      <div className="px-8 md:px-12 lg:px-16 pt-8 md:pt-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7">
            <Star3D className="w-full h-full" minHeight="0" />
          </div>
          <Link
            href="/"
            className="text-lg md:text-xl text-black dark:text-white font-aldrich font-thin-aldrich hover:opacity-70 transition-opacity"
          >
            Nurana Rustamli
          </Link>
        </div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="text-center px-8 pt-16 pb-8"
      >
        <h1
          className="text-5xl md:text-6xl text-black dark:text-white font-aldrich font-thin-aldrich mb-4 cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => window.location.reload()}
        >
          Spot the Artist
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8">
          An AI-powered Web Application that allows users to discover and store Anna Laurini&apos;s famous artworks around their city.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://github.com/nrustamli/spot_the_artist"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="/papers/spot-the-artist.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 dark:bg-white/10 text-black dark:text-white border border-black/20 dark:border-white/20 rounded-md text-sm font-medium hover:bg-white/50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Web Site
          </a>
        </div>
      </motion.div>

      {/* 3D element */}
      <div className="relative w-full h-[55vh]">
        <CameraPointCloud3D xLookAt={0} />
      </div>

      {/* Blog post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
        className="max-w-4xl mx-auto px-8 md:px-12 py-16"
      >
        <h2 className="text-3xl font-sans text-black dark:text-white mb-4">An app for storing spotted works of famous street artist</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
          Taking a street art photo only for it to get lost in your gallery can feel pointless. This app is not only for street art fans but also for those of you who want to share forgotten or freshly captured pieces that were once a small part of your day. What is more exciting — you&apos;ll also be able to interact with your favourite artist and even get a little thank you bonus!
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
          &ldquo;Spot the Artist&rdquo; is a web app where users in London, Paris and other cities photograph and share street art by Anna Laurini. That helps to create a shared digital gallery, preserve the art and to grow the community.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-12 italic">
          Note: I prefer not to call it a &ldquo;Pokemon Go style game&rdquo; since it was not designed for a hunt. Purpose of the app is to build a digital gallery that helps street art last longer.
        </p>

        {/* User Workflow */}
        <h2 className="text-2xl font-sans text-black dark:text-white mb-4">User workflow</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
          First things first — to save a verified picture you have to sign in! Signing in lets us track your finds and create your individual gallery.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
          From there you have two options: to Upload from gallery an existing photo or to open the Camera and take a picture in real time.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          After that the art is being verified — we check whether the uploaded photo actually contains Anna Laurini&apos;s art. Here we have the following outcomes:
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <img
              src="/images/projects/verified-state.png"
              alt="Verified state screenshot"
              className="w-full rounded-lg border border-black/10 dark:border-white/10"
            />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">Verified!</p>
          </div>
          <div>
            <img
              src="/images/projects/not-recognised.png"
              alt="Not Recognised state screenshot"
              className="w-full rounded-lg border border-black/10 dark:border-white/10"
            />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">Not Recognised</p>
          </div>
        </div>

        <ol className="list-decimal list-inside space-y-6 mb-6 text-gray-600 dark:text-gray-400">
          <li className="leading-relaxed">
            <span className="font-medium text-black dark:text-white">&ldquo;Verified!&rdquo;</span> — photo CONTAINS the art.
            <p className="mt-3 ml-5 leading-relaxed">In this scenario you just proceed by pressing &ldquo;Save&rdquo; button. Thus, the artwork is saved to both the shared gallery and &ldquo;My Gallery&rdquo;. Also +1 &ldquo;face&rdquo; is added to &ldquo;My Rewards&rdquo;.</p>
          </li>
          <li className="leading-relaxed">
            <span className="font-medium text-black dark:text-white">&ldquo;Not Recognised&rdquo;</span> — photo does NOT contain the art.
            <p className="mt-3 ml-5 leading-relaxed">In case someone tries to upload a picture that doesn&apos;t contain any art the app will detect it and show the message &ldquo;Not Recognised&rdquo;. The only thing to do after is to press &ldquo;Skip&rdquo;.</p>
          </li>
          <li className="leading-relaxed">
            <span className="font-medium text-black dark:text-white">&ldquo;Not Recognised&rdquo;</span> — photo CONTAINS the art.
            <p className="mt-3 ml-5 leading-relaxed">If the art is clearly visible but still not recognised, please retake the photo and try again — or Skip for now.</p>
            <p className="mt-2 ml-5 leading-relaxed italic">Note: This scenario is very rare but still might happen. Why this issue occurs will be discussed in the &ldquo;AI/ML pipeline&rdquo; section.</p>
          </li>
        </ol>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">Click on the user profile to access these options:</p>
        <ul className="space-y-2 mb-6 text-gray-600 dark:text-gray-400">
          <li>🌍 <span className="font-medium text-black dark:text-white">Explore Gallery</span> — leads to the main page that contains the shared gallery</li>
          <li>🖼️ <span className="font-medium text-black dark:text-white">My Gallery</span> — takes the user to the page where they can see how many faces are left to earn a reward and all of the art spotted by them only</li>
          <li>🚪 <span className="font-medium text-black dark:text-white">Sign Out</span></li>
        </ul>

        <img
          src="/images/projects/explore-gallery.png"
          alt="Explore Gallery page screenshot"
          className="w-full rounded-lg mb-12 border border-black/10 dark:border-white/10"
        />

        {/* Overall Architecture */}
        <h2 className="text-2xl font-sans text-black dark:text-white mb-4">Overall architecture</h2>

        <h3 className="text-lg font-sans text-black dark:text-white mb-2">Frontend</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          For styling I decided to stick with plain CSS. Then, I used React 19 to build UI components and to handle the logic for updating what is shown on the screen. Also the Firebase JS SDK runs in the browser and handles signing users in, managing sessions and getting ID tokens.
        </p>

        <h3 className="text-lg font-sans text-black dark:text-white mb-2">Backend</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          For the backend I used FastAPI to build the REST API that connects the frontend to the database and AI verification logic. To control that only authenticated users can access protected endpoints, the ID tokens sent by the frontend are verified by firebase-admin that runs on the FastAPI server.
        </p>

        <h3 className="text-lg font-sans text-black dark:text-white mb-2">Database</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Initially I used SQLite with SQLAlchemy for simplicity but when the app was ready to be deployed it needed scaling. That is when I moved it to the cloud and migrated the database to Firestore. It does not require a server to manage and works well with the rest of the Firebase ecosystem already in use.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          Users are stored in a <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm">users</code> collection, where each document ID is the Firebase UID:
        </p>
        <pre className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300 overflow-x-auto mb-4">{`### users/{uid}
{
  "username": "string",
  "email": "string",
  "created_at": "timestamp",
  "arts_spotted": "integer",
  "verified_spots": "integer"
}`}</pre>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          Gallery images are stored in a <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm">gallery</code> collection as base64-encoded JPEG strings directly inside the Firestore document. Images are compressed before saving (resized to a maximum of 800×800 pixels at 70% JPEG quality) because Firestore has a 1MB document size limit.
        </p>
        <pre className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300 overflow-x-auto mb-6">{`### gallery/{docId}
{
  "user_id": "string (Firebase UID)",
  "username": "string",
  "image_data": "string (base64 JPEG data URL)",
  "is_verified": "boolean",
  "confidence": "float",
  "message": "string | null",
  "best_match": "string | null",
  "location": "string | null",
  "notes": "string | null",
  "created_at": "timestamp"
}`}</pre>

        <h3 className="text-lg font-sans text-black dark:text-white mb-2">AI verification</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          To verify whether the uploaded image contains the artwork the CLIP (clip-vit-base-patch32) model is used. It is a pre-trained vision model from OpenAI that understands images through learned embeddings — meaning no custom model training was needed. I uploaded 50 reference images stored on the server. When a user uploads an image it gets compared to the reference images and marked verified if the confidence metric is above 80%.
        </p>

        <h3 className="text-lg font-sans text-black dark:text-white mb-2">Deployment</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          The entire app is packaged into a single Docker container using a multi-stage Dockerfile. The first stage builds the React production package while the second stage sets up the Python runtime, installs dependencies (including the CLIP model, which is pre-downloaded into the image) and copies the built frontend in.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Every push to main triggers a GitHub Actions workflow, which submits the build to Google Cloud. Cloud Build compiles the Docker image (on a high-CPU machine due to the heavy PyTorch/CLIP dependencies) and pushes it to Google Artifact Registry tagged with the commit SHA. Cloud Build then deploys that image to Cloud Run which scales automatically and requires no server management.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
          The CLIP model is about 350MB in size. To avoid a slow startup every time the server launches, it is downloaded once during the Docker build and baked into the image — ready to go the moment the server starts.
        </p>

        {/* AI/ML Pipeline */}
        <h2 className="text-2xl font-sans text-black dark:text-white mb-4">AI/ML pipeline</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          The core feature of the app is verifying whether a photo actually has Anna Laurini&apos;s artwork. As mentioned above, I used an AI model called CLIP.
        </p>

        <img
          src="/images/projects/ai-pipeline.svg"
          alt="AI/ML pipeline diagram"
          className="w-1/2 mx-auto block rounded-lg mb-6 border border-black/10 dark:border-white/10"
        />

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          This model is pre-trained and does not require fine-tuning. To make it distinguish Anna Laurini&apos;s street art I collected around 50 reference photos that were converted into 512-dimensional embeddings and each compared to the photo uploaded by the user using cosine similarity. Because relying on a single best match is risky, I average scores from the top-k closest references to get a more robust result. That number is then converted to a 0–100% confidence scale.
        </p>

        <h3 className="text-lg font-sans text-black dark:text-white mb-2">Confidence level trade-offs</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          At this stage I designed a number of experiments to decide what thresholds to use. These experiments showed that the majority of images containing art end up scoring 90% or more. However, some photos that are corrupted, have unusual lighting or angle, or show an incomplete piece fall into the 75–85% range. This created a problem because some works by other street artists with similar shapes or colours also scored around 75%.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          The only correct decision at that stage is to mark anything above 80% as verified. This is high enough to prevent false positives — no art by other artists can be verified — while leaving very few false negatives. That is easier to deal with: for example, if it was a Camera upload the user can simply retake the photo.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 italic">
          Note: References included daytime, night-time, rainy, blurred and cropped photos so the model already handles them well, normally scoring above 75%.
        </p>

        <h3 className="text-lg font-sans text-black dark:text-white mb-2">Model choice</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          But why CLIP specifically and not ResNet-50, for example? To answer this, I should mention that I have prior experience with ResNet-50. That model works best when we have fixed categories and want to distinguish one from another — it classifies images. CLIP, on the other hand, catches context and compares images by visual similarity. Unlike CLIP, ResNet-50 would also require retraining on Anna Laurini&apos;s work. ResNet-50 is more lightweight and faster, but the question we are trying to answer is more like &ldquo;Does this thing look like this thing?&rdquo; rather than &ldquo;What category does this belong to?&rdquo; — which makes a vision-language model like CLIP the obvious choice.
        </p>
      </motion.div>

      {/* Back link */}
      <div className="max-w-2xl mx-auto px-8 md:px-12 pb-16">
        <Link href="/projects" className="text-purple-500 hover:underline text-sm md:text-base">
          ← Back to Projects
        </Link>
      </div>

      <ThemeToggle />
    </main>
  )
}
