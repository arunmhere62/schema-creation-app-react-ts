import { useLocation } from 'react-router-dom';

function usePathname() {
    const location = useLocation();
    const pathnameParts = location.pathname.split(/[\/-]/).filter(part => part !== '');
    const capitalizedPathnameParts = pathnameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
    const capitalizedPathname = capitalizedPathnameParts.join(' ');
    return capitalizedPathname;
}

export default usePathname;
