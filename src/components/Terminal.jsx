import React, { useState, useRef, useEffect } from "react";

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: "output", text: "Atul OS v2.0.26 (built for the AI era)" },
    { type: "output", text: "Type 'help' to view all available commands." },
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom when history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus terminal input when clicking the container
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e) => {
    if (e.key !== "Enter") return;

    const trimmedInput = input.trim();
    const command = trimmedInput.toLowerCase().split(" ")[0];

    const newHistory = [...history, { type: "input", text: trimmedInput }];

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let output = "";
    switch (command) {
      case "":
        output = "";
        break;
      case "help":
        output = `Available commands:
  - about       : Brief intro about Atul
  - skills      : List technical skill sets
  - experience  : Show work history
  - contact     : Get contact details
  - clear       : Clear the console screen
  - sudo        : Try escalations
  - easter-egg  : Reveal something fun`;
        break;
      case "about":
        output = "Atul Sagotra: Front-End / Full-Stack Engineer with 3+ years of experience. Expert in React, Next.js, and scaling micro-frontends. Currently based in Jammu, India.";
        break;
      case "skills":
        output = "ReactJS, NextJS, JavaScript, HTML/CSS, Python, Django, Tailwind CSS, Styled Components, Micro-frontends, Responsive Web Design.";
        break;
      case "experience":
        output = `Employment History:
  1. Pasarpolis (Gurugram) - B2C Front-end Lead (TAPINSURE app).
  2. Xoriant (Pune) - Software Engineer (React / Micro-frontends).
  3. T-Systems (Pune) - Engineering Intern.`;
        break;
      case "contact":
        output = "Email: atulsagotra10@gmail.com | GitHub: @atulsagotra | LinkedIn: linkedin.com/in/atulsagotra";
        break;
      case "sudo":
        output = "Permission denied. Nice try! Antigravity sandbox protects this terminal.";
        break;
      case "easter-egg":
        output = `
  ██████╗ ██╗  ██╗    ███╗   ███╗███████╗
  ██╔══██╗╚██╗██╔╝    ████╗ ████║██╔════╝
  ██████╔╝ ╚███╔╝     ██╔████╔██║█████╗  
  ██╔═══╝  ██╔██╗     ██║╚██╔╝██║██╔══╝  
  ██║     ██╔╝ ██╗    ██║ ╚═╝ ██║███████╗
  ╚═╝     ╚═╝  ╚═╝    ╚═╝     ╚═╝╚══════╝
  You found the secret command! Have an awesome day!`;
        break;
      default:
        output = `Command not found: '${command}'. Type 'help' for a list of commands.`;
    }

    if (output) {
      newHistory.push({ type: "output", text: output });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <section className="terminal-section scroll-reveal" onClick={focusInput}>
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="terminal-title">bash - visitor@atulsagotra.dev</div>
          <div className="terminal-spacer"></div>
        </div>
        
        <div className="terminal-body">
          {history.map((line, idx) => (
            <div key={idx} className={`terminal-line ${line.type}`}>
              {line.type === "input" ? (
                <>
                  <span className="prompt">visitor@atulsagotra.dev:~$ </span>
                  <span className="command-text">{line.text}</span>
                </>
              ) : (
                <pre className="output-text">{line.text}</pre>
              )}
            </div>
          ))}
          
          <div className="terminal-line input-line">
            <span className="prompt">visitor@atulsagotra.dev:~$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="terminal-input"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Terminal input"
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </section>
  );
}
