import AuthButton from "@/modules/auth/ui/AuthButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-800 bg-black text-white">
      <div className="container flex items-center justify-between px-4 py-4 md:px-0">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          uploadev
        </Link>

        {/* Nav Links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="#features" className="text-sm hover:underline">
            Features
          </Link>
          <Link href="#docs" className="text-sm hover:underline">
            Docs
          </Link>
          <Link href="#pricing" className="text-sm hover:underline">
            Pricing
          </Link>
        </div>

        <AuthButton />
      </div>
    </nav>
  );
};

export default Navbar;
