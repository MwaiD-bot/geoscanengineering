export default {
  async fetch(request, env) {
    try {
      const payload = await request.json().catch(() => ({}));
      const name = String(payload.name || '').trim();
      const email = String(payload.email || '').trim();
      const company = String(payload.company || '').trim();
      const phone = String(payload.phone || '').trim();
      const service = String(payload.service || '').trim();
      const message = String(payload.message || '').trim();

      if (!name || !email || !message) {
        return Response.json(
          {
            success: false,
            message: 'Please provide your name, email address, and project details.'
          },
          { status: 400 }
        );
      }

      const toEmail = env.CONTACT_EMAIL || 'hello@geoscanengineering.co.ke';
      const fromEmail = env.MAIL_FROM || 'noreply@geoscanengineering.co.ke';

      const emailPayload = {
        personalizations: [{
          to: [{ email: toEmail }],
          reply_to: { email, name }
        }],
        from: {
          email: fromEmail,
          name: 'GeoScan Engineering'
        },
        subject: `New GeoScan inquiry from ${name}`,
        content: [{
          type: 'text/plain',
          value: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Company: ${company || 'N/A'}`,
            `Phone: ${phone || 'N/A'}`,
            `Service: ${service || 'N/A'}`,
            '',
            'Project details:',
            message
          ].join('\n')
        }]
      };

      const headers = { 'content-type': 'application/json' };
      if (env.MAILCHANNELS_API_KEY) {
        headers.authorization = `Bearer ${env.MAILCHANNELS_API_KEY}`;
      }

      const mailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers,
        body: JSON.stringify(emailPayload)
      });

      if (!mailResponse.ok) {
        const text = await mailResponse.text();
        console.error('MailChannels send failed:', text);
        return Response.json(
          {
            success: false,
            message: 'The form was valid, but the email service is not configured yet. Please contact hello@geoscanengineering.co.ke directly.'
          },
          { status: 500 }
        );
      }

      return Response.json({
        success: true,
        message: 'Thank you. Your enquiry has been received and the GeoScan team will contact you shortly.'
      });
    } catch (error) {
      console.error('Worker contact error:', error);
      return Response.json(
        {
          success: false,
          message: 'Something went wrong while sending your enquiry. Please try again or email hello@geoscanengineering.co.ke directly.'
        },
        { status: 500 }
      );
    }
  }
};
