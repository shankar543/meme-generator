const canvas = document.getElementById('meme-canvas');
const ctx = canvas.getContext('2d');

// Function to apply text styles to the canvas context
function applyTextStyle(textStyle) {
  if (textStyle.startsWith('text-shadow:')) {
    // 3D Effect Style
    const shadowStyle = textStyle.substring(textStyle.indexOf(':') + 1).trim();
    ctx.shadowColor = shadowStyle.split(',')[0].trim();
    ctx.shadowBlur = parseInt(shadowStyle.split(',')[1].trim());
    ctx.shadowOffsetX = parseInt(shadowStyle.split(',')[2].trim().split(' ')[0]);
    ctx.shadowOffsetY = parseInt(shadowStyle.split(',')[2].trim().split(' ')[1]);
  } else if (textStyle.startsWith('animation:')) {
    // Animated Style
    const animationName = textStyle.substring(textStyle.indexOf(':') + 1).trim().split(' ')[0];
    const animationDuration = textStyle.substring(textStyle.indexOf(':') + 1).trim().split(' ')[1];
    const animationIteration = textStyle.substring(textStyle.indexOf(':') + 1).trim().split(' ')[2];

    canvas.classList.add('animate-text', animationName);
    canvas.style.animationDuration = animationDuration;
    canvas.style.animationIterationCount = animationIteration;
  } else {
    // Regular Font Style
    ctx.font = textStyle;
  }
}

// Render text on the canvas
function renderText() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const selectedFontStyle = fontStyles[selectedFontIndex];
  applyTextStyle(selectedFontStyle);

  // Set other text styles
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Render text
  ctx.fillText('Hello, World!', canvas.width / 2, canvas.height / 2);
}

// Example usage
const selectedFontIndex = 0; // Index of the selected font style from the fontStyles array
renderText();
