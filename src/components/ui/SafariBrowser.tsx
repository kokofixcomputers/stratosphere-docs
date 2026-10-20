import Image from "next/image";
import { site } from "@/lib/site";

interface SafariBrowserProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  url?: string;
  className?: string;
}

export const SafariBrowser = ({
  src,
  alt,
  width,
  height,
  url = site.panelHost,
  className = "",
}: SafariBrowserProps) => {
  return (
    <div className={`rounded-xl overflow-hidden shadow-2xl pointer-events-none select-none border border-white/10 ${className}`}>
      {/* title bar */}
      <div className="bg-[#18181b] h-10 flex items-center px-3 md:px-4 border-b border-white/5">
        <div className="hidden md:flex items-center gap-2 w-24">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex gap-3 ml-2">
            <div className="text-white/30">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
            <div className="text-white/30">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="bg-white/5 rounded-md px-3 md:px-4 py-1.5 flex items-center justify-center gap-2 w-full md:min-w-[300px] md:max-w-[400px]">
            <svg className="w-3.5 h-3.5 text-white/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span className="text-white/50 text-xs md:text-sm font-medium truncate">{url}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-end gap-3 w-24">
          <div className="text-white/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
              <polyline points="16,6 12,2 8,6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </div>
          <div className="text-white/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="bg-black">
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          className="w-full h-auto"
          quality={90}
          priority
        />
      </div>
    </div>
  );
};

export default SafariBrowser;
