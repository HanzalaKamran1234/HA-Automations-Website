import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch("https://formsubmit.co/ajax/growtoglow44@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                    _subject: "New Lead from AA Agency Website!"
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000); // Reset status after 5 seconds
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Automate</span> Your Growth?</h2>
                    <p className="text-gray-400">
                        Book a free audit call or drop us a message. We usually respond within 2 hours.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm">

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
                            <p className="text-gray-400">Let's discuss how we can save you 20+ hours a week.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Email Us</p>
                                    <p className="font-medium">growtoglow44@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Socials</p>
                                    <p className="font-medium">@hanzala.automations</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm text-gray-400 mb-1">Message</label>
                            <textarea
                                id="message"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                rows={4}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                                placeholder="Tell us about your project..."
                                required
                            />
                        </div>

                        {status === 'success' && (
                            <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm">
                                Thanks for reaching out! We will get back to you shortly.
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                                Something went wrong. Please try again later.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 group ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                            <Send className={`w-4 h-4 ${status === 'loading' ? '' : 'group-hover:translate-x-1'} transition-transform`} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
