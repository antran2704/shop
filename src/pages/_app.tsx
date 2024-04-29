import { Provider } from "react-redux";
import store from "~/store";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import "swiper/scss/effect-fade";
import "swiper/scss/autoplay";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "~/styles/globals.scss";
import { AppPropsWithLayout } from "~/interfaces";
import { PrimaryLoading } from "~/components/Loading";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <Provider store={store}>
            <ClerkProvider>
                <ClerkLoading>
                    <PrimaryLoading />
                </ClerkLoading>
                <ClerkLoaded>
                    {getLayout(<Component {...pageProps} />)}
                </ClerkLoaded>
            </ClerkProvider>
        </Provider>
    );
}
