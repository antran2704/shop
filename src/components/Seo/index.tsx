import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
   title: string;
   description: string;
}

const LOGO = "/icon.png";

const Seo = (props: Props) => {
   const router = useRouter();
   const { title, description } = props;
   const pathname = "http://localhost:3000" + router.pathname;

   return (
      <Head>
         <title>{title}</title>
         <meta name="title" content={title} />
         <meta name="description" content={description} />
         <link rel="canonical" href={pathname} />
         <link rel="icon" href={LOGO} />

         {/* Open Graph / Facebook */}
         <meta property="og:type" content="website" />
         <meta property="og:url" content="https://metatags.io/" />
         <meta property="og:title" content={title} />
         <meta property="og:description" content={description} />
         <meta property="og:image" content={LOGO} />

         {/* Twitter */}
         <meta property="twitter:card" content="summary_large_image" />
         <meta property="twitter:url" content="https://metatags.io/" />
         <meta property="twitter:title" content={title} />
         <meta property="twitter:description" content={description} />
         <meta property="twitter:image" content={LOGO} />
      </Head>
   );
};

export default Seo;
