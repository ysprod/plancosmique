"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};


export default function ServicesSection({ services }: { services: any[] }) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-24 lg:mb-32"
        >
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                className="text-center mb-4"
            >
                <h2 className="text-xl lg:text-xl">
                    <span className="text-center">Choisis un domaine pour la consultation</span>
                </h2>
            </motion.div>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {services.map((service, index) => (
                    <motion.div
                        key={service.id + index}
                        variants={fadeInUp}
                        whileHover={{ y: -12, scale: 1.03 }}
                        className="group h-full"
                    >
                        <Link href={service.link}>
                            <div
                                className={`${service.bgColor} rounded-3xl p-8 border-2 ${service.borderColor} shadow-xl ${service.hoverShadow} hover:shadow-2xl transition-all duration-500 h-full flex flex-col cursor-pointer relative overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <div className="relative z-10">
                                   
                                    <h3 className={`text-2xl font-black ${service.color} mb-4 group-hover:scale-105 transition-transform origin-left`}>
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-700 leading-relaxed font-medium mb-6 flex-grow">
                                        {service.description}
                                    </p>
                                    <div className={`flex items-center gap-2 ${service.color} font-bold group-hover:gap-4 transition-all`}>
                                        <span>Explorer maintenant</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}
