import { ThemeProvider } from './lib/theme.jsx';
import Layout from './components/Layout.jsx';
import IndexPage from './pages/IndexPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ServicePage from './pages/ServicePage.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';
import ResidentialPage from './pages/ResidentialPage.jsx';
import AllPagesPage from './pages/AllPagesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import BlogArticlePage from './pages/BlogArticlePage.jsx';
import BlogIndexPage from './pages/BlogIndexPage.jsx';
import { pageUrl } from './lib/site.js';

// Shared app tree used by BOTH the browser entry (src/bootstrap.jsx) and the
// prerender script (src/prerender-entry.jsx). Keeping this in one place means
// the static HTML Google receives is identical to what the browser hydrates.
export default function App({ page = 'index', file = 'index', serviceKey, bhk }) {
  let Page = ServicePage;
  if (page === 'index') Page = IndexPage;
  else if (page === 'contact') Page = ContactPage;
  else if (page === 'thank-you') Page = ThankYouPage;
  else if (page === 'residential') Page = ResidentialPage;
  else if (page === 'allpages') Page = AllPagesPage;
  else if (page === 'about') Page = AboutPage;
  else if (page === 'blog') Page = BlogIndexPage;
  else if (page === 'article') Page = BlogArticlePage;

  return (
    <ThemeProvider>
      <Layout>
        <Page url={pageUrl(file)} file={file} serviceKey={serviceKey} bhk={bhk} />
      </Layout>
    </ThemeProvider>
  );
}
