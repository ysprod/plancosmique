import { motion } from 'framer-motion';

export function HeaderSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center"><br />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
            Ma Vie Personnelle
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explorez votre essence profonde, vos talents cachés et votre destinée.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
