import {
  MessageCircle,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from 'lucide-react';
import type { SocialIcon } from '../types';

export function SocialLinks() {
  const socialIcons: SocialIcon[] = [
    { icon: MessageCircle, name: 'whatsapp' },
    { icon: Github, name: 'github' },
    { icon: Instagram, name: 'instagram' },
    { icon: Linkedin, name: 'linkedin' },
    { icon: Mail, name: 'email' }
  ];

  return (
    <div className="flex gap-3">
      {socialIcons.map((social, index) => {
        const Icon = social.icon;
        return (
          <a
            key={index}
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
} 