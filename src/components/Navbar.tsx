import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '/#about' },
        { name: 'Services', href: '/#services' },
        { name: 'Projects', href: '/#projects' },
        { name: 'Blog', href: '/blog' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    HA Automations
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        link.href.startsWith('/#') ? (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${location.pathname === link.href
                                    ? 'text-cyan-400'
                                    : 'text-gray-300 hover:text-white hover:glow-text'
                                    }`}
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`text-sm font-medium transition-colors ${location.pathname === link.href
                                    ? 'text-cyan-400'
                                    : 'text-gray-300 hover:text-white hover:glow-text'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                    <a
                        href="#contact"
                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Contact Us
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-b border-gray-800 p-6">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            link.href.startsWith('/#') ? (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-300 text-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-gray-300 text-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                        <a
                            href="#contact"
                            className="text-cyan-400 text-lg font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
