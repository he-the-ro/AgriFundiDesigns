import { useEffect, useRef } from 'react';

interface IconGeneratorProps {
  size: number;
  onGenerated?: (dataUrl: string) => void;
}

export function IconGenerator({ size, onGenerated }: IconGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    // Background with rounded corners
    const radius = size * 0.2; // 20% radius
    ctx.fillStyle = '#F3B14E';
    roundRect(ctx, 0, 0, size, size, radius);
    ctx.fill();

    // Border effect (subtle)
    ctx.strokeStyle = 'rgba(243, 177, 78, 0.3)';
    ctx.lineWidth = size * 0.016;
    roundRect(ctx, size * 0.032, size * 0.032, size * 0.936, size * 0.936, radius * 0.95);
    ctx.stroke();

    // Main icon - growth chart
    ctx.strokeStyle = '#02007B';
    ctx.lineWidth = size * 0.051;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const centerX = size / 2;
    const centerY = size / 2;
    const scale = size / 512;

    ctx.beginPath();
    // Top horizontal line
    ctx.moveTo(centerX + 42 * scale, centerY - 84 * scale);
    ctx.lineTo(centerX + 126 * scale, centerY - 84 * scale);
    // Vertical line down
    ctx.lineTo(centerX + 126 * scale, centerY);
    // Diagonal line
    ctx.moveTo(centerX + 126 * scale, centerY - 84 * scale);
    ctx.lineTo(centerX - 42 * scale, centerY + 84 * scale);
    // Bottom L-shape
    ctx.moveTo(centerX - 126 * scale, centerY - 126 * scale);
    ctx.lineTo(centerX - 126 * scale, centerY + 126 * scale);
    ctx.lineTo(centerX + 252 * scale, centerY + 126 * scale);
    ctx.stroke();

    // Callback with data URL
    if (onGenerated) {
      onGenerated(canvas.toDataURL('image/png'));
    }
  }, [size, onGenerated]);

  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'none' }}
      width={size}
      height={size}
    />
  );
}

export function generateIconDataUrl(size: number): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve('');
      return;
    }

    canvas.width = size;
    canvas.height = size;

    // Background with rounded corners
    const radius = size * 0.2;
    ctx.fillStyle = '#F3B14E';
    
    // Helper function for rounded rectangle
    const roundRect = (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    roundRect(0, 0, size, size, radius);
    ctx.fill();

    // Border effect
    ctx.strokeStyle = 'rgba(243, 177, 78, 0.3)';
    ctx.lineWidth = size * 0.016;
    roundRect(size * 0.032, size * 0.032, size * 0.936, size * 0.936, radius * 0.95);
    ctx.stroke();

    // Main icon
    ctx.strokeStyle = '#02007B';
    ctx.lineWidth = size * 0.051;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const centerX = size / 2;
    const centerY = size / 2;
    const scale = size / 512;

    ctx.beginPath();
    ctx.moveTo(centerX + 42 * scale, centerY - 84 * scale);
    ctx.lineTo(centerX + 126 * scale, centerY - 84 * scale);
    ctx.lineTo(centerX + 126 * scale, centerY);
    ctx.moveTo(centerX + 126 * scale, centerY - 84 * scale);
    ctx.lineTo(centerX - 42 * scale, centerY + 84 * scale);
    ctx.moveTo(centerX - 126 * scale, centerY - 126 * scale);
    ctx.lineTo(centerX - 126 * scale, centerY + 126 * scale);
    ctx.lineTo(centerX + 252 * scale, centerY + 126 * scale);
    ctx.stroke();

    resolve(canvas.toDataURL('image/png'));
  });
}
