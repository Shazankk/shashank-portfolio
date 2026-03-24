import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  index: number;
}

const ProjectCard = ({ title, description, tags, link, index }: ProjectProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        perspective: 1000,
      }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="glass p-8 rounded-2xl h-full flex flex-col relative group cursor-pointer border border-white/5 hover:border-cyan-500/30 transition-colors duration-500"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "translateZ(-10px)" }}
        />
        
        <h3 
          className="text-2xl font-bold text-white mb-3"
          style={{ transform: "translateZ(40px)" }}
        >
          {title}
        </h3>
        
        <p 
          className="text-[var(--color-on-surface-variant)] mb-6 flex-grow leading-relaxed"
          style={{ transform: "translateZ(30px)" }}
        >
          {description}
        </p>
        
        <div 
          className="flex flex-wrap gap-2 mt-auto"
          style={{ transform: "translateZ(50px)" }}
        >
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-cyan-200 border border-white/10">
              {tag}
            </span>
          ))}
        </div>

        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" 
             className="absolute inset-0 z-10"
             aria-label={`View ${title}`}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const projects = [
    {
      title: "Colchester Cavaliers",
      description: "Official site for Colchester Cavaliers Cricket Club. Features live fixtures, results, player stats, and membership details for the Essex community.",
      tags: ["React", "TailwindCSS", "Supabase", "Sports Tech"],
      link: "https://www.colchestercavaliers.cc"
    },
    {
      title: "AA Motor Medic",
      description: "Professional car care platform for an Ipswich Car Garage offering MOT testing, diagnostics, and online bookings.",
      tags: ["Web App", "Frontend", "Booking System"],
      link: "https://www.aamotormedic.com"
    },
    {
      title: "Gab & Shashank",
      description: "Bespoke international wedding website for a 2027 celebration in Kraków, Poland, with custom RSVP and scheduling.",
      tags: ["React", "Custom UI", "Internationalization"],
      link: "https://www.gabandshashank.com"
    },
    {
      title: "Enterprise Knowledge Tree",
      description: "Internal team Bubblemap tool visualizing complex data relations, SQL joins, and business metrics across upstream and downstream services.",
      tags: ["Data Visualization", "D3.js", "SQL", "Data Engineering"]
    },
    {
      title: "Azure Synapse Logic Apps",
      description: "Automated logic apps for comprehensive pipeline monitoring and telemetry data extraction in Azure Synapse Analytics workspaces.",
      tags: ["Azure", "Synapse", "Data Engineering", "Logic Apps"]
    }
  ];

  return (
    <section id="projects" className="py-24 relative z-10 bg-[var(--color-surface)]">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Initiatives</span>
          </h2>
          <p className="text-lg text-[var(--color-on-surface-variant)]">
            Bridging data engineering and frontend development to create scalable, intelligent, and beautifully designed digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={project.title} className={index === 0 || index === 3 ? "lg:col-span-2" : "col-span-1"}>
              <ProjectCard {...project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
