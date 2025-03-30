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
  }, [currentTrackIndex, isPlaying]);

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
        <p className="text-4xl text-[#522417] font-stretch-50% font-extrabold" style={{ fontFamily: 'var(--font-sub)' }}>Hey, I'm Vedant!</p>
        <p className="text-2xl text-[#522417] mt-3 max-w-lg font-stretch-50% font-extrabold" style={{ fontFamily: 'var(--font-sub)' }}>
          A passionate developer with a keen eye for design and a love for crafting seamless digital experiences.
          Specializing in front-end and full-stack development, I enjoy turning ideas into interactive, high-performing applications.
        </p>
      </motion.div>

      {/* Music Player & Tech Stack */}
      <div className="grid grid-cols-2 gap-6 col-span-2 row-span-1">
        {/* Music Player */}
        <motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="bg-[#b1b5a4] rounded-xl p-4 overflow-hidden flex bg-[url('/grain-texture.png')] bg-cover"
>
  {/* Album Art (70%) */}
  <div className="w-7/10 flex flex-col items-center justify-center">
    <div className="relative w-48 h-48 md:w-56 md:h-56">
      <Image
        src={tracks[currentTrackIndex].image}
        alt="Album Art"
        width={224}
        height={224}
        className="rounded-lg w-full h-full object-cover"
      />
    </div>

    {/* Song Title Below */}
    <p className="text-[#153439] text-lg font-semibold mt-3"  style={{ fontFamily: 'var(--font-sub)' }}>{tracks[currentTrackIndex].title}</p>
  </div>

  {/* Playback Controls (30%) */}
  <div className="w-3/10 bg-[#153439] rounded-lg flex flex-col items-center justify-center py-6">
    <div className="flex flex-col items-center space-y-4">
      <button onClick={prevTrack} className="p-2 rounded-full hover:bg-[#0f272b]">
        <SkipBack size={24} className="text-white" />
      </button>

      <button onClick={togglePlay} className="p-3 rounded-full bg-white hover:bg-gray-200">
        {isPlaying ? 
          <Pause size={24} className="text-[#153439]" /> : 
          <Play size={24} className="text-[#153439] ml-1" />
        }
      </button>

      <button onClick={nextTrack} className="p-2 rounded-full hover:bg-[#0f272b]">
        <SkipForward size={24} className="text-white" />
      </button>
    </div>
  </div>

  {/* Hidden audio element */}
  <audio ref={audioRef} onEnded={nextTrack} />
</motion.div>


        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#b1b5a4] rounded-xl grid grid-cols-3 grid-rows-2 gap-2 p-4 bg-[url('/grain-texture.png')] bg-cover"
        >
          {['html', 'tw', 'js', 'react', 'njs', 'next'].map((tech) => (
            <div key={tech} className="bg-[#153439] rounded-lg flex items-center justify-center p-2">
              <Image
                src={`/${tech}.svg`}
                alt={tech.toUpperCase()}
                width={40}
                height={40}
                className="invert"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;