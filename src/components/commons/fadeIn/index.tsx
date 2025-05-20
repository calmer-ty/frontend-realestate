import { motion } from "framer-motion";

export default function FadeIn({ children, delay = 0, duration = 0.4 }: { children: React.ReactNode; delay?: number; duration?: number }): JSX.Element {
  return (
    <>
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration, delay }}>
        {children}
      </motion.section>
    </>
  );
}
