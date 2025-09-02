import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import { APP_CONFIG } from "../config/app-config";
import { CustomButton } from "../components";
import {
  headContainerAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section
          className="home"
          style={{
            background:
              "linear-gradient(90deg, #667db6 0%, #0082c8 35%, rgba(0, 130, 200, 0.8) 70%, rgba(0, 130, 200, 0.3) 100%)",
          }}
          {...slideAnimation("left")}
        >
          {/* Logo */}
          <motion.img
            src="/main-logo.svg"
            alt="Fashionista Logo"
            className="w-12 h-12 object-contain"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          />

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text text-white">
                {APP_CONFIG.branding.tagline}
              </h1>
            </motion.div>
            <motion.div className="flex flex-col gap-5" {...headTextAnimation}>
              <p className="max-w-md font-normal text-gray-100 text-base">
                {APP_CONFIG.branding.description}
              </p>

              <CustomButton
                type="filled"
                title={APP_CONFIG.branding.customizeButtonText}
                handleClick={() => (state.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
