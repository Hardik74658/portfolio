import React from 'react';
import {
  FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaDribbble, FaBehance,
  FaGlobe, FaMedium, FaWhatsapp, FaFacebook, FaTelegram, FaEnvelope, FaTwitter,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const MAP = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  x: FaXTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
  dribbble: FaDribbble,
  behance: FaBehance,
  medium: FaMedium,
  whatsapp: FaWhatsapp,
  facebook: FaFacebook,
  telegram: FaTelegram,
  email: FaEnvelope,
  mail: FaEnvelope,
};

/** Picks a brand icon from a social link's name; unknown names get a globe. */
export default function SocialIcon({ name = '', className = 'w-5 h-5' }) {
  const Icon = MAP[name.trim().toLowerCase()] || FaGlobe;
  return <Icon className={className} aria-hidden="true" />;
}

export const SOCIAL_NAMES = ['GitHub', 'LinkedIn', 'Twitter', 'X', 'Instagram', 'YouTube', 'Dribbble', 'Behance', 'Medium', 'WhatsApp', 'Facebook', 'Telegram', 'Website'];
