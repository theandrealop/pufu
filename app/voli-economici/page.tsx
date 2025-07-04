"use client"

import { useState } from "react"
import { Menu, X, ChevronDown, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Manual offers data - no database needed
const manualOffers = [
  {
    id: 1,
    origin: "Roma",
    destination: "Parigi",
    country: "Francia",
    price: 89.99,
    original_price: 199.99,
    discount: 55,
    dates: "15-30 Mar 2024",
    airline: "Ryanair",
    stops: "Diretto",
    duration: "2h 15m",
    description: "Volo diretto per la città dell'amore. Include bagaglio a mano.",
    image_url: "photo-1502602898536-47ad22581b52",
    status: "active",
  },
  {
    id: 2,
    origin: "Milano",
    destination: "Barcellona",
    country: "Spagna",
    price: 79.99,
    original_price: 159.99,
    discount: 50,
    dates: "20-25 Mar 2024",
    airline: "Vueling",
    stops: "Diretto",
    duration: "1h 45m",
    description: "Scopri la vibrante capitale catalana con questo volo super conveniente.",
    image_url: "photo-1539037116277-4db20889f2d4",
    status: "active",
  },
  {
    id: 3,
    origin: "Roma",
    destination: "Londra",
    country: "Regno Unito",
    price: 119.99,
    original_price: 249.99,
    discount: 52,
    dates: "10-20 Apr 2024",
    airline: "EasyJet",
    stops: "Diretto",
    duration: "2h 40m",
    description: "Vola nella capitale britannica. Perfetto per un weekend lungo.",
    image_url: "photo-1513635269975-59663e0ac1ad",
    status: "active",
  },
  {
    id: 4,
    origin: "Milano",
    destination: "Amsterdam",
    country: "Paesi Bassi",
    price: 99.99,
    original_price: 189.99,
    discount: 47,
    dates: "5-15 Mag 2024",
    airline: "KLM",
    stops: "Diretto",
    duration: "2h 20m",
    description: "Esplora i canali e i musei di Amsterdam con questa offerta imperdibile.",
    image_url: "photo-1534351590666-13e3e96b5017",
    status: "active",
  },
  {
    id: 5,
    origin: "Roma",
    destination: "Vienna",
    country: "Austria",
    price: 69.99,
    original_price: 149.99,
    discount: 53,
    dates: "25 Mar - 5 Apr 2024",
    airline: "Austrian Airlines",
    stops: "Diretto",
    duration: "1h 30m",
    description: "Immergiti nella cultura imperiale di Vienna.",
    image_url: "photo-1516550893923-42d28e5677af",
    status: "active",
  },
  {
    id: 6,
    origin: "Milano",
    destination: "Berlino",
    country: "Germania",
    price: 89.99,
    original_price: 179.99,
    discount: 50,
    dates: "1-15 Apr 2024",
    airline: "Lufthansa",
    stops: "Diretto",
    duration: "1h 50m",
    description: "Scopri la storia e la modernità di Berlino. Include snack a bordo.",
    image_url: "photo-1587330979470-3016b6702d89",
    status: "active",
  },
  {
    id: 7,
    origin: "Roma",
    destination: "New York",
    country: "Stati Uniti",
    price: 399.99,
    original_price: 799.99,
    discount: 50,
    dates: "1-30 Mag 2024",
    airline: "Delta Airlines",
    stops: "1 scalo",
    duration: "10h 30m",
    description: "La Grande Mela ti aspetta! Volo con scalo ad Amsterdam.",
    image_url: "photo-1496442226666-8d4d0e62e6e9",
    status: "active",
  },
  {
    id: 8,
    origin: "Milano",
    destination: "Tokyo",
    country: "Giappone",
    price: 549.99,
    original_price: 999.99,
    discount: 45,
    dates: "10 Mag - 10 Giu 2024",
    airline: "ANA",
    stops: "1 scalo",
    duration: "13h 45m",
    description: "Scopri il Giappone partendo da Milano. Scalo a Francoforte.",
    image_url: "photo-1540959733332-eab4deabeeaf",
    status: "active",
  },
  // Some terminated offers for testing
  {
    id: 9,
    origin: "Roma",
    destination: "Madrid",
    country: "Spagna",
    price: 69.99,
    original_price: 139.99,
    discount: 50,
    dates: "1-15 Mar 2024",
    airline: "Iberia",
    stops: "Diretto",
    duration: "2h 30m",
    description: "Offerta scaduta per Madrid.",
    image_url: "photo-1539037116277-4db20889f2d4",
    status: "terminated",
  },
  {
    id: 10,
    origin: "Milano",
    destination: "Copenhagen",
    country: "Danimarca",
    price: 99.99,
    original_price: 199.99,
    discount: 50,
    dates: "5-20 Mar 2024",
    airline: "SAS",
    stops: "Diretto",
    duration: "2h 15m",
    description: "Offerta scaduta per Copenhagen.",
    image_url: "photo-1578662996442-48f60103fc96",
    status: "terminated",
  },
]

export default function VoliEconomiciPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
  const [selectedAirport, setSelectedAirport] = useState("Roma")

  // Filter offers based on selected airport
  const filteredOffers = manualOffers.filter((offer) => offer.origin === selectedAirport)

  // Sort offers: active first, then terminated
  const sortedOffers = [...manualOffers].sort((a, b) => {
    if (a.status === "active" && b.status === "terminated") return -1
    if (a.status === "terminated" && b.status === "active") return 1
    return 0
  })

  const nextOffer = () => {
    setCurrentOfferIndex((prev) => (prev + 1) % sortedOffers.length)
  }

  const prevOffer = () => {
    setCurrentOfferIndex((prev) => (prev - 1 + sortedOffers.length) % sortedOffers.length)
  }

  const airports = ["Roma", "Milano"]

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
                className="text-sm font-medium text-[#483cff] border-b-2 border-[#483cff] pb-1"
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
                <Link href="/voli-economici" className="text-sm font-medium text-[#483cff]">
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
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-dark-green">
            <span className="text-[#483cff]">Voli economici</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 mb-8">
            Scopri le migliori offerte di volo selezionate dai nostri esperti
          </p>
        </div>
      </section>

      {/* Airport Selection Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-light-green rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-dark-green mb-6 text-center">
              Seleziona il tuo aeroporto di partenza
            </h2>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <select
                  value={selectedAirport}
                  onChange={(e) => setSelectedAirport(e.target.value)}
                  className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-[#483cff] focus:outline-none appearance-none bg-white cursor-pointer"
                >
                  {airports.map((airport) => (
                    <option key={airport} value={airport}>
                      {airport} ({airport === "Roma" ? "FCO" : "MXP"})
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={24}
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-[#483cff]">{filteredOffers.length}</span> offerte disponibili da{" "}
                {selectedAirport}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Offers Grid */}
      <section className="py-16 lg:py-24 bg-light-green">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-dark-green">Offerte attive</h2>
            <p className="text-xl text-gray-700">Tutte le migliori offerte disponibili ora</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map((offer) => {
              const expired = offer.status === "terminated"
              return (
                <div
                  key={offer.id}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative ${
                    expired ? "opacity-75" : "hover:-translate-y-1"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={
                        offer.image_url
                          ? `https://images.unsplash.com/${offer.image_url}?w=400&h=250&fit=crop`
                          : "/placeholder.svg?height=250&width=400"
                      }
                      alt={`${offer.destination} destination`}
                      className={`w-full h-48 object-cover transition-all duration-300 ${
                        expired ? "filter grayscale" : ""
                      }`}
                    />
                    {expired && (
                      <div className="absolute inset-0 bg-black/20">
                        <div className="absolute top-0 left-0 w-full h-full">
                          <div className="absolute top-4 -left-8 bg-red-600 text-white px-12 py-1 transform rotate-[-45deg] shadow-lg">
                            <span className="font-bold text-xs tracking-wider">TERMINATA</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-xs font-bold text-red-600">-{offer.discount}%</span>
                    </div>
                  </div>

                  <div className={`p-6 transition-all duration-300 ${expired ? "opacity-60" : ""}`}>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-dark-green mb-1">
                          {offer.origin} → {offer.destination}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {offer.description || `${offer.airline} - ${offer.stops}`}
                        </p>
                      </div>

                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-[#483cff]">€{offer.price}</span>
                        <span className="text-sm text-gray-500 line-through">€{offer.original_price}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{offer.dates}</span>
                        </span>
                        <span>{offer.airline}</span>
                      </div>

                      {expired ? (
                        <button
                          disabled
                          className="w-full px-4 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                        >
                          Terminata
                        </button>
                      ) : (
                        <button className="w-full px-4 py-2 bg-[#483cff] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                          Vedi dettagli
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Nessuna offerta disponibile per {selectedAirport} al momento.</p>
              <p className="text-gray-500 mt-2">Prova a selezionare un altro aeroporto di partenza.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Offer Carousel */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-dark-green">Offerte in evidenza</h2>
            <p className="text-xl text-gray-700">Le migliori occasioni selezionate per te</p>
          </div>

          {sortedOffers.length > 0 ? (
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentOfferIndex * 100}%)` }}
                >
                  {sortedOffers.map((offer) => {
                    const expired = offer.status === "terminated"
                    return (
                      <div key={offer.id} className="w-full flex-shrink-0 relative">
                        <div className="grid lg:grid-cols-2 min-h-[500px]">
                          {/* Image Side */}
                          <div className="relative overflow-hidden">
                            <img
                              src={
                                offer.image_url
                                  ? `https://images.unsplash.com/${offer.image_url}?w=800&h=600&fit=crop`
                                  : "/placeholder.svg?height=600&width=800"
                              }
                              alt={`${offer.destination} destination`}
                              className={`w-full h-full object-cover transition-all duration-300 ${
                                expired ? "filter grayscale" : ""
                              }`}
                            />
                            {expired && (
                              <div className="absolute inset-0 bg-black/20">
                                <div className="absolute top-0 left-0 w-full h-full">
                                  <div className="absolute top-8 -left-12 bg-red-600 text-white px-16 py-2 transform rotate-[-45deg] shadow-lg">
                                    <span className="font-bold text-sm tracking-wider">TERMINATA</span>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                              <span className="text-sm font-bold text-red-600">-{offer.discount}%</span>
                            </div>
                          </div>

                          {/* Content Side */}
                          <div
                            className={`p-8 lg:p-12 flex flex-col justify-center bg-white transition-all duration-300 ${
                              expired ? "opacity-60" : ""
                            }`}
                          >
                            <div className="space-y-6">
                              <div>
                                <h3 className="text-3xl lg:text-4xl font-bold text-dark-green mb-2">
                                  {offer.origin} → {offer.destination}
                                </h3>
                                <p className="text-gray-600 text-lg">
                                  {offer.description || `${offer.airline} - ${offer.stops}`}
                                </p>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-baseline space-x-2">
                                  <span className="text-4xl lg:text-5xl font-bold text-[#483cff]">€{offer.price}</span>
                                  <span className="text-xl text-gray-500 line-through">€{offer.original_price}</span>
                                </div>
                                <p className="text-gray-600">A/R per persona</p>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <span className="flex items-center space-x-1">
                                    <Calendar size={16} />
                                    <span>{offer.dates}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <span>✈️</span>
                                    <span>{offer.airline}</span>
                                  </span>
                                </div>
                              </div>

                              <div className="pt-4">
                                {expired ? (
                                  <div className="space-y-2">
                                    <button
                                      disabled
                                      className="w-full px-8 py-4 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                                    >
                                      Offerta terminata
                                    </button>
                                    <p className="text-sm text-gray-500 text-center">
                                      Questa offerta non è più disponibile
                                    </p>
                                  </div>
                                ) : (
                                  <button className="w-full px-8 py-4 bg-[#483cff] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg">
                                    Vedi dettagli
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Navigation */}
              <button
                onClick={prevOffer}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft size={24} className="text-dark-green" />
              </button>
              <button
                onClick={nextOffer}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight size={24} className="text-dark-green" />
              </button>

              {/* Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {sortedOffers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentOfferIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentOfferIndex ? "bg-[#483cff]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Nessuna offerta disponibile al momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-dark-green">
            Non perdere le <span className="text-[#483cff]">prossime offerte</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Iscriviti gratuitamente e ricevi avvisi in tempo reale sulle migliori offerte di volo
          </p>
          <button className="px-8 py-4 text-lg rounded-full bg-[#483cff] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg">
            Iscriviti gratis
          </button>
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
