import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { ArrowDown } from "lucide-react";

export default function App() {

  const [showPolicy, setShowPolicy] = useState(null);

  const policyContent = {
    "Privacy Policy": [
      "We collect basic information such as name, email, and message when you contact us through the website.",
      "Your information is used only for communication regarding services or project inquiries.",
      "We do not sell, trade, or share your personal information with third parties.",
      "All information submitted through the contact form is kept confidential.",
      "We may update this policy occasionally to reflect improvements in our services."
    ],
    "Terms & Conditions": [
      "All website content, design, and branding are the property of Pole Digital Solutions.",
      "Users agree to use the website only for lawful purposes.",
      "Project timelines and deliverables are agreed upon before starting a client project.",
      "Pole Digital Solutions is not responsible for third‑party services integrated into client websites.",
      "We reserve the right to update services, pricing, or policies at any time."
    ],
    "Cookie Policy": [
      "This website may use cookies to improve user experience and website performance.",
      "Cookies help us understand visitor behavior and improve website functionality.",
      "No personally identifiable information is stored in cookies.",
      "Users can disable cookies through their browser settings.",
      "Continuing to use this website implies acceptance of our cookie usage."
    ]
  };

  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);

  const services = [
    { title: "Business Websites", img: "/Images/services/business.jpg" },
    { title: "Company Websites", img: "/Images/services/company.jpg" },
    { title: "Import Export Websites", img: "/Images/services/import-export.jpg" },
    { title: "Portfolio Websites", img: "/Images/services/portfolio.jpg" },
    { title: "Startup Landing Pages", img: "/Images/services/startup.jpg" },
    { title: "Restaurant Websites", img: "/Images/services/restaurant.jpg" },
    { title: "Real Estate Websites", img: "/Images/services/realestate.jpg" },
    { title: "Educational Websites", img: "/Images/services/education.jpg" }
  ];

  const works = [
    "/Images/work/project1.mp4",
    "/Images/work/project2.mp4"
  ];

  const reviews = [
    { name: "Rahul Sharma", text: "Pole Digital built an amazing website for our business. Professional design and fast delivery." },
    { name: "Priya Mehta", text: "Our Google Business setup helped us attract more customers online." },
    { name: "Amit Verma", text: "Modern design and excellent support throughout the project." },
    { name: "Sanjay Kumar", text: "Great experience working with Pole Digital Solutions." },
    { name: "Neha Gupta", text: "The website design was modern and helped improve our brand image." }
  ];

  const workRef = useRef(null);
  const reviewRef = useRef(null);

  useEffect(() => {

    const workContainer = workRef.current;
    const reviewContainer = reviewRef.current;

    let workAnim;
    let reviewAnim;

    const workScroll = () => {
      if (!workContainer) return;

      workContainer.scrollLeft += 0.5;
      const maxScroll = workContainer.scrollWidth / 2;

      if (workContainer.scrollLeft >= maxScroll) {
        workContainer.scrollLeft = 0;
      }

      workAnim = requestAnimationFrame(workScroll);
    };

    const reviewScroll = () => {
      if (!reviewContainer) return;

      reviewContainer.scrollLeft += 0.35;
      const maxScroll = reviewContainer.scrollWidth / 2;

      if (reviewContainer.scrollLeft >= maxScroll) {
        reviewContainer.scrollLeft = 0;
      }

      reviewAnim = requestAnimationFrame(reviewScroll);
    };

    workAnim = requestAnimationFrame(workScroll);
    reviewAnim = requestAnimationFrame(reviewScroll);

    const counter = setInterval(() => {
      setProjects((p) => (p < 50 ? p + 1 : p));
      setClients((c) => (c < 20 ? c + 1 : c));
    }, 40);

    return () => {
      cancelAnimationFrame(workAnim);
      cancelAnimationFrame(reviewAnim);
      clearInterval(counter);
    };

  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const whatsapp = `https://wa.me/919391084425?text=Name:%20${name}%0AEmail:%20${email}%0AMessage:%20${message}`;

    window.open(whatsapp, "_blank");

    window.location.href = `mailto:poledigitalsolutions@gmail.com?subject=Website Inquiry&body=Name:${name}%0AEmail:${email}%0AMessage:${message}`;
  };

  return (

    <div className="font-sans scroll-smooth bg-gray-50 overflow-x-hidden">

      {/* POLICY MODAL */}
      {showPolicy && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
          <div className="bg-white max-w-2xl w-full rounded-xl p-8 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-4">{showPolicy}</h2>

            <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
              {policyContent[showPolicy]?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <button
              onClick={() => setShowPolicy(null)}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/919391084425"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl text-2xl z-50 hover:scale-110 transition"
      >
        <FaWhatsapp />
      </a>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

          <div className="flex items-center gap-3">
            <img src="/Images/services/logo.png" alt="Pole Digital Solutions" className="h-10" />
            <span className="font-bold text-blue-900">Pole Digital Solutions</span>
          </div>

          <div className="space-x-6 hidden md:flex font-medium">
            <a href="#home" className="hover:text-blue-600">Home</a>
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#work" className="hover:text-blue-600">My Work</a>
            <a href="#testimonials" className="hover:text-blue-600">Testimonials</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </div>

        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a] text-white">

        <div className="absolute inset-0">
          <div className="absolute w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[160px] top-[-120px] left-[-120px] animate-pulse" />
          <div className="absolute w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[160px] bottom-[-120px] right-[-120px] animate-pulse" />
        </div>

        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl px-6"
        >

          <div className="inline-block mb-6 px-4 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm text-blue-200">
            Professional Website Development
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Modern Websites
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              For Growing Businesses
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Fast, modern and conversion focused websites that help businesses
            build credibility and attract more customers online.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">

            <a href="#work" className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl font-semibold transition shadow-lg hover:scale-105">
              View My Work
            </a>

            <a href="#contact" className="border border-gray-400 px-8 py-3 rounded-xl hover:bg-white hover:text-black transition">
              Start Your Project
            </a>

          </div>

          <p className="mt-10 text-gray-400 text-sm">
            Trusted by startups and businesses across India
          </p>

        </motion.div>

        <div className="absolute bottom-10 flex flex-col items-center text-gray-400">
          <span className="text-sm mb-2">Scroll</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown size={22} />
          </motion.div>
        </div>

      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900">Services</h2>
            <p className="text-gray-600 mt-4">Websites designed for every industry</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {services.map((service, i) => (

              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative rounded-xl overflow-hidden shadow-lg group"
              >

                <img src={service.img} className="h-44 w-full object-cover" alt={service.title} />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <p className="text-white font-semibold text-center px-4 text-lg">{service.title}</p>
                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 bg-gray-50">

        <div className="max-w-6xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold text-blue-900 mb-6">About Pole Digital Solutions</h2>

          <p className="text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
            Pole Digital Solutions helps businesses build a powerful online
            presence through modern and professional websites. We create
            visually stunning, mobile responsive and high performing websites
            designed to build trust and convert visitors into customers.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-3xl font-bold">{projects}+</h3>
              <p>Projects</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-3xl font-bold">{clients}+</h3>
              <p>Clients</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-3xl font-bold">100%</h3>
              <p>Satisfaction</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-3xl font-bold">24/7</h3>
              <p>Support</p>
            </div>

          </div>

        </div>

      </section>

      {/* WORK */}
      <section id="work" className="py-28 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">My Work</h2>

          <div ref={workRef} className="flex gap-10 overflow-hidden py-4">

            {[...works, ...works].map((video, i) => (

              <div key={i} className="flex-shrink-0 w-[420px] rounded-xl overflow-hidden shadow-xl group relative">

                <video src={video} autoPlay muted loop className="w-full h-[240px] object-cover" />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">Website Preview</span>
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-28 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold mb-16 text-blue-900">Client Reviews</h2>

          <div ref={reviewRef} className="flex gap-8 overflow-hidden py-6">

            {[...reviews, ...reviews].map((review, i) => (

              <div key={i} className="flex-shrink-0 w-[320px] bg-white p-8 rounded-xl shadow-lg whitespace-normal transition duration-300 hover:scale-110">
                <div className="text-yellow-400 mb-3 text-lg">★★★★★</div>
                <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>
                <p className="font-semibold text-blue-900">{review.name}</p>
              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 bg-gradient-to-br from-blue-950 to-blue-700 text-white">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-6">

          <div>
            <h2 className="text-4xl font-bold mb-10">Contact</h2>

            <div className="space-y-6 text-lg">
              <div className="flex items-center gap-4"><FaEnvelope /> poledigitalsolutions@gmail.com</div>
              <div className="flex items-center gap-4"><FaWhatsapp /> +91 9391084425</div>
              <div className="flex items-center gap-4"><FaMapMarkerAlt /> Kompally, Hyderabad</div>
              <div className="flex items-center gap-4"><FaClock /> Mon - Fri 9AM - 6PM, Sat 10AM - 4 PM</div>
              
              
            </div>
          </div>

          <form onSubmit={sendMessage} className="bg-white text-black p-8 rounded-xl shadow-2xl space-y-4">

            <input name="name" placeholder="Your Name" className="w-full p-3 border rounded" required />

            <input name="email" placeholder="Email" className="w-full p-3 border rounded" required />

            <textarea name="message" placeholder="Project Details" className="w-full p-3 border rounded h-32" required />

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
              Send Message
            </button>

          </form>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-white py-16">

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6">

          <div>
            <h3 className="font-bold text-lg mb-4">Opening Hours</h3>
            <p>Mon - Fri : 9AM - 6PM</p>
            <p>Saturday : 10AM - 4PM</p>
            <p>Sunday : Closed</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setShowPolicy('Privacy Policy')}>Privacy Policy</button></li>
              <li><button onClick={() => setShowPolicy('Terms & Conditions')}>Terms & Conditions</button></li>
              <li><button onClick={() => setShowPolicy('Cookie Policy')}>Cookie Policy</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>

            <div className="flex gap-4 text-2xl">
              <a href="https://wa.me/919391084425" target="_blank" rel="noopener noreferrer" className="hover:text-green-400"><FaWhatsapp /></a>
              <a href="https://www.instagram.com/pole_digital_solutions/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400"><FaInstagram /></a>
              <a href="https://www.linkedin.com/company/pole-digital-solutions/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaLinkedin /></a>
            </div>

            <p className="text-sm mt-6 text-gray-400">
              © {new Date().getFullYear()} Pole Digital Solutions
            </p>

          </div>

        </div>

      </footer>

    </div>

  );
}
