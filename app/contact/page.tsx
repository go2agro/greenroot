import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f8faf9]">
        <section className="relative px-12 py-32 bg-gradient-to-br from-[#006e1c] via-[#00551a] to-[#004015] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2348&auto=format&fit=crop" 
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-[1400px] mx-auto relative z-10 text-center">
            <h1 className="text-white text-[4rem] leading-[1.1] font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-white/90 text-[1.25rem] max-w-3xl mx-auto leading-[1.7]">
              We're here to help you start your agricultural internship journey.
            </p>
          </div>
        </section>

        <section className="bg-white px-12 py-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-20">
              <div>
                <h2 className="text-[2.75rem] font-bold leading-[1.15] mb-8">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#006e1c]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#006e1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Office Address</h3>
                      <p className="text-[#191c1c]/70 leading-[1.6]">
                        25 4th Floor, 26 1st Floor, B- Wing<br />
                        City Vista, Downtown Road<br />
                        Kharadi, Pune- 411014
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#006e1c]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#006e1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Phone</h3>
                      <p className="text-[#191c1c]/70 leading-[1.6]">
                        <a href="tel:+917972937388" className="hover:text-[#006e1c] transition-colors">+91 7972937388</a><br />
                        <a href="tel:+917738394086" className="hover:text-[#006e1c] transition-colors">+91 7738394086</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#006e1c]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#006e1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email</h3>
                      <p className="text-[#191c1c]/70 leading-[1.6]">
                        <a href="mailto:info@go2agro.com" className="hover:text-[#006e1c] transition-colors">info@go2agro.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#006e1c]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#006e1c]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">YouTube</h3>
                      <p className="text-[#191c1c]/70 leading-[1.6]">
                        <a href="https://www.youtube.com/@go2agroservicesllp445" target="_blank" rel="noopener noreferrer" className="hover:text-[#006e1c] transition-colors">
                          @go2agroservicesllp445
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#006e1c]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#006e1c]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">LinkedIn</h3>
                      <p className="text-[#191c1c]/70 leading-[1.6]">
                        <a href="https://www.linkedin.com/in/go2agro-436171199/" target="_blank" rel="noopener noreferrer" className="hover:text-[#006e1c] transition-colors">
                          Go2Agro
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-[2.75rem] font-bold leading-[1.15] mb-8">Visit Our Office</h2>
                <div className="rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] h-[500px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.4747!2d73.9376!3d18.5556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1b0c0c0c0c1%3A0x1!2sCity%20Vista%2C%20Kharadi%2C%20Pune!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Go2Agro Office Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8faf9] px-12 py-24">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-[2.5rem] font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-[#191c1c]/70 text-lg mb-10 leading-[1.7]">
              Explore international agricultural internship opportunities and take the first step towards your global career.
            </p>
            <a
              href="/dashboard/internships"
              className="inline-block gradient-primary text-white px-10 py-4 rounded-full text-base font-semibold hover:scale-[1.02] transition-transform duration-200"
            >
              View Internships
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
