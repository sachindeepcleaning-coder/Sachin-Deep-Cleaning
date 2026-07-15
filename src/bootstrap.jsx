import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './lib/theme.jsx';
import Layout from './components/Layout.jsx';
import IndexPage from './pages/IndexPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ServicePage from './pages/ServicePage.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';

// Read which page to mount from the data-page / data-service attributes
// set by each generated HTML entry shell (see scripts/gen-entries.mjs).
const el = document.documentElement;
const page = el.dataset.page;
const props = {
  serviceKey: el.dataset.service,
  bhk: el.dataset.bhk ? Number(el.dataset.bhk) : undefined,
};

let Page = ServicePage;
if (page === 'index') Page = IndexPage;
else if (page === 'contact') Page = ContactPage;
else if (page === 'thank-you') Page = ThankYouPage;

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Layout>
      <Page {...props} />
    </Layout>
  </ThemeProvider>
);
