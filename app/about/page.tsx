import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f8faf9]">
        
        {/* HERO SECTION */}
        <section className="relative px-12 py-32 bg-gradient-to-br from-[#006e1c] via-[#00551a] to-[#004015] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2340&auto=format&fit=crop" 
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-[1400px] mx-auto relative z-10 text-center">
            <p className="text-white/80 text-sm font-semibold mb-4 tracking-wider uppercase">About Go2Agro</p>
            <h1 className="text-white text-[4rem] leading-[1.1] font-bold mb-6">
              Building Global Opportunities<br />for Agricultural Students
            </h1>
            <p className="text-white/90 text-[1.25rem] max-w-3xl mx-auto leading-[1.7]">
              An agricultural-focused organization helping students, entrepreneurs, and farmers gain international exposure, modern skills, and real-world experience.
            </p>
          </div>
        </section>

        {/* ORIGIN STORY */}
        <section className="bg-white px-12 py-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-[3rem] font-bold leading-[1.15] mb-6">Our Beginning</h2>
                <div className="space-y-5 text-[#191c1c]/70 leading-[1.7]">
                  <p>
                    Go2Agro was founded in 2019 with a clear vision — to create meaningful global opportunities for students in agriculture.
                  </p>
                  <p>
                    Started by experienced agriculture graduates (Ex-AGRICOS), the organization was built with a deep understanding of the challenges faced by agriculture students in India — limited exposure, lack of structured guidance, and minimal access to global practices.
                  </p>
                  <p>
                    The idea behind "Go2Agro" is simple: <strong className="text-[#006e1c]">Move towards agriculture with purpose, direction, and global perspective.</strong>
                  </p>
                  <p>From the beginning, our focus has been on agriculture students, aspiring agri-entrepreneurs, and farmers seeking modern practices.</p>
                </div>
              </div>
              <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <img 
                  src="https://go2agro.com/wp-content/uploads/2024/10/IMG_20190516_164106-890x1024-1.jpg" 
                  alt="Agricultural education"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="bg-[#f8faf9] px-12 py-20">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[2.75rem] font-bold text-center mb-16">Our Impact So Far</h2>
            <div className="grid md:grid-cols-4 gap-12">
              <div className="text-center">
                <div className="text-[4.5rem] font-bold text-[#006e1c] leading-none mb-4">100+</div>
                <p className="text-[#191c1c]/60 text-lg">Students Placed Internationally</p>
              </div>
              <div className="text-center">
                <div className="text-[4.5rem] font-bold text-[#006e1c] leading-none mb-4">12+</div>
                <p className="text-[#191c1c]/60 text-lg">Countries Across Europe, USA & Beyond</p>
              </div>
              <div className="text-center">
                <div className="text-[4.5rem] font-bold text-[#006e1c] leading-none mb-4">8+</div>
                <p className="text-[#191c1c]/60 text-lg">Diverse Agricultural Domains</p>
              </div>
              <div className="text-center">
                <div className="text-[4.5rem] font-bold text-[#006e1c] leading-none mb-4">50+</div>
                <p className="text-[#191c1c]/60 text-lg">Growing Network of Global Partners</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="bg-white px-12 py-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <img 
                  src="https://go2agro.com/wp-content/uploads/2022/08/IMG-20211028-WA0047.jpg" 
                  alt="Agricultural training"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-[3rem] font-bold leading-[1.15] mb-6">What We Do</h2>
                <p className="text-[#191c1c]/70 text-lg leading-[1.7] mb-8">
                  We design and deliver structured international internship and training programs that enable agricultural students to gain real-world experience in advanced farming environments.
                </p>
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#006e1c] mb-3">Our programs cover:</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#006e1c]"></div>
                    <span className="text-[#191c1c]/70">Dairy Farming</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#006e1c]"></div>
                    <span className="text-[#191c1c]/70">Poultry Farming</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#006e1c]"></div>
                    <span className="text-[#191c1c]/70">Horticulture</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#006e1c]"></div>
                    <span className="text-[#191c1c]/70">Field Crop Agriculture</span>
                  </div>
                </div>
                <div className="mt-8 bg-[#f8faf9] rounded-2xl p-6">
                  <p className="text-[#191c1c]/70 leading-[1.6]">
                    In addition, we conduct agricultural seminars, professional development programs, and entrepreneurial training initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM HIGHLIGHT */}
        <section className="bg-[#f8faf9] px-12 py-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#006e1c] font-semibold mb-4 text-sm tracking-wide uppercase">Flagship Program</p>
              <h2 className="text-[3rem] font-bold leading-[1.15] mb-6">
                Agri Professional Development<br />Program (APDP)
              </h2>
              <p className="text-[#191c1c]/70 text-lg max-w-3xl mx-auto leading-[1.7]">
                Our flagship program is designed to bridge the gap between academic knowledge and real-world agricultural practices.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                <div className="w-12 h-12 rounded-full bg-[#006e1c]/10 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#006e1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Work Internationally</h3>
                <p className="text-[#191c1c]/60 leading-[1.6]">Up to one year of hands-on experience in leading farms across Europe, USA, and beyond.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                <div className="w-12 h-12 rounded-full bg-[#006e1c]/10 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#006e1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Learn Modern Practices</h3>
                <p className="text-[#191c1c]/60 leading-[1.6]">Gain exposure to advanced agricultural technologies and sustainable farming methods.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                <div className="w-12 h-12 rounded-full bg-[#006e1c]/10 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#006e1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Build Confidence</h3>
                <p className="text-[#191c1c]/60 leading-[1.6]">Develop professional skills and independence through real-world challenges.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                <div className="w-12 h-12 rounded-full bg-[#006e1c]/10 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#006e1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Network</h3>
                <p className="text-[#191c1c]/60 leading-[1.6]">Connect with international professionals and build a lasting global network.</p>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="bg-white px-12 py-24">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[2.75rem] font-bold text-center mb-4">Our Work in Action</h2>
            <p className="text-center text-[#191c1c]/60 mb-16 max-w-2xl mx-auto leading-[1.6]">
              Real students, real experiences, real transformation.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 h-[400px] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
                <img 
                  src="https://go2agro.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-16-at-2.16.08-PM.jpeg" 
                  alt="Students on international farm"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[400px] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
                <img 
                  src="https://go2agro.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-16-at-2.15.42-PM.jpeg" 
                  alt="Training session"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[400px] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
                <img 
                  src="https://go2agro.com/wp-content/uploads/2022/08/IMG20211129010643-compressed-scaled.jpg" 
                  alt="Agricultural work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 h-[400px] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
                <img 
                  src="https://go2agro.com/wp-content/uploads/2022/08/IMG_20211028_142134-min-scaled.jpg" 
                  alt="Modern farming technology"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY TIMELINE */}
        <section className="bg-[#f8faf9] px-12 py-24">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[2.75rem] font-bold text-center mb-20">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-[#006e1c]/20"></div>
              
              {[
                { year: '2019', title: 'Founded with a Mission', desc: 'Started with a vision to support agriculture students in accessing global opportunities' },
                { year: '2020', title: 'Building Awareness', desc: 'Conducted seminars and awareness programs across agricultural universities' },
                { year: '2021', title: 'International Launch', desc: 'Successfully placed first batch of students in international internships' },
                { year: '2022', title: 'Expanding Partnerships', desc: 'Grew network of global farm partners and increased student placements' },
                { year: '2023–Present', title: 'Scaling with Technology', desc: 'Introduced GreenRoot platform for streamlined application management' }
              ].map((milestone, i) => (
                <div key={i} className={`relative mb-16 last:mb-0 ${i % 2 === 0 ? 'text-right pr-[calc(50%+3rem)]' : 'text-left pl-[calc(50%+3rem)]'}`}>
                  <div className={`absolute top-0 ${i % 2 === 0 ? 'right-[calc(50%-1rem)]' : 'left-[calc(50%-1rem)]'} w-8 h-8 rounded-full bg-[#006e1c] border-4 border-[#f8faf9]`}></div>
                  <div className="bg-white rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                    <div className="text-[#006e1c] text-2xl font-bold mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-[#191c1c]/60 leading-[1.6]">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="bg-white px-12 py-24">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[2.75rem] font-bold text-center mb-4">Meet Our Team</h2>
            <p className="text-center text-[#191c1c]/60 mb-16 max-w-2xl mx-auto leading-[1.6]">
              Experienced professionals dedicated to transforming agricultural education.
            </p>
            
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-center mb-12 text-[#006e1c]">Leadership</h3>
              <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
                {[
                  { name: 'Mr. Sunil Landkar', role: 'Co-founder & CEO', image: 'https://go2agro.com/wp-content/uploads/2022/08/sunil_1-300x300.jpg' },
                  { name: 'Mr. Omkar Echake', role: 'Co-founder & Managing Director', image: 'https://go2agro.com/wp-content/uploads/2022/08/omkar-e1731565555292-300x300.jpg' }
                ].map((member, i) => (
                  <div key={i} className="text-center">
                    <div className="w-56 h-56 mx-auto rounded-2xl bg-[#f8faf9] mb-6 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-[#006e1c] font-semibold text-lg">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-center mb-12 text-[#006e1c]">Advisory Board</h3>
              <div className="grid md:grid-cols-3 gap-10">
                {[
                  { name: 'Mr. Abraham Yehunda', role: 'CEO Israel-India Initiative Advisor- International Associate', image: 'https://go2agro.com/wp-content/uploads/2022/08/Untitled-design-62.jpg' },
                  { name: 'Giri & Jadhav Associate', role: 'Advisor – Finance & Tax', image: 'https://go2agro.com/wp-content/uploads/2024/11/061-150x150.jpg' },
                  { name: 'Radhika Sakseria', role: 'Advocate', image: 'https://go2agro.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-19-at-12.55.07-PM-300x300.jpeg' },
                  { name: 'Mr. Sharad Pabale', role: 'Member', image: 'https://go2agro.com/wp-content/uploads/2022/08/Untitled-design-60.jpg' },
                  { name: 'Mr. Shubham Jaydeokar', role: 'IT (Software) & Technical Operations', image: 'https://media.licdn.com/dms/image/v2/D5603AQGPaw9LnUBO6A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1700107055586?e=1778112000&v=beta&t=Km-r-q9uW-AR8KSoQhq7WjMcax9Fw0LXXG4uyw6aaNY' }
                ].map((member, i) => (
                  <div key={i} className="text-center">
                    <div className="w-48 h-48 mx-auto rounded-2xl bg-[#f8faf9] mb-6 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-[#006e1c] font-semibold mb-3">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="bg-[#1a1d1d] px-12 py-24">
          <div className="max-w-[1000px] mx-auto text-center">
            <h2 className="text-white text-[3rem] font-bold leading-[1.15] mb-8">What We Believe</h2>
            <p className="text-white/80 text-[1.375rem] leading-[1.8] mb-6">
              We believe that agriculture is not just a profession — it is a foundation for sustainable growth and innovation.
            </p>
            <p className="text-white/70 text-lg leading-[1.7]">
              By connecting students and farmers to global knowledge, modern practices, and real-world exposure, we aim to create a new generation of confident and capable agri-professionals.
            </p>
          </div>
        </section>

        {/* CONNECTION TO GREENROOT */}
        <section className="bg-white px-12 py-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <p className="text-[#006e1c] font-semibold mb-4 text-sm tracking-wide uppercase">The Platform</p>
                <h2 className="text-[3rem] font-bold leading-[1.15] mb-6">
                  Powered by Structure<br />and Transparency
                </h2>
                <p className="text-[#191c1c]/70 text-lg leading-[1.7] mb-8">
                  To simplify and streamline the entire journey, we have built GreenRoot — a centralized platform where students can manage their profile, applications, and progress in one place.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#006e1c] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#191c1c]/70">Clarity at every step</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#006e1c] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#191c1c]/70">Reduced confusion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#006e1c] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#191c1c]/70">A guided experience from start to finish</span>
                  </div>
                </div>
                <Link
                  href="/dashboard/internships"
                  className="inline-block gradient-primary text-white px-8 py-3.5 rounded-full text-base font-semibold hover:scale-[1.02] transition-transform duration-200"
                >
                  Explore GreenRoot Platform
                </Link>
              </div>
              <div className="relative h-[500px] rounded-3xl overflow-hidden bg-[#1a1d1d] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-8">
                <div className="text-[#4caf50] font-mono text-sm mb-4">// GreenRoot Platform</div>
                <div className="space-y-4">
                  <div className="bg-[#252929] rounded-xl p-4">
                    <div className="text-white/40 text-xs mb-2">Profile Management</div>
                    <div className="h-2 bg-[#006e1c] rounded-full w-full"></div>
                  </div>
                  <div className="bg-[#252929] rounded-xl p-4">
                    <div className="text-white/40 text-xs mb-2">Application Tracking</div>
                    <div className="h-2 bg-[#006e1c] rounded-full w-4/5"></div>
                  </div>
                  <div className="bg-[#252929] rounded-xl p-4">
                    <div className="text-white/40 text-xs mb-2">Document Management</div>
                    <div className="h-2 bg-[#006e1c] rounded-full w-3/5"></div>
                  </div>
                  <div className="bg-[#252929] rounded-xl p-4">
                    <div className="text-white/40 text-xs mb-2">Real-time Updates</div>
                    <div className="h-2 bg-[#006e1c] rounded-full w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="gradient-primary px-12 py-24">
          <div className="max-w-[900px] mx-auto text-center">
            <h2 className="text-[3rem] font-bold text-white mb-6 leading-[1.15]">
              Take the Next Step in Your<br />Agricultural Career
            </h2>
            <p className="text-white/90 text-lg mb-10 leading-[1.6]">
              Join a growing network of students gaining global exposure and real-world experience.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-[#006e1c] px-10 py-4 rounded-full text-base font-semibold hover:scale-[1.02] transition-transform duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
            >
              Start Your Application
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
