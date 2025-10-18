import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Download, Package } from "lucide-react";
import { Button } from "./ui/button";

interface GeneratedIcon {
  name: string;
  size: number;
  canvas: HTMLCanvasElement;
}

export function IconGeneratorScreen({ onBack }: { onBack: () => void }) {
  const [icons, setIcons] = useState<GeneratedIcon[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    generateAllIcons();
  }, []);

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

  function createIcon(size: number): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    // Background with rounded corners
    const radius = size * 0.2;
    ctx.fillStyle = "#F3B14E";
    roundRect(ctx, 0, 0, size, size, radius);
    ctx.fill();

    // Border effect
    ctx.strokeStyle = "rgba(243, 177, 78, 0.3)";
    ctx.lineWidth = size * 0.016;
    roundRect(ctx, size * 0.032, size * 0.032, size * 0.936, size * 0.936, radius * 0.95);
    ctx.stroke();

    // Main icon - growth chart
    ctx.strokeStyle = "#02007B";
    ctx.lineWidth = size * 0.051;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

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

    return canvas;
  }

  function generateAllIcons() {
    setGenerating(true);
    const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
    const generatedIcons: GeneratedIcon[] = [];

    sizes.forEach((size) => {
      const canvas = createIcon(size);
      generatedIcons.push({
        name: `icon-${size}x${size}.png`,
        size,
        canvas,
      });
    });

    setIcons(generatedIcons);
    setGenerating(false);
  }

  function downloadIcon(canvas: HTMLCanvasElement, filename: string) {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  async function downloadAllIcons() {
    // Download icons one by one with a small delay
    for (const icon of icons) {
      downloadIcon(icon.canvas, icon.name);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  return (
    <div className="min-h-screen bg-secondary text-secondary-foreground">
      {/* Header */}
      <div className="bg-secondary border-b border-secondary-foreground/10 sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 py-4 max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-primary">Icon Generator</h1>
            <p className="text-sm text-secondary-foreground/70">
              Generate all PWA icons
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 pb-20">
        {/* Success Banner */}
        <div className="bg-accent border-2 border-accent rounded-2xl p-6 mb-6 text-center">
          <div className="text-6xl mb-3">🎉</div>
          <h2 className="text-accent-foreground text-2xl mb-2">Icons Already Generated!</h2>
          <p className="text-accent-foreground/80 mb-4">
            All 8 PWA icons are already saved in <code className="bg-accent-foreground/10 px-2 py-1 rounded">/public/icons/</code>
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <span className="bg-accent-foreground/10 text-accent-foreground px-3 py-1.5 rounded-full">✅ 72×72 SVG</span>
            <span className="bg-accent-foreground/10 text-accent-foreground px-3 py-1.5 rounded-full">✅ 96×96 SVG</span>
            <span className="bg-accent-foreground/10 text-accent-foreground px-3 py-1.5 rounded-full">✅ 128×128 SVG</span>
            <span className="bg-accent-foreground/10 text-accent-foreground px-3 py-1.5 rounded-full">✅ 144×144 SVG</span>
            <span className="bg-accent-foreground/10 text-accent-foreground px-3 py-1.5 rounded-full">✅ 152×152 SVG</span>
            <span className="bg-accent-foreground/10 text-accent-foreground px-3 py-1.5 rounded-full">✅ 192×192 SVG</span>
            <span className="bg-accent-foreground/10 text-accent-foreground px-3 py-1.5 rounded-full">✅ 384×384 SVG</span>
            <span className="bg-accent-foreground/10 text-accent-foreground px-3 py-1.5 rounded-full">✅ 512×512 SVG</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-primary/20 border-l-4 border-primary rounded-lg p-4 mb-6">
          <h2 className="text-primary-foreground mb-2">ℹ️ About This Tool</h2>
          <p className="text-sm text-foreground/90">
            This icon generator creates preview images for reference. <strong>The actual SVG icons are already integrated into your PWA</strong> and don't need to be manually uploaded. Your app is ready to install!
          </p>
        </div>

        {/* Download All Button */}
        <div className="mb-6">
          <Button
            onClick={downloadAllIcons}
            className="w-full gap-2 h-14 shadow-lg"
            disabled={generating || icons.length === 0}
          >
            <Package className="w-5 h-5" />
            Download All Icons ({icons.length})
          </Button>
        </div>

        {/* Icons Grid */}
        {generating ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary-foreground/70">Generating icons...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {icons.map((icon) => (
              <div
                key={icon.name}
                className="bg-background rounded-xl p-4 text-center border border-border"
              >
                <div className="mb-3">
                  <canvas
                    ref={(el) => {
                      if (el && icon.canvas) {
                        const ctx = el.getContext("2d");
                        if (ctx) {
                          el.width = icon.size;
                          el.height = icon.size;
                          ctx.drawImage(icon.canvas, 0, 0);
                        }
                      }
                    }}
                    className="w-full h-auto rounded-lg shadow-lg mx-auto"
                    style={{
                      maxWidth: "120px",
                      maxHeight: "120px",
                      imageRendering: "auto",
                    }}
                  />
                </div>
                <div className="mb-2">
                  <div className="text-foreground text-sm">{icon.name}</div>
                  <div className="text-muted-foreground text-xs">
                    {icon.size} × {icon.size}px
                  </div>
                </div>
                <Button
                  onClick={() => downloadIcon(icon.canvas, icon.name)}
                  variant="outline"
                  size="sm"
                  className="w-full gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Success Message */}
        {icons.length > 0 && (
          <div className="mt-6 bg-primary/20 border border-primary rounded-lg p-4 text-center">
            <p className="text-foreground">
              ✅ <strong>{icons.length} icons</strong> generated successfully!
            </p>
            <p className="text-sm text-foreground/70 mt-1">
              Click "Download All" or download individually
            </p>
          </div>
        )}

        {/* File Structure Guide */}
        <div className="mt-8 bg-muted rounded-lg p-4 text-foreground">
          <h3 className="mb-2">📁 Where to place icons:</h3>
          <pre className="text-xs bg-background p-3 rounded border border-border overflow-x-auto">
{`/public/icons/
├── icon-72x72.png
├── icon-96x96.png
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
└── icon-512x512.png`}
          </pre>
        </div>
      </div>
    </div>
  );
}
