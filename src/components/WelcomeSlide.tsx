import { ImageWithFallback } from "./figma/ImageWithFallback";

interface WelcomeSlideProps {
  image: string;
  title: string;
  description: string;
}

export function WelcomeSlide({ image, title, description }: WelcomeSlideProps) {
  return (
    <div className="flex flex-col items-center h-full px-6 py-4">
      {/* Image with decorative border */}
      <div className="w-full max-w-[300px] mb-6 relative">
        <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-3xl blur-xl opacity-60"></div>
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-2xl border-4 border-white/50">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="text-center space-y-3 max-w-sm flex-1 flex flex-col justify-start">
        <h1 className="text-secondary">{title}</h1>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
