export const sendEmail = async (to: string, subject: string, content: string) => {
  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, content })
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    
    return true;
  } catch (error) {
    console.error('Email service error:', error);
    return false;
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${window.location.origin}/verify-email?token=${token}`;
  
  return sendEmail(
    email,
    'Verify your email address',
    `Please click the following link to verify your email address: ${verificationUrl}`
  );
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  return sendEmail(
    email,
    'Welcome to EduFund Connect',
    `Hi ${name}, welcome to EduFund Connect! We're excited to have you join our community.`
  );
};

export const sendFundingNotification = async (email: string, amount: number, student: string) => {
  return sendEmail(
    email,
    'New funding received',
    `You have received a new funding of $${amount} for student ${student}.`
  );
};