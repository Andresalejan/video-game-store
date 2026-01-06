import { useNavigate } from "react-router-dom";
import { RainOverlay } from "../components/RainOverlay";

const landingBgUrl = `${import.meta.env.BASE_URL}cyberpunk-city.png`;

export function LandingPage() {
  const navigate = useNavigate();

  const handleStartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const content = document.querySelector('.landing-content');
    if (content) {
      content.classList.add('animate-page-exit');
      setTimeout(() => {
        navigate('/products');
      }, 300);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-fade-in-bg"
        style={{ backgroundImage: `url(${landingBgUrl})` }}
        aria-hidden="true"
      />

      {/* Rain Animation */}
      <RainOverlay />

      {/* Contrast overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/60 to-slate-950/80 animate-fade-in-overlay"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="landing-content relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-16 text-center animate-fade-in">
        <p className="text-xs font-semibold tracking-[0.35em] text-slate-200/80">
          CYBERPUNK GAME STORE
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Pixel Paradise
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200/90 sm:text-base">
          Enter the neon district. Browse games, build your cart, and check out.
        </p>

        <div className="mt-10">
          <button
            onClick={handleStartClick}
            className="group inline-flex items-center justify-center rounded-md border border-slate-200/20 bg-slate-900 px-10 py-4 text-base font-semibold tracking-[0.25em] text-white backdrop-blur hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-200"
            aria-label="Start browsing products"
          >
            START
          </button>
          <p className="mt-4 text-xs text-slate-200/70">
            Press START to continue
          </p>
        </div>
      </div>
    </div>
  );
}
