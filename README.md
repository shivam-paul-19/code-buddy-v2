# Code Buddy v2

A compact, AI-powered coding assistant that helps learners and developers convert pseudocode into working code, enhance messy code, solve DSA problems with structured explanations, and run & test code right inside the browser.  
Think of it as a developer’s pocket tool — teaching, polishing, and validating code in a single place.

---

## Key features
- 🚀 **DSA Solver** - Paste a problem URL (LeetCode / GfG etc.) and get a structured solution: explanation, data structures used, optimized code, dry run, and complexity analysis.  
- 🧩 **Pseudo → Code Translator** - Convert informal pseudocode or algorithmic descriptions into runnable code in the language of your choice.  
- ✨ **Code Enhancer** - Improve readability, add subtle comments, fix naming, reduce duplication, and optimize performance.  
- 💻 **In-built Code Editor & Runner** - Edit and run generated code directly in the app using the Monaco editor + remote execution engine (Piston/Judge0).  
- 🔐 **Safe API proxying** - AI requests are proxied through a backend (AWS Lambda) so the OpenAI key is not exposed in the browser.  
- 🧪 **Test-friendly workflow** - Jump from generated output to a test playground (modify inputs, run cases, copy results).
- 🐳 **Dockerized** - The app is dockerized to run in any machine via containers

---

## Tech stack
- **Frontend:** React (Vite), Tailwind CSS, shadcn/ui, React Router, Monaco Editor (code editing experience)  
- **Backend / API proxy:** Node.js (AWS Lambda) — proxies prompts to OpenAI models to keep keys secure  
- **AI:** OpenAI models (e.g. `gpt-4.1-mini`) for code generation, enhancement and translation  
- **Code execution:** Piston / (remote execution API) to compile/run multiple languages safely  
- **Deployment & Hosting:**  
  - Vercel (frontend)  
  - AWS Lambda (backend API proxy)  
  - **Docker** — containerized version of the app for consistent environment setup & portability  
- **Languages supported (examples):** Python, JavaScript, Java, C++ (scalable)

---

## 🚀 Run Code Buddy v2 on your machine

You can run this project locally in two ways:  
1. **Using Git + Node.js** (good for development)  
2. **Using Docker** (good for consistent environment setup & testing)

---

### 1️⃣ Run through Git

#### Prerequisites
- Node.js (v18+ recommended)  
- npm or yarn  
- OpenAI API key  

#### Steps
```bash
# Clone the repository
git clone https://github.com/shivam-paul-23/code-buddy-v2.git

# Move into the project folder
cd code-buddy-v2

# Install dependencies
npm install

# Create a .env file and add your OpenAI API key
echo "VITE_OPEN_AI_API_KEY=your_api_key_here" > .env

# Start the development server
npm run dev
```

### 1️⃣ Run through Docker

#### Prerequisites
- Docker installed in your machine

#### Steps
```bash
# Pull the prebuilt Docker image from Docker Hub
docker pull shivampaul23/codebuddy

# Run the container 
docker run -p 5173:5173 shivampaul23/codebuddy

# now go to your browser and type "localhost:5173" in the adress bar
```

---

## Links  
- **Deployed Link** – [CodeBuddy v2 Live](https://code-buddy-v2.vercel.app/)  
- **Docker Image Link** – [shivampaul23/codebuddy](https://hub.docker.com/repository/docker/shivampaul23/codebuddy)  