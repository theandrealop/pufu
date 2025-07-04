"use client"

import { useState } from "react"
import { Menu, X, Crown, Check, Star, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ElitePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              <Link href="/news" className="text-sm font-medium text-dark-green hover:opacity-70 transition-opacity">
                News
              </Link>
              <Link href="/premium" className="text-sm font-medium text-dark-green hover:opacity-70 transition-opacity">
                Premium
              </Link>
              <Link
                href="/elite"
                className="text-sm font-medium text-[#483cff] border-b-2 border-[#483cff] pb-1 font-pp-mori"
              >
                Elite
              </Link>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button className="px-6 py-2 rounded-full bg-[#483cff] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg">
                Scarica l'app
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
                <Link href="/news" className="text-sm font-medium text-dark-green">
                  News
                </Link>
                <Link href="/premium" className="text-sm font-medium text-dark-green">
                  Premium
                </Link>
                <Link href="/elite" className="text-sm font-medium text-[#483cff] font-pp-mori">
                  Elite
                </Link>
                <div className="flex flex-col space-y-2 pt-4">
                  <button className="px-6 py-2 rounded-full bg-[#483cff] text-white">Scarica l'app</button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#483cff]/5 to-light-green/10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Zap className="text-[#483cff] mr-3" size={48} />
            <h1 className="text-4xl lg:text-6xl font-bold text-dark-green font-pp-mori">
              Punti Furbi <span className="text-[#483cff]">Elite</span>
            </h1>
          </div>
          <p className="text-xl lg:text-2xl text-gray-700 mb-8">
            L'esperienza di viaggio più esclusiva con accesso VIP e servizi personalizzati
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-light-green">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-dark-green">Funzionalità Elite</h2>
            <p className="text-xl text-gray-700">Il massimo del lusso per i viaggiatori più esigenti</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#483cff] rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark-green">Concierge personale</h3>
              <p className="text-gray-700">Un assistente dedicato per organizzare ogni dettaglio del tuo viaggio</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-light-green rounded-lg flex items-center justify-center mb-4">
                <Crown className="text-dark-green" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark-green">Accesso VIP</h3>
              <p className="text-gray-700">Offerte esclusive riservate solo ai membri Elite con sconti fino al 95%</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#483cff] rounded-lg flex items-center justify-center mb-4">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark-green">Servizi premium</h3>
              <p className="text-gray-700">Upgrade gratuiti, lounge access e servizi di lusso inclusi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-dark-green">
            Diventa <span className="text-[#483cff]">Elite</span>
          </h2>
          <p className="text-xl text-gray-700 mb-12">L'esperienza di viaggio più esclusiva ti aspetta</p>

          <div className="bg-gradient-to-br from-[#483cff] to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
            <div className="flex items-center justify-center mb-6">
              <Zap className="text-white mr-2" size={32} />
              <h3 className="text-2xl font-bold">Elite</h3>
            </div>
            <div className="text-center mb-8">
              <div className="text-5xl font-bold mb-2">€49.99</div>
              <div className="text-purple-200">al mese</div>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="text-green-400 mr-3" size={20} />
                <span>Concierge personale 24/7</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-400 mr-3" size={20} />
                <span>Offerte VIP esclusive</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-400 mr-3" size={20} />
                <span>Upgrade automatici</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-400 mr-3" size={20} />
                <span>Accesso lounge aeroportuali</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-400 mr-3" size={20} />
                <span>Assicurazione viaggio premium</span>
              </li>
            </ul>
            <button className="w-full px-8 py-4 text-lg rounded-full bg-white text-[#483cff] font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Diventa Elite
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
    </div>
  )
}
