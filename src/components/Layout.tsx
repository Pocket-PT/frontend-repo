import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen max-w-xl mx-auto overflow-hidden bg-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
