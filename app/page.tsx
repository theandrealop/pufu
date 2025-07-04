"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { subscribeToNewsletter } from "@/lib/buttondown"
import { NewsletterPopup } from "@/components/newsletter-popup"

export default function PuntiFurbiHomepage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [screenSize, setScreenSize] = useState("desktop")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("mobile")
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const testimonials = [
    {
      name: "Marco R.",
      text: "Ho trovato una vacanza perfetta per tutta la famiglia grazie a Punti Furbi! Risparmiato oltre 600€.",
      image: "https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg",
    },
    {
      name: "Giulia M.",
      text: "Incredibile! Sono riuscita a volare a New York spendendo la metà del prezzo normale.",
      image: "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg",
    },
    {
      name: "Alessandro T.",
      text: "Gli avvisi di Punti Furbi mi hanno fatto risparmiare migliaia di euro sui voli per il Giappone.",
      image: "https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg",
    },
    {
      name: "Carla S.",
      text: "Finalmente posso permettermi di viaggiare spesso grazie alle offerte di Punti Furbi!",
      image: "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg",
    },
    {
      name: "Luca P.",
      text: "Con Punti Furbi ho scoperto destinazioni che non avrei mai pensato di potermi permettere.",
      image: "https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg",
    },
    {
      name: "Sofia B.",
      text: "Le notifiche di Punti Furbi sono sempre puntuali e mi hanno fatto risparmiare centinaia di euro.",
      image: "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg",
    },
  ]

  const getCardsToShow = () => {
    switch (screenSize) {
      case "mobile":
        return 1
      case "tablet":
        return 2
      case "desktop":
        return 3
      default:
        return 3
    }
  }

  const cardsToShow = getCardsToShow()
  const maxIndex = testimonials.length - cardsToShow

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentTestimonial + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const result = await subscribeToNewsletter(email)

      if (result.success) {
        setSubmitMessage(result.message)
        setEmail("")
      } else {
        setSubmitMessage(result.message)
      }
    } catch (error) {
      console.error("Newsletter signup error:", error)
      setSubmitMessage("Andrea it's better to change platform for your newsletter")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewsletterClick = () => {
    setShowNewsletterPopup(true)
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Punti Furbi Logo"
                  width={120}
                  height={48}
                  className="h-12 w-auto hover:opacity-80 transition-opacity"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/come-funziona"
                className="text-sm font-medium text-dark-green hover:opacity-70 transition-opacity"
              >
                Come funziona
              </Link>
              <Link
                href="/voli-economici"
                className="text-sm font-medium text-dark-green hover:opacity-70 transition-opacity"
              >
                Voli economici
              </Link>
              <Link href="/blog" className="text-sm font-medium text-dark-green hover:opacity-70 transition-opacity">
                Blog
              </Link>
              <Link href="/premium" className="text-sm font-medium text-dark-green hover:opacity-70 transition-opacity">
                Premium
              </Link>
              <Link
                href="/elite"
                className="text-sm font-medium text-dark-green hover:opacity-70 transition-opacity font-pp-mori"
              >
                Elite
              </Link>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={handleNewsletterClick}
                className="px-6 py-2 rounded-full bg-[#483cff] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Iscriviti
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 bg-white rounded-lg shadow-lg">
              <nav className="flex flex-col space-y-4 mt-4 px-4">
                <Link href="/come-funziona" className="text-sm font-medium text-dark-green">
                  Come funziona
                </Link>
                <Link href="/voli-economici" className="text-sm font-medium text-dark-green">
                  Voli economici
                </Link>
                <Link href="/blog" className="text-sm font-medium text-dark-green">
                  Blog
                </Link>
                <Link href="/premium" className="text-sm font-medium text-dark-green">
                  Premium
                </Link>
                <Link href="/elite" className="text-sm font-medium text-dark-green font-pp-mori">
                  Elite
                </Link>
                <div className="flex flex-col space-y-2 pt-4">
                  <button onClick={handleNewsletterClick} className="px-6 py-2 rounded-full bg-[#483cff] text-white">
                    Iscriviti
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#483cff]/5 to-light-green/10 text-[rgba(255,193,170,1)] bg-[rgba(255,254,240,1)]"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-light-green text-dark-green animate-bounce-in">
                <div className="flex -space-x-1">
                  <img
                    src="https://images.pexels.com/photos/32811796/pexels-photo-32811796.jpeg"
                    alt="user 1"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover object-center"
                  />
                  <img
                    src="https://images.pexels.com/photos/32821272/pexels-photo-32821272.jpeg"
                    alt="user 2"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover object-center"
                  />
                  <img
                    src="https://images.pexels.com/photos/32784426/pexels-photo-32784426.jpeg"
                    alt="user 3"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover object-center"
                  />
                </div>
                <span>Amato da 2M+</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>valutazione</span>
              </div>

              {/* Headline */}
              <div className="space-y-2 animate-fade-in-up animation-delay-200">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="text-[#483cff] text-[rgba(72,60,255,1)]">Risparmia fino al </span>
                  <span className="text-dark-green">90% sui voli</span>
                </h1>
              </div>

              {/* Subheadline */}
              <p className="text-xl lg:text-2xl font-medium text-dark-green animate-fade-in-up animation-delay-400">
                Organizza viaggi. Ricevi avvisi. Vola spendendo meno.
              </p>

              {/* Newsletter Signup */}
              <div className="animate-fade-in-up animation-delay-600">
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="La tua email"
                    required
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#483cff] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#483cff] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? "..." : "Iscriviti"}
                  </button>
                </form>
                {submitMessage && (
                  <p className={`text-sm mt-2 ${submitMessage.includes("Grazie") ? "text-green-600" : "text-red-600"}`}>
                    {submitMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Right Content - Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end animate-fade-in-right">
              <div className="relative">
                {/* Background Circle */}
                <div
                  className="absolute inset-0 w-96 h-96 rounded-full opacity-20 bg-gradient-to-br from-[#483cff] to-light-green transform -translate-x-10 -translate-y-10"
                  style={{ transform: `translate(-10%, -10%) rotate(${scrollY * 0.1}deg)` }}
                ></div>

                {/* Phone Mockup */}
                <div className="relative z-10 w-72 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl phone-float">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Phone Screen Content */}
                    <div className="absolute inset-0">
                      <img
                        src="https://images.pexels.com/photos/161251/senso-ji-temple-japan-kyoto-landmark-161251.jpeg"
                        alt="Senso-ji temple in Kyoto, Japan"
                        className="w-full h-full object-cover"
                      />

                      {/* Notification Overlay */}
                      <div className="absolute top-20 left-4 right-4 animate-slide-in-down animation-delay-800">
                        <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                              <span className="text-white text-sm font-bold">PF</span>
                            </div>
                            <span className="font-semibold text-sm">Punti Furbi</span>
                          </div>
                          <h3 className="font-bold text-lg mb-1">Nuova offerta!</h3>
                          <p className="text-sm text-gray-600 mb-2">Roma - Tokyo</p>
                          <p className="text-2xl font-bold text-[#483cff]">389€ A/R</p>
                          <p className="text-xs text-gray-500">Risparmi 65% sul prezzo normale</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Press Logos */}
          <div className="mt-16 pt-8 border-t border-gray-200 animate-fade-in-up animation-delay-1000">
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
              <img
                src="https://i.imgur.com/aS3Rjbp.png"
                alt="Today"
                className="h-12 w-auto hover:opacity-70 transition-opacity"
              />
              <img
                src="https://i.imgur.com/p7NjAkU.png"
                alt="The New York Times"
                className="h-12 w-auto hover:opacity-70 transition-opacity"
              />
              <img
                src="https://i.imgur.com/6YmMRjG.png"
                alt="Good Morning America"
                className="h-12 w-auto hover:opacity-70 transition-opacity"
              />
              <img
                src="https://i.imgur.com/Nm4pAwD.png"
                alt="The Washington Post"
                className="h-12 w-auto hover:opacity-70 transition-opacity"
              />
              <img
                src="https://i.imgur.com/2h2kJjb.png"
                alt="Live Kelly & Ryan"
                className="h-12 w-auto hover:opacity-70 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-light-green relative">
        <div className="absolute inset-0 opacity-30" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-dark-green">Stanco di cercare offerte sui voli?</h2>
            <p className="text-2xl lg:text-3xl font-bold text-[#483cff]">Punti Furbi rende il viaggio più semplice</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            {/* Feature 1 */}
            <div className="text-center space-y-6 animate-fade-in-up animation-delay-200">
              <div className="flex justify-center">
                <div className="w-48 h-80 bg-black rounded-3xl p-1 shadow-xl feature-card">
                  <div
                    className="w-full h-full bg-white rounded-[1.4rem] overflow-hidden relative"
                    style={{
                      backgroundImage:
                        "url('https://images.pexels.com/photos/161251/senso-ji-temple-japan-kyoto-landmark-161251.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-dark-green">Tieni traccia dei prezzi di tutti i tuoi viaggi</h3>
                <p className="text-gray-700">
                  Inserisci i dettagli del tuo viaggio: monitoriamo i prezzi e ti avvisiamo quando cambiano.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-6 animate-fade-in-up animation-delay-400">
              <div className="flex justify-center">
                <div className="w-48 h-80 bg-black rounded-3xl p-1 shadow-xl feature-card">
                  <div
                    className="w-full h-full bg-white rounded-[1.4rem] overflow-hidden relative"
                    style={{
                      backgroundImage: "url('https://images.pexels.com/photos/5081424/pexels-photo-5081424.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-dark-green">Offerte per le tue destinazioni da sogno</h3>
                <p className="text-gray-700">
                  Ricevi avvisi su cali di prezzo e tariffe errore. Troviamo le migliori offerte: tu devi solo
                  prenotare.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-6 animate-fade-in-up animation-delay-600">
              <div className="flex justify-center">
                <div className="w-48 h-80 bg-black rounded-3xl p-1 shadow-xl feature-card">
                  <div
                    className="w-full h-full bg-white rounded-[1.4rem] overflow-hidden relative"
                    style={{
                      backgroundImage: "url('https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-dark-green">Prenota il tuo volo dove vuoi</h3>
                <p className="text-gray-700">
                  Ti piace un'offerta? Prenota direttamente con la compagnia aerea, senza intermediari né sovrapprezzi.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center animate-fade-in-up animation-delay-800">
            <button
              onClick={handleNewsletterClick}
              className="px-8 py-4 text-lg rounded-full bg-[#483cff] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              Iscriviti
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 overflow-visible">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-dark-green">
              Unisciti a milioni di viaggiatori che risparmiano
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg font-medium text-dark-green">Valutato eccellente su TrustPilot</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                ))}
              </div>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto animate-fade-in-up animation-delay-200 overflow-visible">
            {/* Carousel Container with responsive height and spacing */}
            <div className="min-h-[450px] sm:min-h-[420px] lg:min-h-[400px] flex items-center justify-center overflow-visible py-4 sm:py-6 lg:py-8">
              <div
                className={`flex items-stretch justify-center overflow-visible ${
                  screenSize === "mobile" ? "w-full px-4" : screenSize === "tablet" ? "space-x-4" : "space-x-6"
                }`}
              >
                {getVisibleTestimonials().map((testimonial, index) => (
                  <div
                    key={`${testimonial.name}-${currentTestimonial}-${index}`}
                    className={`flex-shrink-0 bg-light-green rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 text-center space-y-4 testimonial-card flex flex-col ${
                      screenSize === "mobile" ? "w-full max-w-sm mx-auto" : screenSize === "tablet" ? "w-72" : "w-80"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={`${testimonial.name} travel photo`}
                        className={`w-full object-cover rounded-lg hover-zoom transition-transform duration-300 ${
                          screenSize === "mobile" ? "h-40" : "h-48"
                        }`}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between space-y-3">
                      <h4 className={`font-bold text-dark-green ${screenSize === "mobile" ? "text-lg" : "text-xl"}`}>
                        {testimonial.name}
                      </h4>
                      <p
                        className={`text-gray-700 italic leading-relaxed ${
                          screenSize === "mobile" ? "text-sm" : "text-base"
                        }`}
                      >
                        "{testimonial.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - responsive positioning */}
            <div className={`flex justify-center mt-6 ${screenSize === "mobile" ? "space-x-6" : "space-x-4"}`}>
              <button
                onClick={prevTestimonial}
                className={`rounded-full border-2 border-dark-green hover:bg-gray-50 transition-colors nav-arrow z-10 ${
                  screenSize === "mobile" ? "p-4" : "p-3"
                }`}
                aria-label="Previous testimonial"
                disabled={currentTestimonial === 0}
              >
                <ChevronLeft size={screenSize === "mobile" ? 24 : 20} className="text-dark-green" />
              </button>

              {/* Dots indicator for mobile */}
              {screenSize === "mobile" && (
                <div className="flex items-center space-x-2">
                  {Array.from({ length: testimonials.length }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentTestimonial ? "bg-dark-green" : "bg-gray-300"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={nextTestimonial}
                className={`rounded-full border-2 border-dark-green hover:bg-gray-50 transition-colors nav-arrow z-10 ${
                  screenSize === "mobile" ? "p-4" : "p-3"
                }`}
                aria-label="Next testimonial"
                disabled={currentTestimonial === maxIndex}
              >
                <ChevronRight size={screenSize === "mobile" ? 24 : 20} className="text-dark-green" />
              </button>
            </div>

            {/* Progress indicator for tablet and desktop */}
            {screenSize !== "mobile" && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: maxIndex + 1 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i === currentTestimonial ? "bg-dark-green" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="text-center mt-12 animate-fade-in-up animation-delay-400">
            <button
              onClick={handleNewsletterClick}
              className="px-8 py-4 text-lg rounded-full bg-[#483cff] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              Iscriviti
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-wrap justify-center lg:justify-start space-x-6">
              <a href="#" className="text-sm hover:opacity-70 transition-opacity text-dark-green">
                Privacy
              </a>
              <a href="#" className="text-sm hover:opacity-70 transition-opacity text-dark-green">
                Termini
              </a>
              <a href="#" className="text-sm hover:opacity-70 transition-opacity text-dark-green">
                Contatti
              </a>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <span className="text-xs font-bold">f</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <span className="text-xs font-bold">t</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <span className="text-xs font-bold">in</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Newsletter Popup */}
      <NewsletterPopup isOpen={showNewsletterPopup} onClose={() => setShowNewsletterPopup(false)} />
    </div>
  )
}
