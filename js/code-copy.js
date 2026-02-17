document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre").forEach((block) => {
    const code = block.querySelector("code");
    if (!code) return;

    // 语言映射表（可扩展）
    const langMap = {
      py: "Python",
      cpp: "C++",
      c: "C",
      java: "Java",
      js: "JavaScript",
      ts: "TypeScript",
      html: "HTML",
      css: "CSS",
      go: "Go",
      rb: "Ruby",
      rs: "Rust",
      swift: "Swift",
      kt: "Kotlin",
      php: "PHP",
      sql: "SQL",
      json: "JSON",
      yaml: "YAML",
      sh: "Shell",
      bash: "Bash",
      dockerfile: "Dockerfile",
      txt: "Text"
    };

    /* Language label */
    const langClass = [...code.classList].find(c => c.startsWith("language-"));

    let labelText = "Code"; // 默认显示 Code

    if (langClass) {
      const langKey = langClass.replace("language-", "").toLowerCase();

      // 关键：把 fallback 当作 Code
      if (langKey === "fallback" || langKey === "text" || langKey === "") {
        labelText = "Code";
      } else {
        labelText = langMap[langKey] || (langKey.charAt(0).toUpperCase() + langKey.slice(1));
      }
    }

    const label = document.createElement("span");
    label.className = "code-lang-label";
    label.textContent = labelText;
    block.appendChild(label);

    /* Copy button */
    const button = document.createElement("button");
    button.className = "code-copy-button";
    button.textContent = "Copy";

    button.addEventListener("click", async () => {
      try {
        const text = code.textContent || "";
        await navigator.clipboard.writeText(text.trimEnd());

        button.textContent = "Copied ✓";
        setTimeout(() => {
          button.textContent = "Copy";
        }, 1500);
      } catch {
        button.textContent = "Error";
      }
    });

    block.appendChild(button);
  });
});
