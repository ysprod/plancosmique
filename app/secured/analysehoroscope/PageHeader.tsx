import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { memo } from "react";
import { itemVariants } from "./constants";

const PageHeader = memo(() => (
    <motion.div
        variants={itemVariants}
        className="text-center mb-6 sm:mb-8"
    >
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 
                    bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl 
                    shadow-purple-500/30 mb-3">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">
            HOROSCOPE
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Découvrez votre horoscope personnalisé inspiré des sagesses astrologiques africaines
        </p>
        <div className="mt-3 h-1 w-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
    </motion.div>
), () => true);

PageHeader.displayName = 'PageHeader';
export default PageHeader;