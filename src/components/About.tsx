import { motion } from 'framer-motion';
import { Database, Code2, Cpu, BrainCircuit } from 'lucide-react';

const skills = [
  {
    category: "Data Processing",
    icon: <Database className="w-6 h-6 text-cyan-400" />,
    items: ["PostgreSQL & InfluxDB", "Databricks & Apache Spark", "Hive & Data Warehousing", "Real-time Telemetry Processing"]
  },
  {
    category: "Programming & Frameworks",
    icon: <Code2 className="w-6 h-6 text-purple-400" />,
    items: ["Python, SQL, Scala & R", "Kafka & Apache Flink", "Airflow & ETL Automation", "React & Tailwind CSS"]
  },
  {
    category: "Data Engineering & Infrastructure",
    icon: <BrainCircuit className="w-6 h-6 text-pink-400" />,
    items: ["Azure Synapse Analytics", "Databricks & Logic Apps", "Delta-style Lakehouse Workflows", "Automated Data Pipelines"]
  },
  {
    category: "Visualization & Reporting",
    icon: <Cpu className="w-6 h-6 text-emerald-400" />,
    items: ["Power BI Dashboards", "Grafana Monitoring", "Miro & Workflow Diagrams", "Energy & Asset Reporting"]
  }
];

export default function About() {
  return (
    <section className="py-24 relative bg-[var(--color-surface-container)] rounded-t-[3rem] border-t border-white/5 overflow-hidden">
      
      {/* Decorative BG element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                The Neural <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Architect</span>
              </h2>
              <p className="text-lg text-[var(--color-on-surface-variant)] leading-relaxed mb-6">
                Technical Data Scientist with data engineering experience building pipelines in Azure using Databricks, Synapse, Logic Apps, Python, SQL and Spark. Experienced in transforming real-time telemetry and operational data into structured datasets.
              </p>
              <p className="text-lg text-[var(--color-on-surface-variant)] leading-relaxed">
                I develop automated data workflows, build monitoring tools, and support reporting teams—while also crafting immersive frontend experiences with React and 3D web technologies.
              </p>
              
              <div className="mt-10">
                <a 
                  href="/resume.html" 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full hover:bg-[var(--color-surface-high)] border border-[var(--color-outline-variant)] text-cyan-300 font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Download Complete Resume
                </a>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-2xl flex flex-col h-full border hover:border-purple-500/30 transition-colors duration-500"
              >
                <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/10 shadow-lg">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{skill.category}</h3>
                <ul className="space-y-3 mt-auto">
                  {skill.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[var(--color-on-surface-variant)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
