// Define o tema (claro/escuro) ANTES da primeira pintura, para a página não "piscar".
// Vale só para as páginas públicas; o admin continua sempre no visual claro.
const THEME_INIT = `(function(){try{var t=localStorage.getItem('cppem_theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})();`;

/**
 * Base comum das páginas públicas: aplica o tema salvo e oferece o atalho
 * "Pular para o conteúdo" (aparece ao apertar Tab, para quem navega pelo teclado).
 * O conteúdo principal de cada página precisa ter id="conteudo".
 */
export default function PublicBase() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-brand-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lift"
      >
        Pular para o conteúdo
      </a>
    </>
  );
}
