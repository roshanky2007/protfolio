import React, { useRef, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

type VisualizerMode = 'Neural' | 'Orbit' | 'Matrix';

export const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<VisualizerMode>('Neural');
  const particleCount = 65;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };

    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1,
      angle: Math.random() * Math.PI * 2,
      orbitRadius: Math.random() * 120 + 30,
      orbitSpeed: (Math.random() - 0.5) * 0.03,
      color: Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4',
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseX = width / 2;
      mouseY = height / 2;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      // Trail effect
      ctx.fillStyle = 'rgba(10, 14, 28, 0.25)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        if (mode === 'Neural') {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Connect nearby particles
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 90) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = (1 - dist / 90) * 0.35;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        } else if (mode === 'Orbit') {
          p.angle += p.orbitSpeed;
          p.x = mouseX + Math.cos(p.angle) * p.orbitRadius;
          p.y = mouseY + Math.sin(p.angle) * p.orbitRadius;

          // Radial connection to cursor center
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = '#06b6d4';
          ctx.globalAlpha = 0.15;
          ctx.stroke();
        } else if (mode === 'Matrix') {
          p.y += Math.abs(p.vy) * 2;
          if (p.y > height) {
            p.y = 0;
            p.x = Math.random() * width;
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        ctx.fill();
      });

      // Draw center core in orbit mode
      if (mode === 'Orbit') {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ec4899';
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 15;
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [mode, particleCount]);

  return (
    <div className="rounded-2xl overflow-hidden bg-[#0a0e1c] border border-white/10 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      {/* Visualizer Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-white font-medium">
            Creative Coding Experiment: Vector Shader
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {(['Neural', 'Orbit', 'Matrix'] as VisualizerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                mode === m
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-[360px] rounded-xl overflow-hidden bg-[#070a14] border border-white/5 cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-400 bg-black/60 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm pointer-events-none">
          Mode: {mode} • Move mouse to attract nodes
        </div>
      </div>
    </div>
  );
};
