import React, { useRef, useEffect } from 'react';

export default function TextBlob() {
  return (
    <div className='w-full flex items-center justify-center'>
      <WarpText />
    </div>
  )
}

const WarpText = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<{
    x: number | undefined;
    y: number | undefined;
    radius: number;
  }>({
    x: undefined,
    y: undefined,
    radius: 100
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        if (!ctx) { return; }
        ctx.fillStyle = textColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (mouse.current.x === undefined || mouse.current.y === undefined) {
          if (this.x !== this.baseX) {
            const dxReturn = this.x - this.baseX;
            this.x -= dxReturn / 10;
          }
          if (this.y !== this.baseY) {
            const dyReturn = this.y - this.baseY;
            this.y -= dyReturn / 10;
          }
          return;
        }

        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;

        const maxDistance = mouse.current.radius;
        const force = (maxDistance - distance) / maxDistance;

        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        if (distance < mouse.current.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            const dxReturn = this.x - this.baseX;
            this.x -= dxReturn / 10;
          }
          if (this.y !== this.baseY) {
            const dyReturn = this.y - this.baseY;
            this.y -= dyReturn / 10;
          }
        }
      }
    }

    let animationFrameId: number;

    let particles: Particle[] = [];
    let isInitialized = false;

    const text = "neşet";
    const font = "bold 120px Geist";
    const textColor = "#e2e8f0";

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = event.clientX - rect.left;
      mouse.current.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.current.x = undefined;
      mouse.current.y = undefined;
    };



    const initParticles = (textX: number, textY: number) => {
      particles = [];
      ctx.fillText(text, textX, textY);
      const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < textData.height; y += 4) {
        for (let x = 0; x < textData.width; x += 4) {
          if (textData.data[(y * 4 * textData.width) + (x * 4) + 3] > 128) {
            const dpr = window.devicePixelRatio || 1;
            particles.push(new Particle(x / dpr, y / dpr));
          }
        }
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);

      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const textX = rect.width / 2;
      const textY = rect.height / 2;

      initParticles(textX, textY);
    };

    const animate = () => {
      if (!isInitialized) {
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          resizeCanvas();
          isInitialized = true;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isInitialized) {
        particles.forEach(p => {
          p.update();
          p.draw();
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-2xl h-48 cursor-none"
    />
  );
};
