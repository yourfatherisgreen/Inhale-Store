
import { Outlet } from 'react-router-dom';
import MobileNav from '@/components/MobileNav';
import DesktopNav from '@/components/DesktopNav';

export default function AdaptiveLayout() {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
       {/* Desktop Navigation - Hidden on Mobile */}
      <div className="hidden md:block">
        <DesktopNav />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-6 py-4 pb-20 md:pb-4">
        <Outlet />
      </main>

      {/* Mobile Navigation - Fixed Bottom, Hidden on Desktop */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <MobileNav />
      </div>
    </div>
  );
}
