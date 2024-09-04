import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body;

    
    const respondentEmail = formData['29.Email address of the person taking the survey'];  
    const emailList = [
      'rightdots123@gmail.com', 
      respondentEmail,  
    ];

 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'rightdots123@gmail.com', 
        pass: process.env.EMAIL_PASS || 'kaevkfjucnzhmrlg',  
      },
    });

  const nameOfPerson = formData["26.Name of the person taking the Survey"];
 // Calculate the score
let score = 0;
Object.entries(formData).forEach(([question, answer]) => {
  // Default scoring for 'Yes' answers
  if (answer.toLowerCase() === 'yes') {
    score += 10;
  }

  const lowerCaseAnswer = answer.toLowerCase();

  if (question.includes('12')) { 
    if (lowerCaseAnswer === 'less than 5%') {
      score += 2.5;
    } else if (lowerCaseAnswer === '5% to 10%') {
      score  += 5;
    } else if (lowerCaseAnswer === '10-20%') {
      score += 7.5;
    } else if (lowerCaseAnswer === 'more than 20%') {
      score  += 10;
    }
  }

 
  if (question.includes('13') || question.includes('14')) { 
    if (lowerCaseAnswer === 'less than 5%') {
      score  += 2.5;
    } else if (lowerCaseAnswer === '5% to 10%') {
      score  += 5;
    } else if (lowerCaseAnswer === '10-20%') {
      score += 7.5;
    } else if (lowerCaseAnswer === 'more than 20%') {
      score += 10;
    }
  }

});

// Determine the performance message and score color based on the score
let performanceMessage = '';
let scoreColor = '';
if (score < 100) {
  performanceMessage = "The volunteering initiative at your company appears to be poor, with significant room for improvement. Please contact us for a detailed report highlighting areas of strength and areas needing improvement.";
  scoreColor = '#FF0000'; // Red
} else if (score > 100 && score < 200) {
  performanceMessage = "The volunteering initiative at your company is average, but there is still room for improvement. Please find attached a detailed report outlining strengths and areas requiring attention.";
  scoreColor = '#FFBF00'; // Amber
} else if (score >= 200) {
  performanceMessage = "Kudos! Your company is performing well in the volunteering initiative. Feel free to reach out to discuss how we can further enhance your efforts.";
  scoreColor = '#4CAF50'; // Green
}

// Construct the email
const mailOptions = {
  from: process.env.EMAIL_USER || 'rightdots123@gmail.com',
  to: emailList.join(', '),  
  subject: 'Your Volunteering Initiative Score & Detailed Assessment Report - Right Dots',
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #4CAF50;">Thank You ${nameOfPerson}, for Participating in the Right Dots - Volunteering Score Card Assessment.</h2>
      <p>We appreciate your time and effort in providing us with the information. Below is a summary of your company's performance:</p>
      <h3>Summary of Your Company's Performance:</h3>
<p style="font-size: 16px; margin-top: 20px;">
  <strong style="font-size: 18px;">Score:</strong> 
  <span style="color: ${scoreColor}; font-size: 24px; font-weight: bold;">${score}</span>
</p>
<p style="background-color: #f0f8ff; padding: 15px; border-left: 5px solid ${scoreColor}; font-size: 16px; border-radius: 5px;">
  ${performanceMessage}
</p>
<p style="font-size: 16px; margin-top: 20px; color: #333;">
  Please review the detailed report attached for further insights. For any inquiries or to discuss improving your volunteering initiatives, please contact us at 
  <a href="mailto:contactus@rightdots.org" style="color: #007BFF; text-decoration: none; font-weight: bold;">contactus@rightdots.org</a> 
  or call us at 
  <a href="tel:+918754457670" style="color: #007BFF; text-decoration: none; font-weight: bold;">+91 87544 57670</a>.
</p>

      <h3>Details of Your Submission:</h3>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
        ${Object.entries(formData).map(([question, answer]) => `
          <p><strong>${question}</strong>: <span style="color: #007BFF;">${answer}</span></p>
        `).join('')}
      </div>
      <p>Best regards,</p>
      <p><strong>Team Right Dots</strong></p>
    </div>
  `,
};
    

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
