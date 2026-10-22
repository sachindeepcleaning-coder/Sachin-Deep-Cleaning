import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import UrgencyBar from './UrgencyBar.jsx';
import StickyMobileBar from './StickyMobileBar.jsx';
import WaNudge from './WaNudge.jsx';

export default function Layout({ children }) {
  return (
    <>
      <UrgencyBar />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <StickyMobileBar />
      <WaNudge />
    </>
  );
}