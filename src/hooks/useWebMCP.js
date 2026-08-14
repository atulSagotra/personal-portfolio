import { useEffect } from "react";

export default function useWebMCP() {
  useEffect(() => {
    // Check for webmcp support
    const modelContext = document.modelContext || navigator.modelContext;
    if (!modelContext || typeof modelContext.registerTool !== "function") {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const registerTools = async () => {
      try {
        // Tool 1: Get Profile Details
        await modelContext.registerTool({
          name: "get_developer_profile",
          description: "Retrieves professional summary, about me, and contact links for Atul Sagotra.",
          inputSchema: { type: "object", properties: {} },
          execute() {
            return {
              name: "Atul Sagotra",
              location: "Brampton, Ontario, Canada",
              role: "Engineering Team Lead & Senior Frontend Architect",
              summary: "6+ years of experience leading product engineering, specializing in high-performance React/Next.js systems, micro-frontends, and AI-driven workflows.",
              education: "B.Tech in Computer Science from Chandigarh Group of Colleges",
              links: {
                github: "https://github.com/atulsagotra",
                linkedin: "https://linkedin.com/in/atulsagotra",
                email: "atulsagotra774@gmail.com"
              }
            };
          },
          annotations: { readOnlyHint: true }
        }, { signal });

        // Tool 2: Get Work History
        await modelContext.registerTool({
          name: "get_work_experience",
          description: "Retrieves detailed employment history, roles, key contributions, and technologies used.",
          inputSchema: { type: "object", properties: {} },
          execute() {
            return [
              {
                company: "Charger Logistics",
                role: "Team Lead",
                period: "Aug 2024 - Present",
                location: "Brampton, Canada",
                contributions: [
                  "Lead development teams and coordinate deliveries with product management, DevOps, and solution architects.",
                  "Architected and delivered key logistics systems: Order Board, Contract Board, Trip Board, Truck & Trailer Tracking, Drivers Management, and Customer Portal.",
                  "Integrated Claude AI models for planning, code architecture, testing, and documentation. Created an engineering knowledgebase to boost team delivery speed.",
                  "Built real-time logistic systems using React, Zustand, React Query, and Firestore."
                ],
                tech: ["React", "Zustand", "React Query", "Firestore", "Claude AI", "Logistics APIs"]
              },
              {
                company: "Material Plus",
                role: "Senior Web Developer",
                period: "Feb 2023 - July 2024",
                location: "Gurugram, India",
                contributions: [
                  "Developed client-side applications from scratch and dashboard platforms for SportsClips (live in App Store).",
                  "Built a secure, high-scale Content Management System (CMS) for Nasdaq Nordic.",
                  "Worked with React, Next.js, Node.js, and PHP Lit components to optimize rendering."
                ],
                tech: ["React", "Next.js", "Node.js", "PHP Lit Components", "Tailwind CSS", "Styled Components"]
              },
              {
                company: "Pasarpolis",
                role: "Lead Front-end Engineer (B2C)",
                period: "2023",
                location: "Gurugram, India",
                contributions: [
                  "Lead frontend for Next.js B2C mobile web application.",
                  "Developed ~70% of TAPINSURE app within 3 months.",
                  "Built micro-frontend integrations decreasing deployment time by 40%."
                ],
                tech: ["Next.js", "React", "JavaScript", "Styled Components", "Webpack"]
              },
              {
                company: "Xoriant",
                role: "Software Engineer",
                period: "2021 - 2023",
                location: "Pune, India",
                contributions: [
                  "Lead submodules of web applications, designing and integrating React submodules.",
                  "Utilized Tailwind CSS for pixel-perfect browser responsive design."
                ],
                tech: ["React", "JavaScript", "Tailwind CSS", "Redux", "Micro-frontends"]
              }
            ];
          },
          annotations: { readOnlyHint: true }
        }, { signal });

        // Tool 3: Get Technical Skills
        await modelContext.registerTool({
          name: "get_technical_skills",
          description: "Retrieves technical skill stack and proficiency scores for Atul Sagotra.",
          inputSchema: { type: "object", properties: {} },
          execute() {
            return {
              frontend_architecture: ["ReactJS & TypeScript", "NextJS (App Router & SSR)", "Micro-frontends & Module Federation", "State & Data (Zustand, React Query)", "Responsive CSS & Design Systems"],
              ai_systems_tooling: ["AI Agent Orchestration (Claude, GPTs)", "AI-Driven Engineering & Code Gen", "Team AI Projects & Custom Assistants"],
              leadership_workflows: ["Technical Scoping & Architecture Plans", "Developer Mentorship & Quality Standards", "Team Process Optimization & Workflows"],
              backend_devops: ["Node.js & Python API Services", "Databases & REST APIs Integration", "CI/CD Pipelines & DevOps (Git, Docker)"]
            };
          },
          annotations: { readOnlyHint: true }
        }, { signal });

        console.log("WebMCP tools registered successfully.");
      } catch (err) {
        console.warn("Failed to register WebMCP tools:", err);
      }
    };

    registerTools();

    return () => {
      // Unregister tools on cleanup
      controller.abort();
    };
  }, []);
}
