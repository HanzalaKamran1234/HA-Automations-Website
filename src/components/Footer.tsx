
import { Github, Instagram, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            HA Automations
                        </h3>
                        <p className="text-gray-500 text-sm mt-2">
                            Automating the future, one agent at a time.
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="#contact" className="text-gray-500 hover:text-white transition-colors">
                            <Mail className="w-5 h-5" />
                        </a>
                        <a href="https://github.com/HanzalaKamran1234" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://www.instagram.com/hanzala.automations/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
                    © {new Date().getFullYear()} HA Automations. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
