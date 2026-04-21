import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f8faf9]">
        <section className="relative px-12 py-20">
          <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h1 className="text-[4rem] leading-[1.1] font-bold mb-6 tracking-tight">
                <span className="italic text-[#006e1c]">International</span>{' '}
                Agriculture Internships
              </h1>
              <p className="text-[1.125rem] leading-[1.7] mb-10 text-[#191c1c]/60">
                Connect with leading agricultural organizations worldwide and gain hands-on experience through meaningful internships.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/signup"
                  className="gradient-primary text-white px-8 py-3.5 rounded-full text-base font-semibold hover:scale-[1.02] transition-transform duration-200"
                >
                  Start Your Application
                </Link>
                <Link
                  href="/dashboard/internships"
                  className="bg-white text-[#006e1c] px-8 py-3.5 rounded-full text-base font-semibold hover:scale-[1.02] transition-transform duration-200 border border-[#191c1c]/10"
                >
                  Explore Programs
                </Link>
              </div>
            </div>
            
            <HeroCarousel />
          </div>
        </section>

        <section className="bg-white px-12 py-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-[#f8faf9] rounded-2xl p-8 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-200">
                <div className="w-12 h-12 mx-auto mb-6">
                  <svg className="w-full h-full text-[#191c1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-[1.125rem] font-semibold mb-3">Curated Listings</h3>
                <p className="text-[#191c1c]/60 leading-[1.6] text-[0.9375rem]">
                  Access hand-picked internship opportunities from verified agricultural organizations.
                </p>
              </div>

              <div className="text-center bg-[#f8faf9] rounded-2xl p-8 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-200">
                <div className="w-12 h-12 mx-auto mb-6">
                  <svg className="w-full h-full text-[#191c1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-[1.125rem] font-semibold mb-3">Simple Applications</h3>
                <p className="text-[#191c1c]/60 leading-[1.6] text-[0.9375rem]">
                  Streamlined application process with easy-to-use forms and document uploads.
                </p>
              </div>

              <div className="text-center bg-[#f8faf9] rounded-2xl p-8 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-200">
                <div className="w-12 h-12 mx-auto mb-6">
                  <svg className="w-full h-full text-[#191c1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-[1.125rem] font-semibold mb-3">Expert Support</h3>
                <p className="text-[#191c1c]/60 leading-[1.6] text-[0.9375rem]">
                  Get guidance from agriculture professionals throughout your journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1a1d1d] px-12 py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <p className="text-[#4caf50] font-semibold mb-4 text-sm tracking-wide">THE CURRENT PROCESS IS CONFUSING</p>
                <h2 className="text-white text-[2.75rem] font-bold leading-[1.15] mb-8">
                  A Better Way to Apply and Succeed
                </h2>
                <p className="text-white/70 leading-[1.7] text-[1rem]">
                  Traditional internship search platforms scatter opportunities across disconnected systems. We've built a centralized hub that connects students directly with verified agricultural organizations, streamlining the entire application journey.
                </p>
              </div>
              
              <div className="bg-[#252929] rounded-2xl p-10">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#4caf50]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-[#4caf50]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Verified Organizations</h4>
                      <p className="text-white/60 text-[0.9375rem] leading-[1.6]">All partner organizations are thoroughly vetted for quality and credibility.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#4caf50]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-[#4caf50]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Simplified Applications</h4>
                      <p className="text-white/60 text-[0.9375rem] leading-[1.6]">One profile, multiple applications. Save time with our streamlined process.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#4caf50]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-[#4caf50]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Real-Time Updates</h4>
                      <p className="text-white/60 text-[0.9375rem] leading-[1.6]">Track your application status and receive instant notifications.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-12 py-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="relative h-[480px] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1688561809321-e51e8a4d6651?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Smart farming technology"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h2 className="text-[2.75rem] font-bold leading-[1.15] mb-6">
                  A Smarter Way to Apply and Succeed
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#006e1c] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-[#191c1c]/70 leading-[1.6]">Create your profile once and apply to multiple opportunities</p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#006e1c] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-[#191c1c]/70 leading-[1.6]">Get personalized recommendations based on your interests and qualifications</p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#006e1c] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-[#191c1c]/70 leading-[1.6]">Track all your applications in one centralized dashboard</p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#006e1c] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-[#191c1c]/70 leading-[1.6]">Receive real-time updates on your application status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-12 py-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative h-[480px] rounded-3xl overflow-hidden">
                <div className="flex h-full gap-2">
                  <img 
                    src="https://go2agro.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-16-at-2.16.08-PM.jpeg" 
                    alt="Agricultural internship program"
                    className="w-1/2 h-full object-cover rounded-l-3xl"
                  />
                  <img 
                    src="https://go2agro.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-16-at-2.15.42-PM.jpeg" 
                    alt="Students in agricultural program"
                    className="w-1/2 h-full object-cover rounded-r-3xl"
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-[2.75rem] font-bold leading-[1.15] mb-8">
                  Intelligence Behind<br />the Platform
                </h2>
                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                  <div>
                    <div className="text-[3rem] font-bold text-[#006e1c] leading-none mb-2">150+</div>
                    <p className="text-[#191c1c]/60 text-[0.9375rem]">Partner Organizations</p>
                  </div>
                  <div>
                    <div className="text-[3rem] font-bold text-[#006e1c] leading-none mb-2">12k+</div>
                    <p className="text-[#191c1c]/60 text-[0.9375rem]">Students Connected</p>
                  </div>
                  <div>
                    <div className="text-[3rem] font-bold text-[#006e1c] leading-none mb-2">45</div>
                    <p className="text-[#191c1c]/60 text-[0.9375rem]">Countries Worldwide</p>
                  </div>
                  <div>
                    <div className="text-[3rem] font-bold text-[#006e1c] leading-none mb-2">98%</div>
                    <p className="text-[#191c1c]/60 text-[0.9375rem]">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8faf9] px-12 py-20">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[2.5rem] font-bold text-center mb-4">Curated Global Programs</h2>
            <p className="text-center text-[#191c1c]/60 mb-16 max-w-2xl mx-auto leading-[1.6]">
              Discover internship opportunities across diverse agricultural sectors worldwide.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Sustainable Farming Internship', location: 'Amsterdam, Netherlands', stipend: '€800/month', image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { title: 'AgriTech Innovation Program', location: 'California, USA', stipend: '$1,200/month', image: 'https://images.unsplash.com/photo-1620200423727-8127f75d7f53?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { title: 'Organic Cultivation Research', location: 'Auckland, New Zealand', stipend: 'NZ$1,000/month', image: 'https://plus.unsplash.com/premium_photo-1679428615303-ef60c1258c66?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
              ].map((program, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-200">
                  <div className="h-[200px] overflow-hidden">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-[1.25rem] font-semibold mb-3">{program.title}</h3>
                    <div className="flex items-center gap-2 text-[#191c1c]/60 text-[0.9375rem] mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#006e1c] font-semibold text-[0.9375rem]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{program.stipend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-12 py-20">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[2.5rem] font-bold text-center mb-4">
              Watch How we create an impact
            </h2>
            <p className="text-center text-[#191c1c]/60 mb-12 max-w-2xl mx-auto leading-[1.6]">
              for students to discover and secure their dream agricultural internships.
            </p>
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/vwIouASBA1A"
                title="Agricultural Internship Success Stories"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section className="bg-[#f8faf9] px-12 py-20">
          <div className="max-w-[900px] mx-auto text-center">
            <blockquote className="text-[1.75rem] leading-[1.5] mb-10 font-display text-[#191c1c]">
              "GreenRoot helped me secure an amazing precision agriculture internship in Denmark. Coming from a small agricultural college in India, I never imagined I'd get such an opportunity. The platform made everything simple, from application to visa guidance."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#006e1c]/20" />
              <div className="text-left">
                <div className="font-semibold text-[#191c1c]">Rajesh Kumar</div>
                <div className="text-[#191c1c]/60 text-sm">Agricultural Engineering, Punjab Agricultural University</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-12 py-20">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[2.5rem] font-bold text-center mb-4">Latest Programs</h2>
            <p className="text-center text-[#191c1c]/60 mb-16 max-w-2xl mx-auto">
              Fresh opportunities added weekly from our global network of partners.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Vertical Farming Initiative', location: 'Singapore', stipend: 'S$1,500/month', image: 'https://images.unsplash.com/photo-1635168560628-023e619ab4a7?q=80&w=2352&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { title: 'Regenerative Agriculture', location: 'Melbourne, Australia', stipend: 'A$1,400/month', image: 'https://images.unsplash.com/photo-1563201515-adbe35c669c5?q=80&w=2348&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { title: 'Precision Farming Tech', location: 'Berlin, Germany', stipend: '€900/month', image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
              ].map((program, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-200">
                  <div className="h-[200px] overflow-hidden">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-block bg-[#006e1c]/10 text-[#006e1c] px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      New
                    </div>
                    <h3 className="text-[1.125rem] font-semibold mb-3">{program.title}</h3>
                    <div className="flex items-center gap-2 text-[#191c1c]/60 text-[0.875rem] mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#006e1c] font-semibold text-[0.875rem]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{program.stipend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gradient-primary px-12 py-24">
          <div className="max-w-[900px] mx-auto text-center">
            <h2 className="text-[3rem] font-bold text-white mb-6 leading-[1.15]">
              Start Your International<br />Internship Journey Today
            </h2>
            <p className="text-white/90 text-lg mb-10 leading-[1.6]">
              Join thousands of students discovering meaningful agricultural careers worldwide.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-[#006e1c] px-10 py-4 rounded-full text-base font-semibold hover:scale-[1.02] transition-transform duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
            >
              Start your application
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
