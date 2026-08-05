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
              age: 23,
              location: "Jammu, India",
              role: "Lead Front-end / Full-Stack Engineer",
              summary: "3+ years of experience leading front-end apps, NextJS developer, and micro-frontend specialist.",
              education: "B.Tech in Computer Science from Chandigarh Group of Colleges",
              links: {
                github: "https://github.com/atulsagotra",
                linkedin: "https://linkedin.com/in/atulsagotra",
                email: "atulsagotra10@gmail.com"
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
                company: "Pasarpolis",
                role: "Lead Front-end Engineer (B2C)",
                period: "2023 - Present",
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
              },
              {
                company: "T-Systems",
                role: "Software Engineer Intern",
                period: "2020 - 2021",
                location: "Pune, India",
                contributions: [
                  "Transformed wireframes into React prototypes.",
                  "Gained SDLC and enterprise application development guidelines."
                ],
                tech: ["HTML5", "CSS3", "JavaScript", "React"]
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
              frontend: ["ReactJS", "NextJS", "Javascript", "HTML5", "CSS3 / SCSS", "Styled Components", "Tailwind CSS"],
              backend: ["Python", "Django", "REST APIs Integration"],
              tools: ["Micro-frontends", "Git", "Webpack"]
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
