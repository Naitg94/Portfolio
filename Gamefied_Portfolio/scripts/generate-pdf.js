import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const cyanColor = [0, 168, 204];
const darkNavy = [10, 16, 32];
const textDark = [30, 41, 59];
const textMuted = [100, 116, 139];

// Header
doc.setFillColor(...darkNavy);
doc.rect(0, 0, 210, 38, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(24);
doc.setTextColor(255, 255, 255);
doc.text('NAITIK GOYAL', 15, 18);

doc.setFont('helvetica', 'normal');
doc.setFontSize(10);
doc.setTextColor(53, 229, 255);
doc.text('AI/ML Student & Developer | B.Tech CSE (AI & ML)', 15, 26);

doc.setFontSize(9);
doc.setTextColor(226, 232, 240);
doc.text('Phone: +91 8839156886  |  Email: goyalnait678@gmail.com', 15, 33);
doc.text('Address: 58, Ward No. 01, Junwani, Bhilai, Chhattisgarh', 115, 33);

let y = 46;

function drawSectionHeader(title) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...darkNavy);
  doc.text(title.toUpperCase(), 15, y);
  
  doc.setDrawColor(...cyanColor);
  doc.setLineWidth(0.6);
  doc.line(15, y + 2, 195, y + 2);
  y += 8;
}

// About Me
drawSectionHeader('About Me');
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...textDark);
const aboutText = "Motivated and hardworking B.Tech student specializing in Computer Science Engineering (AI & ML). Seeking an opportunity to gain practical work experience, improve professional skills, and contribute positively to an organization. A quick learner with a positive attitude, strong work ethic, and willingness to take on new responsibilities.";
const splitAbout = doc.splitTextToSize(aboutText, 180);
doc.text(splitAbout, 15, y);
y += splitAbout.length * 4.5 + 4;

// Education
drawSectionHeader('Education');
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(...darkNavy);
doc.text('Shri Shankaracharya Technical Campus (SSTC)', 15, y);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...textMuted);
doc.text('2025 — 2029', 165, y);
y += 5;

doc.setFont('helvetica', 'bold');
doc.setTextColor(...textDark);
doc.text('B.Tech - Computer Science Engineering (AI & ML)', 15, y);
y += 4.5;
doc.setFont('helvetica', 'normal');
doc.setTextColor(...textDark);
doc.text('• 2nd Semester Student  |  Expected Graduation: 2029', 18, y);
y += 6;

doc.setFont('helvetica', 'bold');
doc.setTextColor(...darkNavy);
doc.text('HSM Global Public School', 15, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...textMuted);
doc.text('Class XII (CG Board) — 70.02%', 120, y);
y += 5;

doc.setFont('helvetica', 'bold');
doc.setTextColor(...darkNavy);
doc.text('MKPS School', 15, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...textMuted);
doc.text('Class X (CBSE) — 80%', 120, y);
y += 8;

// Academic Highlights
drawSectionHeader('Academic Highlights');
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...textDark);
doc.text('• Currently pursuing 2nd Semester in B.Tech CSE (AI & ML).', 15, y);
y += 5;
doc.text('• Consistently focused on learning and improving technical and professional skills.', 15, y);
y += 8;

// Skills & Strengths
drawSectionHeader('Skills & Strengths');
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...darkNavy);
doc.text('Technical & Soft Skills:', 15, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...textDark);
doc.text('Basic Computer Knowledge, MS Office (Word, Excel, PowerPoint), Communication, Teamwork, Problem Solving, Adaptability', 55, y, { maxWidth: 140 });
y += 9;

doc.setFont('helvetica', 'bold');
doc.setTextColor(...darkNavy);
doc.text('Strengths:', 15, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...textDark);
doc.text('Honest & Responsible, Positive Attitude, Self-Motivated, Quick Learner, Team Player, Punctual', 55, y, { maxWidth: 140 });
y += 9;

// Career Objective
drawSectionHeader('Career Objective');
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...textDark);
const objText = "To secure an entry-level position where I can learn, gain practical experience, improve my skills, and grow professionally while contributing to the success of the organization.";
const splitObj = doc.splitTextToSize(objText, 180);
doc.text(splitObj, 15, y);
y += splitObj.length * 4.5 + 4;

// Experience & Languages
drawSectionHeader('Experience & Languages');
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...darkNavy);
doc.text('Experience Status:', 15, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...textDark);
doc.text('Fresher — Seeking opportunities to apply software & AI development skills.', 52, y);
y += 6;

doc.setFont('helvetica', 'bold');
doc.setTextColor(...darkNavy);
doc.text('Languages:', 15, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...textDark);
doc.text('English, Hindi', 52, y);

// Footer Line
doc.setDrawColor(...cyanColor);
doc.setLineWidth(0.4);
doc.line(15, 280, 195, 280);
doc.setFontSize(8);
doc.setTextColor(...textMuted);
doc.text('Naitik Goyal — Curriculum Vitae | Verified One-Page Resume', 105, 284, { align: 'center' });

const outputDir = path.join(__dirname, '../public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pdfPath = path.join(outputDir, 'Naitik_Goyal_Resume.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(pdfPath, Buffer.from(pdfBytes));

console.log('Resume PDF regenerated successfully at:', pdfPath);
