import { motion } from "motion/react";

type Props = {
  handleClick: () => void;
  isActive: boolean;
};

export default function SwitchableMenuIcon({ handleClick, isActive }: Props) {
  return (
    <svg
      className="size-8 cursor-pointer"
      onClick={handleClick}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <motion.line
        x1="4"
        x2="20"
        y1="6"
        y2="6"
        animate={{
          y1: isActive ? 12 : 6,
          y2: isActive ? 12 : 6,
          rotate: isActive ? 45 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      <motion.line
        x1="4"
        x2="20"
        y1="12"
        y2="12"
        animate={{
          opacity: isActive ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      <motion.line
        x1="4"
        x2="20"
        y1="18"
        y2="18"
        animate={{
          y1: isActive ? 12 : 18,
          y2: isActive ? 12 : 18,
          rotate: isActive ? -45 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </svg>
  );
}
