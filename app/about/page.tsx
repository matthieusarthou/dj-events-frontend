import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About DJ events',
  description: 'Find the latest DJ and other musical events',
  keywords: 'about, music, dj, EDM, house',
};

export default function Page() {
  return (
    <div>
      <h1>About</h1>
      <p>This is an app to find djs and musical events</p>
      <p>V1.0.0</p>
    </div>
  );
}
