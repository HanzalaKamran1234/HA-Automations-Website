import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'HA Automations <info@hanzala.online>',
            to: ['info@hanzala.online'],
            replyTo: email,
            subject: `New Lead from HA Agency Website — ${name}`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid #1a1a2e;">
                    <div style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); padding: 32px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">🚀 New Lead Received</h1>
                        <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Someone wants to work with you!</p>
                    </div>
                    <div style="padding: 32px;">
                        <div style="background: #111827; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #1f2937;">
                            <p style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Name</p>
                            <p style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0;">${name}</p>
                        </div>
                        <div style="background: #111827; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #1f2937;">
                            <p style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Email</p>
                            <p style="color: #06b6d4; font-size: 16px; margin: 0;"><a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></p>
                        </div>
                        <div style="background: #111827; border-radius: 12px; padding: 20px; border: 1px solid #1f2937;">
                            <p style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Message</p>
                            <p style="color: #e5e7eb; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                    <div style="padding: 20px 32px; text-align: center; border-top: 1px solid #1f2937;">
                        <p style="color: #6b7280; font-size: 12px; margin: 0;">Sent from hanzala.online contact form</p>
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }

        return res.status(200).json({ success: true, id: data.id });
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
