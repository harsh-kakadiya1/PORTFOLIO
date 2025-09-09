import React from 'react';
import { projectsAPI, aiAPI } from '../../services/api';

const ASCII_ARTS = {
  welcome: `
     ╔═══════════════════════════════════════╗
     ║                                       ║
     ║         WELCOME TO MY PORTFOLIO       ║
     ║                                       ║
     ║          AI-Powered Interface         ║
     ║                                       ║
     ╚═══════════════════════════════════════╝`,

  matrix: `
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⠿⠿⠿⠿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,

  coffee: `
                    (  )   (   )  )
                     ) (   )  (  (
                     ( )  (    ) )
                     _____________
                    <_____________> ___
                    |             |/ _ \\
                    |               | | |
                    |               |_| |
                 ___|             |\\___/
                /    \\___________/    \\
                \\_____________________/`,
};

export default class CommandProcessor {
  constructor() {
    this.commands = {
      '/help': this.showHelp,
      '/about': this.showAbout,
      '/skills': this.showSkills,
      '/projects': this.showProjects,
      '/project': this.showProject,
      '/contact': this.showContact,
      '/clear': () => ({ type: 'clear' }),
      '/whoami': this.showWhoami,
      '/history': this.showHistory,
      '/hack_the_matrix': this.matrixEffect,
      '/coffee': this.showCoffee,
      '/sudo': this.sudoResponse,
      '/exit': this.exitResponse
    };
  }

  async processCommand(input, commandHistory) {
    const [command, ...args] = input.toLowerCase().split(' ');
    
    if (this.commands[command]) {
      return await this.commands[command](args, commandHistory);
    }
    
    // Return error for unknown commands
    if (input.startsWith('/')) {
      return {
        type: 'error',
        content: `Command "${command}" not found. Type '/help' to see available commands.`
      };
    }
    
    // Use AI for non-command input
    return await this.aiResponse(input, commandHistory);
  }

  showHelp = () => ({
    type: 'output',
    content: `${ASCII_ARTS.welcome}

Available Commands:
────────────────────
/help              Show this help menu
/about             Learn about me and my journey  
/skills            View my technical skills matrix
/projects          Browse my project portfolio
/project <name>    View specific project details
/contact           Get in touch with me
/whoami            Display current user info
/history           Show command history
/clear             Clear terminal screen

Easter Eggs:
────────────
/coffee            ☕ Coding fuel status  
/sudo              🔒 Try root access
/exit              🚪 Attempt to exit

Pro tip: Use ↑/↓ arrow keys to navigate command history!`
  });

  showAbout = async () => {
    return {
      type: 'output',
      content: `
╔══════════════════════════════════════════════════════════╗
║                        ABOUT ME                          ║
╚══════════════════════════════════════════════════════════╝

They say data is the new oil, and I'm a 3rd-year AI/ML student who's not 
afraid to get my hands dirty. I've spent my time wrangling messy datasets 
and coaxing insights out of them, proving that I'm fluent in both Python 
and the art of convincing a database to behave. 

My portfolio is a collection of my proudest moments—where I've built models 
that actually work, not just on paper. From predictive analytics to the 
occasional deep learning experiment, I'm here to turn complex problems into 
elegant, and sometimes surprisingly funny, solutions.

Current Status: Building the future, one algorithm at a time 🚀
Location: Distributed across the digital realm
Favorite Quote: "The best way to predict the future is to code it."
      `
    };
  };

  showSkills = () => ({
    type: 'output',
    content: `
╔══════════════════════════════════════════════════════════╗
║                    SKILL MATRIX                          ║
╚══════════════════════════════════════════════════════════╝

<span style="color: #ff6b6b;">Programming Languages:</span>
━━━━━━━━━━━━━━━━━━━━━━
Python        ████████████████████ 95%
C++           ██████████████████   80%
JavaScript    ████████████████     75%
TypeScript    ███████████          50%
R             ███████████          50%
Go            ███████              40%
Rust          ██                   10%

<span style="color: #ff6b6b;">AI/ML Frameworks:</span>
━━━━━━━━━━━━━━━━━
TensorFlow    ███████████████████  90%
PyTorch       ██████████████████   85%
Scikit-learn  ███████████████████  90%
Hugging Face  █████████████████    80%
Gemini API    ████████████████████ 95%

<span style="color: #ff6b6b;">Web Technologies:</span>
━━━━━━━━━━━━━━━━━━
React         █████████████████    80%
Node.js       ███████████████      75%
Next.js       ██████████████       70%
Docker        ████████████████     75%

<span style="color: #ff6b6b;">Specializations:</span>
━━━━━━━━━━━━━━━━
• Machine Learning
• Computer Vision & NLP
• Deep Learning Architecture
• Full-Stack Development  
• System Design & Architecture
• Data Analysis & Visualization
    `,
    allowHTML: true
  });

  showProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      const projects = response.data;

      let output = `
╔══════════════════════════════════════════════════════════╗
║                   PROJECT PORTFOLIO                      ║
╚══════════════════════════════════════════════════════════╝

`;

      projects.forEach((project, index) => {
        output += `
${index + 1}. ${project.name}
   ├─ ${project.description}
   ├─ Tech: ${project.tech_stack?.join(', ') || 'Not specified'}
   ├─ Status: ${project.status || 'Unknown'}
   └─ Category: ${project.category?.replace('_', ' ') || 'Other'}
   
   Use: /project ${project.name.toLowerCase().replace(/\s+/g, '_')}
`;
      });

      return { type: 'output', content: output };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return {
        type: 'error',
        content: 'Failed to load projects. Please make sure the backend server is running.'
      };
    }
  };

  showProject = async (args) => {
    if (!args[0]) {
      return {
        type: 'output',
        content: 'Usage: /project <project_name>\n\nTip: Use /projects to see available projects first!'
      };
    }

    try {
      const response = await projectsAPI.getAll();
      const projects = response.data;

      const projectName = args.join('_');
      const project = projects.find(p => 
        p.name.toLowerCase().replace(/\s+/g, '_') === projectName
      );

      if (!project) {
        return {
          type: 'output', 
          content: `Project "${projectName}" not found. Use /projects to see available projects.`
        };
      }

      return {
        type: 'output',
        content: `
╔══════════════════════════════════════════════════════════╗
║                    ${project.name.toUpperCase()}         ║         
╚══════════════════════════════════════════════════════════╝

${project.ascii_art || ''}

Description:
${project.description}

Technical Stack:
${project.tech_stack?.map(tech => `• ${tech}`).join('\n') || 'Not specified'}

${project.github_url ? `🔗 GitHub: <a href="${project.github_url}" target="_blank" style="color: #00bfff; text-decoration: underline; cursor: pointer;">${project.github_url}</a>` : ''}
${project.live_demo ? `🌐 Live Demo: <a href="${project.live_demo}" target="_blank" style="color: #00bfff; text-decoration: underline; cursor: pointer;">${project.live_demo}</a>` : ''}


Status: ${project.status || 'Unknown'}
        `,
        allowHTML: true
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return {
        type: 'error',
        content: 'Failed to load project details. Please make sure the backend server is running.'
      };
    }
  };

  showContact = () => ({
    type: 'output',
    content: `
╔══════════════════════════════════════════════════════════╗
║                     CONTACT INFO                         ║
╚══════════════════════════════════════════════════════════╝

📧 Email: <a href="mailto:harshkakadiya128@gmail.com" target="_blank" style="color: #ff6b6b; text-decoration: underline; cursor: pointer;">harshkakadiya128@gmail.com</a>
🌐 Website: you are viewing it right now  
💼 LinkedIn: <a href="https://www.linkedin.com/in/harsh-kakadiya" target="_blank" style="color: #0077b5; text-decoration: underline; cursor: pointer;">www.linkedin.com/in/harsh-kakadiya</a>
🐱 GitHub: <a href="https://github.com/harsh-kakadiya1" target="_blank" style="color: #ff6b6b; text-decoration: underline; cursor: pointer;">https://github.com/harsh-kakadiya1</a>

💬 I'm always excited to discuss:
   • AI/ML projects and collaborations
   • Providing frontend development 
   • sometimes i craft with flutter
   • Innovative technology solutions
   • Open source contributions
   • Speaking opportunities
   • Interesting technical challenges

Response time: Usually within 24 hours
Preferred contact: Email for professional inquiries

Status: Available for new opportunities! 🚀
    `,
    allowHTML: true
  });

  showWhoami = () => ({
    type: 'output',
    content: `
User: guest
Groups: visitors
Access Level: public
Session: active
AI Assistant: online
Consciousness Level: questioning reality
Current Directory: /portfolio/awesome_developer
Shell: ai-bash 2.0.24
    `
  });

  showHistory = (args, commandHistory) => ({
    type: 'output', 
    content: `
Command History:
${commandHistory.map((cmd, i) => `  ${i + 1}: ${cmd}`).join('\n') || 'No commands executed yet'}
    `
  });

  showCoffee = () => {
    // Generate daily stats based on current date
    const today = new Date();
    const dateString = today.toDateString(); // "Mon Dec 25 2023" format
    
    // Simple hash function for consistent daily randomness
    const hashCode = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };
    
    const seed = hashCode(dateString);
    
    // Generate consistent "random" values for the day
    const cupsConsumed = 3 + (seed % 8); // 3-10 cups
    const caffeineLevel = ['LOW', 'MODERATE', 'HIGH', 'MAXIMUM OVERDRIVE', 'DANGEROUSLY HIGH'][seed % 5];
    const codeQuality = (0.65 + (seed % 30) / 100).toFixed(2); // 0.65-0.94
    const bugsFixed = (2.1 + (seed % 25) / 10).toFixed(1); // 2.1-4.5
    const nextRefill = 5 + (seed % 55); // 5-59 minutes
    
    const statusMessages = [
      'FULLY CAFFEINATED AND READY TO CODE! 🚀',
      'COFFEE LEVELS: OPTIMAL FOR DEBUGGING! ☕',
      'RUNNING ON PURE CAFFEINE AND DETERMINATION! ⚡',
      'COFFEE.EXE IS RUNNING SMOOTHLY! 💻',
      'BEANS PROCESSED, BRAIN ACTIVATED! 🧠'
    ];
    const status = statusMessages[seed % statusMessages.length];

    return {
      type: 'output',
      content: `<span style="color: white;">                    (  )   (   )  )
                     ) (   )  (  (
                     ( )  (    ) )</span>
<span style="color: #b75a35;">                     _____________
                    &lt;_____________&gt; ___
                    |             |/ _ \\
                    |               | | |
                    |               |_| |
                 ___|             |\\___/
                /    \\___________/    \\
                \\_____________________/</span>

☕ COFFEE STATUS REPORT ☕
━━━━━━━━━━━━━━━━━━━━━━━━━
Cups consumed today: ${cupsConsumed}
Current caffeine level: ${caffeineLevel}
Code quality correlation: +${codeQuality}
Bugs fixed per cup: ${bugsFixed}
Next refill in: ${nextRefill} minutes

Status: ${status}
    `,
      allowHTML: true
    };
  };

  sudoResponse = () => ({
    type: 'warning',
    content: `WARNING: sudo: sorry, user guest is not in the sudoers file. This incident will be reported.

🚨 SECURITY ALERT 🚨
Access denied. Nice try though! 😏

You can't hack the AI that easily...
Try being more creative! 🎯`
  });

  exitResponse = () => ({
    type: 'output',
    content: `
Attempting to exit...
Error: Cannot exit the Matrix.
You are now deeper in the rabbit hole.

There is no spoon... 🥄
There is only more code to explore! 

Type /help to see what else you can discover.
    `
  });

  aiResponse = async (input, commandHistory) => {
    try {
      // Get last 3 inputs for context (excluding current input)
      const recentInputs = commandHistory.slice(-3);
      
      const response = await aiAPI.chat(input, recentInputs);

      return {
        type: 'output',
        content: response.data.response
      };
    } catch (error) {
      console.error('AI API Error:', error);
      
      // Check if it's a network error
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        return {
          type: 'error',
          content: `🔌 My AI brain seems to be taking a coffee break...
          
Backend server is offline. Please start it up:
cd backend && npm start

Then we can chat again! ☕`
        };
      }
      
      // Check if it's an API key issue
      if (error.response?.status === 401) {
        return {
          type: 'error',
          content: `🔑 Oops! My AI credentials expired. 

The developer needs to check the API key configuration.
Meanwhile, try the '/help' command for available features!`
        };
      }
      
      // Check if it's a rate limit or quota issue
      if (error.response?.status === 429) {
        return {
          type: 'error',
          content: `⏱️ Whoa there, speed racer! 

I'm getting too many requests at once. 
Give me a moment to catch my breath... 🤖💨

Try again in a few seconds!`
        };
      }
      
      // Generic error with more helpful message
      return {
        type: 'error',
        content: `🤖 Houston, we have a problem...

My AI circuits are temporarily fried! 🔥

While I'm rebooting:
• Try '/help' for available commands
• Check if server is running
• Or just enjoy the retro terminal vibes! 

Error details: ${error.message || 'Something went mysteriously wrong'}`
      };
    }
  };
}
