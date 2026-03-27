import { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Background3D from './components/Background3D';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 1"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.4, 1], [30, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.85, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4, 1], [100, 0, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        scale,
        opacity,
        y,
        transformOrigin: "bottom center",
        transformStyle: "preserve-3d",
      }}
      className="relative z-10 w-full"
    >
      {children}
    </motion.div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="bg-[var(--color-surface)] min-h-screen font-body text-[var(--color-on-surface)] selection:bg-cyan-500/30 overflow-x-hidden" style={{ perspective: 1200 }}>
      
      {/* 3D Global Environment */}
      <Background3D />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 transform origin-left z-50"
        style={{ scaleX }}
      />
      
      <main>
        <Hero />
        <ScrollWrapper>
          <About />
        </ScrollWrapper>
        <ScrollWrapper>
          <Projects />
        </ScrollWrapper>
      </main>

      <ScrollWrapper>
        <footer className="py-24 bg-black border-t border-white/5 text-center px-6 relative z-10">
          <h2 className="text-3xl font-bold font-display tracking-tight text-white mb-6">
            Ready to build something extraordinary?
          </h2>
          <p className="text-[var(--color-on-surface-variant)] mb-10 max-w-lg mx-auto text-lg">
            I'm actively seeking opportunities to bring my unique blend of data engineering depth and frontend polish to a forward-thinking team.
          </p>
          <a href="mailto:shashaankgoud@gmail.com" className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(0,241,254,0.6)] transition-all duration-300 transform hover:-translate-y-2">
            Get In Touch
          </a>
          <div className="mt-16 text-sm text-[var(--color-on-surface-variant)] opacity-50">
            © {new Date().getFullYear()} Shashank Goud. All Rights Reserved.
          </div>
        </footer>
      </ScrollWrapper>
    </div>
  );
}

export default App;
