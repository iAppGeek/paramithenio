import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/settings', labelKey: 'nav.settings' },
  { to: '/legal', labelKey: 'nav.legal' },
] as const;

export function NavBar(): React.ReactElement {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-10 border-b border-stone-200 bg-parchment-50">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <Link to="/" className="font-sans text-lg font-bold text-stone-900">
          Παραμυθένιο
        </Link>
        <div className="flex items-center gap-4">
          {NAV_LINKS.map(({ to, labelKey }) => {
            const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={[
                  'font-sans text-sm font-medium transition-colors',
                  isActive ? 'text-amber-600' : 'text-stone-600 hover:text-stone-900',
                ].join(' ')}
              >
                {t(labelKey)}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
