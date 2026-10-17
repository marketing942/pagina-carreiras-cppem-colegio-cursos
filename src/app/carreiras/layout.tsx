// Define o tema (claro/escuro) ANTES da primeira pintura, para a página não "piscar".
// Vale só para as páginas públicas; o admin continua sempre no visual claro.
const THEME_INIT = `(function(){try{var t=localStorage.getItem('cppem_theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})();`;

export default function CarreirasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      {children}
    </>
  );
}
