/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const SideBar = () => {
  return (
    <nav className="bg-backgroundBlue h-screen w-16 flex flex-col items-center py-4 space-y-6">
      {/* Icono de Home */}
      <Link href="/" legacyBehavior>
        <a className="text-white hover:bg-blue-500 p-6">
          <img src="/recurso13.png" alt="Home" className="h-4 w-4" />
        </a>
      </Link>

      {/* Icono de Estrella */}
      <Link href="/dashboard/sales-form" legacyBehavior>
        <a className="text-white hover:bg-blue-500 p-6">
          <img src="/recurso9.png" alt="Star" className="h-4 w-4" />
        </a>
      </Link>

      {/* Icono de Portapapeles */}
      <Link href="/dashboard/sales" legacyBehavior>
        <a className="text-white hover:bg-blue-500 p-6">
          <img src="/recurso10.png" alt="Clipboard" className="h-4 w-4" />
        </a>
      </Link>

      {/* Icono de Carpeta */}
      <Link href="/carpeta" legacyBehavior>
        <a className="text-white hover:bg-blue-500 p-6">
          <img src="/recurso11.png" alt="Folder" className="h-4 w-4" />
        </a>
      </Link>

      {/* Icono de Usuario */}
      <Link href="/usuario" legacyBehavior>
        <a className="text-white hover:bg-blue-500 p-6">
          <img src="/recurso12.png" alt="User" className="h-4 w-4" />
        </a>
      </Link>
    </nav>
  );
};

export default SideBar;
