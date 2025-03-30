'use client';
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

const About = ({ setBackgroundColor }: { setBackgroundColor: (color: string) => void }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = [
    { title: "Sunsetz", src: "/Sunsetz.mp3", image: "/sunsetz.jpg" },
    { title: "I Love You So", src: "/ilys.mp3", image: "/2v.jpg" },
    { title: "Shower", src: "/shower.mp3", image: "/1968.png" },
  ];

  useEffect(() => {
    if (inView) {
      setBackgroundColor("#153439");
    } else {
      setBackgroundColor("#f3f4f6");
    }
  }, [inView, setBackgroundColor]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrackIndex].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex, isPlaying, tracks]); // Added 'tracks' to dependency array

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <section
      ref={ref}
      className="relative grid grid-cols-3 grid-rows-2 gap-6 h-screen px-12 py-6 transition-all duration-500"
    >
      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#b1b5a4] col-span-1 row-span-2 rounded-xl flex items-center justify-center bg-[url('/grain-texture.png')] bg-cover"
      >
        <Image
          src="/profile.jpg"
          alt="Profile Photo"
          width={350}
          height={450}
          className="rounded-lg grayscale"
        />
      </motion.div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[#b1b5a4] col-span-2 row-span-1 rounded-xl shadow-md flex flex-col items-center justify-center text-center p-6 bg-[url('/grain-texture.png')] bg-cover"
      >
        <p className="text-4xl text-[#522417] font-stretch-50% font-extrabold" style={{ fontFamily: 'var(--font-sub)' }}>Hey, I&apos;m Vedant!</p>
        <p className="text-2xl text-[#522417] mt-3 max-w-lg font-stretch-50% font-extrabold" style={{ fontFamily: 'var(--font-sub)' }}>
          A passionate developer with a keen eye for design and a love for crafting seamless digital experiences.
          Specializing in front-end and full-stack development, I enjoy turning ideas into interactive, high-performing applications.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
