"use client";
import { motion } from "framer-motion";

export const MotionDiv = motion.div;

export const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: index * 0.1, // Retraso en cascada según el índice
            duration: 0.5,
            ease: "easeOut"
        }
    })
};