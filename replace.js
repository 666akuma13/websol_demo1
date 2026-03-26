const fs = require('fs');
const path = require('path');

const dir = __dirname;
const filesToProcess = [
  'website/index.html',
  'website/styles.css',
  'website/admin.html',
  'website/payment.html',
  'website/session.html',
  'website/feedback.html',
  'website/script.js',
  'server/email.js',
];

const replacements = [
  { from: /--accent:\s*#39FF14/g, to: '--accent: #3B82F6' },
  { from: /--accent-dim:\s*#2bcc10/g, to: '--accent-dim: #2563EB' },
  { from: /#39FF14/gi, to: '#3B82F6' },
  { from: /#00cc44/gi, to: '#2563EB' },
  { from: /rgba\(\s*57\s*,\s*255\s*,\s*20/g, to: 'rgba(59, 130, 246' },
  { from: /linear-gradient\(135deg,\s*#3B82F6\s*0%,\s*#2563EB\s*100%\)/g, to: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' },
  // catch any already replaced by previous lines
  { from: /linear-gradient\(135deg,\s*#3B82F6\s*0%,\s*#2563EB\)/g, to: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' },
];

for (const relPath of filesToProcess) {
  const fullPath = path.join(dir, relPath);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');
  for (const r of replacements) {
    content = content.replace(r.from, r.to);
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Replaced colors in ${relPath}`);
}
