import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Image Background with Ken Burns Effect */}
      <div className="absolute inset-0 z-0" style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}>
        <motion.div
           animate={{ scale: [1, 1.05, 1] }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
           className="w-full h-full bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat"
        />
        {/* Gradient overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface)]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 tracking-tight">
              Shashank Goud
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-on-surface-variant)] mb-2 font-medium">
              Data Engineer | Data Scientist | Web Developer
            </p>
            <p className="text-md md:text-lg text-[var(--color-on-surface-variant)] opacity-80 max-w-xl">
              Building data pipelines in Azure using Databricks, Synapse & Spark — transforming real-time telemetry 
              into structured datasets, automated workflows, and monitoring tools.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex gap-4 pt-4 justify-center md:justify-start"
          >
            <a href="mailto:shashank.goud@example.com" className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-bold hover:shadow-[0_0_20px_rgba(0,241,254,0.5)] transition-all duration-300 transform hover:-translate-y-1 inline-block">
              Hire Me
            </a>
            <a href="#projects" className="px-8 py-3 rounded-full glass text-white font-medium hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-cyan-500/30 inline-block">
              View Work
            </a>
          </motion.div>
        </div>
        
        <div className="flex-1 hidden md:block">
           {/* Space reserved for deeper spatial interactive elements if needed */}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-500"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
}
