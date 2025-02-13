import React, { lazy, Suspense, useEffect } from 'react'
const Footer = lazy(()=>import("./Shared/Footer"));
const CDherosection=lazy(()=>import("./Director/CDherosection"));
const AnimatedTestimonialsDemo=lazy(()=>import ('./Director/AnimatedTestimonialsDemo'));

const CDhome = () => {
  return (
    <div className="bg-[var(--main-bg)]">
      <Suspense>
      <CDherosection />
      <AnimatedTestimonialsDemo />
      <Footer />
      </Suspense>

    </div>
  )
}

export default CDhome