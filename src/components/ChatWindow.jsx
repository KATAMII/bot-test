import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatWindow.css';

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentDisplayText, setCurrentDisplayText] = useState('');
  const [isAnimatingText, setIsAnimatingText] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentDisplayText]);

  useEffect(() => {
    // Display welcome message when component mounts
    const welcomeMessages = [
      "👋 Welcome to LarkIt Tech Support! How can I assist you today?",
      "Hello! I'm your LarkIt Tech assistant. What brings you here?",
      "Welcome! I'm here to help with any questions about LarkIt Tech.",
      "Hi there! Ready to assist you with LarkIt Tech services. What would you like to know?",
      "Greetings! I'm your LarkIt Tech chatbot. How may I help you today?"
    ];
    const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    animateText(randomWelcome).then(text => {
      setMessages([{ text, isUser: false, isWelcome: true }]);
    });
  }, []); // Empty dependency array means this runs once when component mounts

  const animateText = async (text) => {
    setIsAnimatingText(true);
    const words = text.split(' ');
    let currentText = '';
    
    for (let word of words) {
      currentText += word + ' ';
      setCurrentDisplayText(currentText);
      // Adjust the delay (in milliseconds) to control the speed of word appearance
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setIsAnimatingText(false);
    return text;
  };

  const getRandomGreeting = (type) => {
    const greetings = {
      hello: [
        "👋 Hi there! How can I assist you today?",
        "Hello! Welcome to LarkIt Tech! What can I do for you?",
        "Greetings! I'm here to help. What would you like to know?",
        "Hey! Thanks for reaching out. How may I help you?",
        "Welcome! I'm your LarkIt Tech assistant. What brings you here today?"
      ],
      howAreYou: [
        "😊 I'm doing great, thanks for asking! How can I help you today?",
        "I'm excellent! Ready to assist you with any questions about LarkIt Tech!",
        "All systems running perfectly! What can I help you with?",
        "I'm fantastic and ready to help! What would you like to know?",
        "Doing great and excited to assist you! What's on your mind?"
      ],
      thanks: [
        "😊 You're welcome! Let me know if you need anything else!",
        "Glad I could help! Don't hesitate to ask if you have more questions!",
        "It's my pleasure! Is there anything else you'd like to know?",
        "Happy to help! Feel free to ask more questions!",
        "Anytime! I'm here if you need more assistance!"
      ],
      goodbye: [
        "👋 Goodbye! Have a great day!",
        "Take care! Come back if you have more questions!",
        "Thanks for chatting! Have a wonderful day!",
        "Bye! Hope to help you again soon!",
        "See you later! Don't hesitate to return if you need anything!"
      ]
    };

    const category = greetings[type] || greetings.hello;
    return category[Math.floor(Math.random() * category.length)];
  };

  const getFAQResponse = (question) => {
    const normalizedQuestion = question.toLowerCase().trim();

    // Greeting patterns
    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|whats up|sup|yo)\b/.test(normalizedQuestion)) {
      return getRandomGreeting('hello');
    }

    if (/how are you|how you doing|hows it going|how are things|whats new/.test(normalizedQuestion)) {
      return getRandomGreeting('howAreYou');
    }

    if (/thank you|thanks|appreciate it|thank you so much|thanks a lot/.test(normalizedQuestion)) {
      return getRandomGreeting('thanks');
    }

    if (/bye|goodbye|see you|talk to you later|have a good day|catch you later/.test(normalizedQuestion)) {
      return getRandomGreeting('goodbye');
    }

    // Other response patterns
    const responses = [
      {
        patterns: ['who is larkit', 'who are larkit', 'tell me about larkit', 'what is larkit', 'company info'],
        responses: [
          '🏢 LarkIt Tech is a leading technology company based in Nairobi, specializing in:\n• Web & Mobile Development\n• UI/UX Design\n• API Integration\n• DevOps & Cybersecurity\n• IT Consultation\n\nWe\'re dedicated to transforming businesses through innovative digital solutions.',
          '👋 We are LarkIt Tech - your technology partner! We specialize in:\n• Custom Software Development\n• Mobile Apps\n• Web Applications\n• Cloud Solutions\n• Digital Transformation\n\nLocated in Nairobi, we serve clients globally.',
          '💫 LarkIt Tech is your digital transformation partner. We offer:\n• Innovative Tech Solutions\n• Expert Development Teams\n• Modern Design Approaches\n• Reliable Support\n• Custom Business Solutions'
        ]
      },
      {
        patterns: ['services', 'what do you offer', 'what can you do', 'your offerings', 'what services','what do you do','offer'],
        responses: [
          '🚀 Our comprehensive services include:\n\n1. Web Development\n2. Mobile App Development (Android & iOS)\n3. UI/UX Design\n4. API Integration\n5. DevOps Services\n6. Cybersecurity Solutions\n7. IT Consultation\n8. USSD Development\n9. SEO Optimization\n\nWhich service would you like to know more about?',
          '💻 Here\'s what we offer:\n\n• Full-Stack Web Development\n• Cross-Platform Mobile Apps\n• Custom Software Solutions\n• Cloud Integration\n• Security Services\n• Digital Marketing\n• Technical Support\n\nLet me know which interests you!',
          '🌟 Our service portfolio:\n\n1. Digital Solutions\n   - Websites\n   - Mobile Apps\n   - Custom Software\n2. Technical Services\n   - Cloud Computing\n   - API Development\n   - Security\n3. Business Solutions\n   - IT Consulting\n   - Digital Marketing\n   - Support'
        ]
      },
      {
        patterns: ['contact', 'reach', 'call', 'phone', 'email'],
        responses: [
          '📞 Here\'s how you can reach us:\nPhone: +254 713 570 691\nEmail: info@larkit.tech\nLocation: Taj Towers, Upper Hill Road',
          '📱 Get in touch with us:\nCall: +254 713 570 691\nEmail: info@larkit.tech\nVisit: Taj Towers, Upper Hill Road',
          '📧 Contact us anytime:\nPhone: +254 713 570 691\nEmail: info@larkit.tech\nAddress: Taj Towers, Upper Hill Road'
        ]
      },
      {
        patterns: ['location', 'address', 'office', 'where are you', 'find you'],
        responses: [
          '🏢 Find us at:\nTaj Towers\nUpper Hill Road\n7th Floor, Room 2\nNairobi, Kenya',
          '📍 Our office location:\nTaj Towers, 7th Floor\nUpper Hill Road\nNairobi, Kenya',
          '🌍 Visit us at:\nTaj Towers\nUpper Hill Road\nRoom 2, 7th Floor\nNairobi, Kenya'
        ]
      },
      {
        patterns: ['cost', 'price', 'charges', 'fee', 'how much'],
        responses: [
          '💰 Our pricing varies based on project requirements. We offer:\n• Flexible payment plans\n• Competitive rates\n• Free initial consultation\n\nLet\'s discuss your project for a detailed quote!',
          '🏷️ We provide custom pricing based on:\n• Project scope\n• Timeline\n• Features needed\n• Support required\n\nContact us for a personalized quote!',
          '💎 Our pricing is project-specific and includes:\n• Transparent costing\n• No hidden fees\n• Flexible payment options\n\nShare your requirements for an estimate!'
        ]
      },
      {
        patterns: ['mission', 'vision', 'values', 'what drives you', 'why larkit'],
        responses: [
          '🌟 Our mission is to empower businesses through innovative technology, ensuring growth and efficiency in the digital era.',
          '🚀 At LarkIt Tech, our vision is to lead in delivering cutting-edge solutions that redefine business operations globally.',
          '💡 Our core values:\n• Innovation\n• Integrity\n• Excellence\n• Collaboration\n• Client Success'
        ]
      },
      {
        patterns: ['team', 'who works at larkit', 'your experts', 'staff', 'your team'],
        responses: [
          '👥 Our team consists of skilled developers, designers, project managers, and tech consultants, ready to bring your ideas to life.',
          '💼 We have a diverse team with expertise in:\n• Software Development\n• UI/UX Design\n• IT Consultation\n• DevOps and Cybersecurity',
          '💪 Our strength is our talented team of professionals, combining technical skills with creativity to deliver exceptional solutions.'
        ]
      },
      {
        patterns: ['clients', 'who are your clients', 'worked with', 'your customers', 'client list'],
        responses: [
          '🧑‍💼 We’ve served clients across various industries, including education, healthcare, e-commerce, and finance.',
          '🌍 Our clientele includes startups, small businesses, and enterprises locally and globally.',
          '🎯 LarkIt Tech collaborates with businesses to deliver tailored solutions that meet their needs.'
        ]
      },
      {
        patterns: ['technologies', 'tools', 'stack', 'what tools', 'what tech'],
        responses: [
          '🛠️ We use modern technologies like:\n• Frontend: React.js, Angular\n• Backend: Node.js, Express.js\n• Databases: PostgreSQL, MongoDB\n• Tools: Prisma ORM, Docker',
          '💻 Our tech stack includes:\n• Languages: JavaScript, TypeScript\n• Frameworks: React.js, Node.js\n• Database: PostgreSQL\n• Cloud: AWS, DigitalOcean',
          '⚙️ Technologies we love:\n• Frontend: React\n• Backend: Node.js\n• Cloud: AWS\n• API: GraphQL/REST'
        ]
      },
      {
        patterns: ['support', 'help', 'assist', 'after-sales', 'post-delivery'],
        responses: [
          '📞 We offer post-delivery support, including:\n• Bug fixes\n• System updates\n• Technical assistance\n\nContact us for more details!',
          '🤝 Our commitment doesn’t end at delivery. We provide ongoing support and maintenance to ensure smooth operations.',
          '🛠️ Need help? Our team is available for post-launch support, including updates, troubleshooting, and training.'
        ]
      },
      {
        patterns: ['how long', 'timeline', 'duration', 'time frame', 'project duration'],
        responses: [
          '⏳ Timelines depend on project scope. For example:\n• Websites: 2-4 weeks\n• Apps: 6-12 weeks\n• Custom solutions: Varies based on complexity',
          '📅 Typical delivery times:\n• Simple sites: 2-3 weeks\n• Complex apps: 8-12 weeks\n\nLet us know your requirements for accurate estimates!',
          '🕒 Timelines are project-specific. We prioritize quality and efficiency. Let’s discuss your project for an accurate timeline!'
        ]
      },
      {
        patterns: ['security', 'cybersecurity', 'safe', 'protection', 'secure'],
        responses: [
          '🔒 Security is a priority at LarkIt Tech. We implement:\n• Data encryption\n• Secure coding practices\n• Vulnerability testing\n\nYour data is safe with us!',
          '🛡️ Our cybersecurity measures include:\n• Regular penetration testing\n• Real-time threat monitoring\n• Secure infrastructure for all projects.',
          '🔐 We ensure project security through:\n• SSL/TLS encryption\n• GDPR compliance\n• Regular security audits'
        ]
      },
      {
        patterns: ['careers', 'jobs', 'hiring', 'join your team', 'work for larkit'],
        responses: [
          '📢 We’re always looking for talented individuals! Check out our Careers page to see open positions and apply.',
          '👩‍💻 Interested in joining LarkIt Tech? We hire developers, designers, and tech consultants. Send your resume to careers@larkit.tech.',
          '🚀 Looking to grow your career in tech? LarkIt Tech offers a dynamic environment for innovation and growth. Contact us for job openings!'
        ]
      },
      {
        patterns: ['portfolio', 'projects', 'examples', 'testimonials', 'past work'],
        responses: [
          '📂 Explore our portfolio to see our completed projects in web and app development, UI/UX design, and more!',
          '💼 Check out our case studies and testimonials to learn how we’ve helped businesses achieve their goals.',
          '🎨 Our portfolio includes projects in education, healthcare, and e-commerce. Visit our website to learn more!'
        ]
      },
      {
        patterns: ['collaboration', 'partnership', 'partner', 'work together', 'join us'],
        responses: [
          '🤝 We value collaboration! Partner with us to bring innovative solutions to life.',
          '🌍 We collaborate with businesses, startups, and individuals to create impactful tech solutions.',
          '📢 Interested in partnering with LarkIt Tech? Let’s work together to build something great!'
        ]
      },
      {
        patterns: ['custom', 'tailored', 'specific needs', 'unique project', 'bespoke'],
        responses: [
          '🛠️ Need a custom solution? We create tailored applications to meet your specific business requirements.',
          '🎯 LarkIt Tech specializes in bespoke software development designed around your goals.',
          '🚀 Share your unique ideas with us, and we’ll transform them into reality with custom-built solutions!'
        ]
      },
      {
        "patterns": ["values", "core values", "larkit's values", "company principles", "what do you believe in"],
        "responses": [
          "🌟 Our core values include:\n• Innovation\n• Integrity\n• Collaboration\n• Excellence\n• Client-centric focus",
          "💡 LarkIt Tech is driven by values like:\n• Trust\n• Quality\n• Transparency\n• Respect\n• Passion for technology",
          "🚀 We believe in:\n• Providing cutting-edge solutions\n• Fostering long-term partnerships\n• Empowering businesses through technology"
        ]
      },
      {
        "patterns": ["workshops", "training", "learning", "developer programs", "developer workshops"],
        "responses": [
          "🎓 LarkIt Tech offers hands-on workshops for developers to learn new technologies, frameworks, and tools. Join us for our upcoming training sessions!",
          "🚀 We run regular training programs focusing on:\n• Web Development\n• Mobile Development\n• UI/UX Design\n• Cybersecurity\n\nStay tuned for our next sessions!",
          "👨‍💻 Our workshops are designed for all levels, from beginners to experts. Check out our training page for more information!"
        ]
      },
      {
        "patterns": ["technologies used", "what technologies do you use", "which tools do you use", "tech stack", "tech tools"],
        "responses": [
          "🛠️ At LarkIt Tech, we use the latest and greatest tools and technologies:\n• Frontend: React.js, Angular, Vue.js\n• Backend: Node.js, Express.js, Python\n• Database: PostgreSQL, MongoDB\n• DevOps: Docker, Kubernetes\n• Cloud Services: AWS, Azure, Google Cloud",
          "💻 Our development stack includes:\n• Frontend: React.js, Vue.js\n• Backend: Node.js, Express, Django\n• Database: MySQL, MongoDB\n• DevOps: Jenkins, Docker\n\nWe're always exploring new technologies to stay ahead of the curve!",
          "⚙️ The technologies we use:\n• Programming Languages: JavaScript, TypeScript\n• Frameworks: React, Node.js, Django\n• Databases: PostgreSQL, MySQL, Firebase\n• Cloud: AWS, Google Cloud"
        ]
      },
      {
        "patterns": ["leadership", "management team", "founders", "who are the leaders", "team leaders"],
        "responses": [
          "👥 The leadership team at LarkIt Tech is composed of experienced professionals who bring vision and innovation:\n• Newton Nganga Maiguah - CEO\n• [Name of CTO/Co-founder] - CTO\n• [Name of other key leaders] - [Position]",
          "🌟 Our leadership team guides the company with a focus on customer satisfaction, innovation, and growth in the tech industry.",
          "🚀 Led by Newton Nganga Maiguah, our leadership team consists of passionate professionals committed to delivering excellent tech solutions."
        ]
      },
      {
        "patterns": ["testing", "QA", "quality assurance", "how do you test", "app testing"],
        "responses": [
          "🛠️ Quality Assurance at LarkIt Tech involves:\n• Unit testing\n• Integration testing\n• User acceptance testing (UAT)\n• Automated testing (using Selenium, Jest)\n• Security testing",
          "🔍 We ensure high-quality solutions by performing rigorous testing across different environments:\n• Manual and automated tests\n• Cross-browser and cross-platform testing\n• Performance and load testing",
          "💎 Our QA process includes:\n• Comprehensive testing at every stage\n• Early bug detection\n• Constant communication with clients to ensure their requirements are met"
        ]
      },
      {
        "patterns": ["timing", "availability", "when can we start", "how soon can we begin", "start time"],
        "responses": [
          "⏳ We can start working on your project as soon as we finalize the details. Typically, the onboarding process takes 1-2 weeks.",
          "📅 Once we have a clear understanding of your project scope, we’ll provide a timeline for the start and completion. Let’s discuss your project!",
          "🚀 We’re ready to begin immediately after agreeing on the project scope and timelines!"
        ]
      },
      {
        "patterns": ["customized solutions", "tailored services", "solutions for my business", "bespoke services", "personalized services"],
        "responses": [
          "🛠️ LarkIt Tech specializes in custom solutions designed to meet your business needs. Whether you need web development, mobile apps, or IT consultation, we tailor our services to fit your goals.",
          "🎯 We build customized solutions that align perfectly with your business objectives, ensuring maximum impact and results.",
          "🚀 Share your unique requirements, and we’ll provide a personalized, high-quality solution tailored just for you."
        ]
      },
      {
        patterns: ['web development', 'build websites', 'custom websites', 'develop web apps', 'responsive websites'],
        responses: [
          '🌐 We specialize in web development, creating fast, secure, and responsive websites tailored to your business needs.',
          '💻 Our web development services include e-commerce platforms, single-page applications, and CMS-based websites using modern frameworks.',
          '🚀 Technologies we use:\n• Frontend: React.js, Angular\n• Backend: Node.js, Express.js\n• Database: PostgreSQL, MongoDB.'
        ]
      },
      {
        patterns: ['app development', 'mobile apps', 'build apps', 'iOS apps', 'Android apps'],
        responses: [
          '📱 We design and develop mobile apps for Android and iOS platforms, focusing on usability and performance.',
          '💡 Whether native (Kotlin, Swift) or cross-platform (Flutter, React Native), we build apps tailored to your goals.',
          '🚀 From prototyping to deployment, our app development process ensures your ideas turn into feature-rich mobile applications.'
        ]
      },
      {
        patterns: ['USSD', 'USSD development', 'USSD code', 'mobile services', 'offline access'],
        responses: [
          '📞 We offer USSD development for businesses to reach customers without requiring internet access.',
          '📲 Use USSD to improve accessibility for mobile banking, surveys, and customer engagement.',
          '🚀 Our solutions include custom USSD codes designed to match your business needs and scale effortlessly.'
        ]
      },
      {
        patterns: ['UI/UX design', 'user interface', 'user experience', 'app design', 'custom design'],
        responses: [
          '🎨 Our UI/UX design services focus on creating user-friendly and visually appealing interfaces.',
          '💡 We craft intuitive designs that enhance usability and align with your brand identity.',
          '🚀 From wireframes to final prototypes, our designs ensure an exceptional user experience, using tools like Figma and Adobe XD.'
        ]
      },
      {
        patterns: ['API integration', 'integrate APIs', 'payment gateway', 'connect systems', 'API services'],
        responses: [
          '🔗 We provide seamless API integration for systems like payment gateways (MPesa, PayPal) and third-party services.',
          '💡 Enhance your app’s capabilities with RESTful or GraphQL API integrations tailored to your requirements.',
          '🚀 Whether for payments, analytics, or communication, our API solutions streamline processes efficiently.'
        ]
      },
      {
        patterns: ['DevOps', 'server maintenance', 'deployment', 'cloud services', 'infrastructure management'],
        responses: [
          '🔧 We offer DevOps solutions, including deployment, server maintenance, and infrastructure optimization.',
          '💡 Our cloud services (AWS, DigitalOcean) ensure your applications are scalable and highly available.',
          '🚀 With CI/CD pipelines and automated workflows, we streamline your deployment process for maximum efficiency.'
        ]
      },
      {
        patterns: ['web design', 'WordPress websites', 'create WordPress', 'design websites', 'WordPress development'],
        responses: [
          '🖌️ We create stunning WordPress websites that are visually appealing and easy to manage.',
          '💡 Our WordPress design services include custom themes, plugins, and SEO optimization for a unique online presence.',
          '🚀 From personal blogs to business websites, we ensure responsive and user-friendly WordPress designs tailored to your brand.'
        ]
      },
      {
        patterns: ['quality assurance', 'QA testing', 'cybersecurity', 'performance testing', 'secure apps'],
        responses: [
          '🔒 We provide thorough QA testing to ensure your application is secure, reliable, and bug-free.',
          '⚙️ Our performance testing services identify bottlenecks to improve speed and scalability.',
          '🚀 Cybersecurity is a priority—we safeguard your systems with vulnerability assessments and penetration testing.'
        ]
      },
      {
        patterns: ['blockchain', 'smart contracts', 'crypto development', 'blockchain solutions', 'decentralized apps'],
        responses: [
          '🔗 Our blockchain solutions (coming soon) will include smart contract development and decentralized applications (DApps).',
          '💡 From cryptocurrency wallets to blockchain-based supply chain systems, we aim to deliver cutting-edge solutions.',
          '🚀 Stay tuned for our blockchain services leveraging Ethereum, Solana, and other leading platforms.'
        ]
      },
      {
        patterns: ['IT consultation', 'tech consulting', 'IT services', 'digital transformation', 'IT solutions'],
        responses: [
          '📘 Our IT consultation services help businesses adopt the right technologies for growth and efficiency.',
          '💡 Whether you need system upgrades, cloud migration, or IT strategy planning, we provide tailored solutions.',
          '🚀 Partner with us to navigate the complexities of digital transformation with expert guidance and support.'
        ]
      },
      {
        patterns: ['networking', 'IT networking', 'network setup', 'Wi-Fi installation', 'LAN/WAN solutions'],
        responses: [
          '🌐 We provide comprehensive networking solutions, including LAN/WAN setup, Wi-Fi installation, and network security.',
          '💡 Our services ensure optimized and secure communication across your organization’s devices.',
          '🚀 From small offices to enterprise setups, we design and implement networks that support seamless operations.'
        ]
      },
      {
        patterns: ['custom software', 'build software', 'custom apps', 'bespoke software', 'software solutions'],
        responses: [
          '💻 We specialize in custom software development tailored to solve your unique business challenges.',
          '💡 From CRM systems to workflow automation tools, we create scalable solutions using cutting-edge technology.',
          '🚀 Our agile development process ensures timely delivery of user-friendly software that fits your needs.'
        ]
      },
      {
        patterns: ['data analytics', 'business insights', 'data reporting', 'analyze data', 'big data'],
        responses: [
          '📊 Unlock insights with our data analytics and reporting solutions that turn raw data into actionable strategies.',
          '💡 We use advanced tools like Power BI, Tableau, and Python to create custom dashboards and reports.',
          '🚀 From trend analysis to predictive modeling, our services empower data-driven decision-making.'
        ]
      },
      {
        patterns: ['training', 'IT training', 'technical support', 'IT support', 'training programs'],
        responses: [
          '🎓 We offer IT training programs to upskill your team in modern technologies and tools.',
          '💡 Our support services include troubleshooting, system updates, and ongoing technical assistance.',
          '🚀 Whether for individuals or businesses, we provide comprehensive training and support tailored to your needs.'
        ]
      },
      {
        patterns: ['frameworks', 'what frameworks', 'tech stack', 'technologies used', 'stack for development'],
        responses: [
          '🚀 Technologies we use:\n• **Frontend**: React.js, Angular, Vue.js, Next.js\n• **Backend**: Node.js, Express.js, Nest.js, Django, Flask\n• **Database**: PostgreSQL, MongoDB, MySQL, Firebase, SQLite\n• **Mobile**: React Native, Flutter\n• **Cloud**: AWS, DigitalOcean, Azure',
          '💻 Our development stack includes:\n• **Frontend Frameworks**: React.js, Angular, Vue.js\n• **Backend Frameworks**: Express.js, Django, Flask, Laravel\n• **Databases**: PostgreSQL, MongoDB, MySQL\n• **Other Tools**: GraphQL, Prisma, Docker, Kubernetes',
          '⚙️ Frameworks and tools we work with:\n• **Web**: React.js, Next.js, Angular, Vue.js\n• **Mobile**: Flutter, React Native\n• **Backend**: Node.js, Express.js, Django, Flask\n• **Cloud Services**: AWS, Google Cloud, Firebase\n• **Database**: PostgreSQL, MongoDB, SQLite, MySQL'
        ]
      }
      
    ];

    // Check each response category
    for (const category of responses) {
      if (category.patterns.some(pattern => normalizedQuestion.includes(pattern))) {
        return category.responses[Math.floor(Math.random() * category.responses.length)];
      }
    }

    // Check if question contains any keywords
    const keywords = ['website', 'app', 'mobile', 'development', 'design', 'security', 'cloud', 'api', 'software'];
    const hasKeyword = keywords.some(keyword => normalizedQuestion.includes(keyword));

    if (hasKeyword) {
      return '🎯 I see you\'re interested in our technical services! We offer comprehensive solutions in web development, mobile apps, design, and more. Would you like specific information about any of these areas?';
    }

    // Default response if no pattern matches
    return "I'm here to help! You can ask me about:\n• Our company and history\n• Services we offer\n• Project pricing\n• Contact information\n• Office location\n• Or anything specific about web, mobile, or software development!";
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInputMessage('');
    setIsTyping(true);

    const response = getFAQResponse(userMessage);
    setIsTyping(false);
    const animatedResponse = await animateText(response);
    setMessages(prev => [...prev, { text: animatedResponse, isUser: false }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>LarkIt Tech Support</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'} ${message.isWelcome ? 'welcome-message' : ''}`}>
            {message.text}
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
        {isAnimatingText && (
          <div className="bot-message">
            {currentDisplayText}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
