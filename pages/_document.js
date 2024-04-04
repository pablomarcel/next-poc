// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en"> {/* Setting the language attribute to English */}
                <Head>
                    {/* Bootstrap CDN for styling */}
                    <link
                        rel="stylesheet"
                        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/2Xn6G+R9/vE6+D1iSko90pFtr+r/8"
                        crossorigin="anonymous"
                    />
                    {/* Add any other global scripts and styles here */}
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
